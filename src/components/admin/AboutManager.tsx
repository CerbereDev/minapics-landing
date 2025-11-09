import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AboutData {
  id: string;
  title: string;
  subtitle: string;
  bio: string;
  years_experience: number;
  happy_clients: number;
  awards: number;
  projects: number;
  portrait_image_url: string;
  working_image_url: string;
}

export function AboutManager() {
  const { toast } = useToast();
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    bio: "",
    years_experience: 0,
    happy_clients: 0,
    awards: 0,
    projects: 0,
    portrait_image: null as File | null,
    working_image: null as File | null,
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    const { data, error } = await supabase
      .from("about")
      .select("*")
      .single();

    if (error && error.code !== 'PGRST116') {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load about data",
      });
    } else if (data) {
      setAbout(data);
      setFormData({
        title: data.title,
        subtitle: data.subtitle,
        bio: data.bio,
        years_experience: data.years_experience,
        happy_clients: data.happy_clients,
        awards: data.awards,
        projects: data.projects,
        portrait_image: null,
        working_image: null,
      });
    }
    setLoading(false);
  };

  const uploadImage = async (file: File, path: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${path}-${Math.random()}.${fileExt}`;
    const filePath = `about/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("website-images")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from("website-images")
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let portraitUrl = about?.portrait_image_url || "";
    let workingUrl = about?.working_image_url || "";

    try {
      if (formData.portrait_image) {
        portraitUrl = await uploadImage(formData.portrait_image, "portrait");
      }
      if (formData.working_image) {
        workingUrl = await uploadImage(formData.working_image, "working");
      }

      const aboutData = {
        title: formData.title,
        subtitle: formData.subtitle,
        bio: formData.bio,
        years_experience: formData.years_experience,
        happy_clients: formData.happy_clients,
        awards: formData.awards,
        projects: formData.projects,
        portrait_image_url: portraitUrl,
        working_image_url: workingUrl,
      };

      if (about) {
        const { error } = await supabase
          .from("about")
          .update(aboutData)
          .eq("id", about.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("about").insert(aboutData);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "About section updated",
      });
      fetchAbout();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save about data",
      });
    }
    setSaving(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>About Section Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="bio">Biography</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
              rows={5}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="years">Years Experience</Label>
              <Input
                id="years"
                type="number"
                value={formData.years_experience}
                onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="clients">Happy Clients</Label>
              <Input
                id="clients"
                type="number"
                value={formData.happy_clients}
                onChange={(e) => setFormData({ ...formData, happy_clients: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="awards">Awards</Label>
              <Input
                id="awards"
                type="number"
                value={formData.awards}
                onChange={(e) => setFormData({ ...formData, awards: parseInt(e.target.value) })}
                required
              />
            </div>
            <div>
              <Label htmlFor="projects">Projects</Label>
              <Input
                id="projects"
                type="number"
                value={formData.projects}
                onChange={(e) => setFormData({ ...formData, projects: parseInt(e.target.value) })}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="portrait">Portrait Image {about && "(leave empty to keep current)"}</Label>
            <Input
              id="portrait"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, portrait_image: e.target.files?.[0] || null })}
              required={!about}
            />
            {about && <img src={about.portrait_image_url} alt="Current portrait" className="mt-2 w-32 h-32 object-cover rounded" />}
          </div>
          <div>
            <Label htmlFor="working">Working Image {about && "(leave empty to keep current)"}</Label>
            <Input
              id="working"
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, working_image: e.target.files?.[0] || null })}
              required={!about}
            />
            {about && <img src={about.working_image_url} alt="Current working" className="mt-2 w-32 h-32 object-cover rounded" />}
          </div>
          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Saving..." : "Save About Section"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
