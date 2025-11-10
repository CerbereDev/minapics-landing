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
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-950">
      <CardHeader className="space-y-1 pb-4">
        <div>
          <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">Contact Information</CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Update your contact details</p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-slate-900 dark:text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1.5"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-slate-900 dark:text-white">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="mt-1.5"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="location" className="text-sm font-medium text-slate-900 dark:text-white">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
              className="mt-1.5"
              placeholder="City, State, Country"
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
