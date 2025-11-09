import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus } from "lucide-react";

interface PortfolioItem {
  id: string;
  image_url: string;
  alt_text: string;
  display_order: number;
}

export function PortfolioManager() {
  const { toast } = useToast();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load portfolio items",
      });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("website-images")
      .upload(filePath, file);

    if (uploadError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload image",
      });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from("website-images")
      .getPublicUrl(filePath);

    const { error: insertError } = await supabase.from("portfolio").insert({
      image_url: publicUrl,
      alt_text: file.name,
      display_order: items.length,
    });

    if (insertError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save portfolio item",
      });
    } else {
      toast({
        title: "Success",
        description: "Portfolio item added",
      });
      fetchItems();
    }
    setUploading(false);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    // Extract path from URL
    const path = imageUrl.split("/").slice(-2).join("/");
    
    await supabase.storage.from("website-images").remove([path]);
    
    const { error } = await supabase.from("portfolio").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete item",
      });
    } else {
      toast({
        title: "Success",
        description: "Item deleted",
      });
      fetchItems();
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="portfolio-upload">
            <div className="flex items-center gap-2 cursor-pointer">
              <Button type="button" disabled={uploading}>
                <Plus className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Add Image"}
              </Button>
            </div>
          </Label>
          <Input
            id="portfolio-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative group">
              <img
                src={item.image_url}
                alt={item.alt_text}
                className="w-full h-32 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(item.id, item.image_url)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
