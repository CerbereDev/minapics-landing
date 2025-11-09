import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
}

export function ServicesManager() {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load services",
      });
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = editingService?.image_url || "";

    if (formData.image) {
      const fileExt = formData.image.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("website-images")
        .upload(filePath, formData.image);

      if (uploadError) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to upload image",
        });
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from("website-images")
        .getPublicUrl(filePath);

      imageUrl = publicUrl;
    }

    const serviceData = {
      title: formData.title,
      description: formData.description,
      image_url: imageUrl,
      display_order: editingService?.display_order ?? services.length,
    };

    if (editingService) {
      const { error } = await supabase
        .from("services")
        .update(serviceData)
        .eq("id", editingService.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update service",
        });
      } else {
        toast({
          title: "Success",
          description: "Service updated",
        });
      }
    } else {
      const { error } = await supabase.from("services").insert(serviceData);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add service",
        });
      } else {
        toast({
          title: "Success",
          description: "Service added",
        });
      }
    }

    setFormData({ title: "", description: "", image: null });
    setEditingService(null);
    fetchServices();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete service",
      });
    } else {
      toast({
        title: "Success",
        description: "Service deleted",
      });
      fetchServices();
    }
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: null,
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Services Management</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingService(null);
              setFormData({ title: "", description: "", image: null });
            }}>Add Service</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? "Edit Service" : "Add Service"}</DialogTitle>
            </DialogHeader>
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image {editingService && "(leave empty to keep current)"}</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                  required={!editingService}
                />
              </div>
              <Button type="submit" className="w-full">
                {editingService ? "Update" : "Add"} Service
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="flex items-start gap-4 p-4 border border-border rounded-lg">
              <img src={service.image_url} alt={service.title} className="w-24 h-24 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => openEditDialog(service)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Service</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="edit-title">Title</Label>
                        <Input
                          id="edit-title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-image">Image (leave empty to keep current)</Label>
                        <Input
                          id="edit-image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Update Service
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(service.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
