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
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-950">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">Portfolio</CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Manage your portfolio images</p>
          </div>
          <Label htmlFor="portfolio-upload">
            <Button type="button" disabled={uploading} className="gap-2">
              <Plus className="w-4 h-4" />
              {uploading ? "Uploading..." : "Add Image"}
            </Button>
          </Label>
          <Input
            id="portfolio-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <p>No portfolio images yet. Add your first image above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="relative group aspect-square">
                <img
                  src={item.image_url}
                  alt={item.alt_text}
                  className="w-full h-full object-cover rounded-lg border border-slate-200 dark:border-slate-800"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(item.id, item.image_url)}
                    className="shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
