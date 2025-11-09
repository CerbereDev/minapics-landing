import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ContactData {
  id: string;
  email: string;
  phone: string;
  location: string;
}

export function ContactManager() {
  const { toast } = useToast();
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    const { data, error } = await supabase
      .from("contact")
      .select("*")
      .single();

    if (error && error.code !== 'PGRST116') {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load contact data",
      });
    } else if (data) {
      setContact(data);
      setFormData({
        email: data.email,
        phone: data.phone,
        location: data.location,
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const contactData = {
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
    };

    try {
      if (contact) {
        const { error } = await supabase
          .from("contact")
          .update(contactData)
          .eq("id", contact.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("contact").insert(contactData);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Contact information updated",
      });
      fetchContact();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save contact data",
      });
    }
    setSaving(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information Management</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
          </div>
          <Button type="submit" disabled={saving} className="w-full">
            {saving ? "Saving..." : "Save Contact Information"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
