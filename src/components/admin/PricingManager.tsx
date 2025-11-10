import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Plus } from "lucide-react";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  features: any;
  category: string;
  popular: boolean;
  notes: string | null;
  display_order: number;
}

export function PricingManager() {
  const { toast } = useToast();
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    features: "",
    category: "wedding",
    popular: false,
    notes: "",
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const { data, error } = await supabase
      .from("pricing")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load pricing plans",
      });
    } else {
      setPlans(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const planData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      features: formData.features.split("\n").filter(f => f.trim()),
      category: formData.category,
      popular: formData.popular,
      notes: formData.notes || null,
      display_order: editingPlan?.display_order ?? plans.length,
    };

    if (editingPlan) {
      const { error } = await supabase
        .from("pricing")
        .update(planData)
        .eq("id", editingPlan.id);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update plan",
        });
      } else {
        toast({
          title: "Success",
          description: "Plan updated",
        });
      }
    } else {
      const { error } = await supabase.from("pricing").insert(planData);

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add plan",
        });
      } else {
        toast({
          title: "Success",
          description: "Plan added",
        });
      }
    }

    setFormData({ name: "", description: "", price: "", features: "", category: "wedding", popular: false, notes: "" });
    setEditingPlan(null);
    fetchPlans();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("pricing").delete().eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete plan",
      });
    } else {
      toast({
        title: "Success",
        description: "Plan deleted",
      });
      fetchPlans();
    }
  };

  const openEditDialog = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      features: plan.features.join("\n"),
      category: plan.category,
      popular: plan.popular,
      notes: plan.notes || "",
    });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-slate-950">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900 dark:text-white">Pricing Plans</CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Manage your pricing packages</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingPlan(null);
                setFormData({ name: "", description: "", price: "", features: "", category: "wedding", popular: false, notes: "" });
              }} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPlan ? "Edit Plan" : "Add Plan"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  required
                  rows={5}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                >
                  <option value="wedding">Wedding</option>
                  <option value="video">Video & Other Services</option>
                </select>
              </div>
              <div>
                <Label htmlFor="notes">Notes (optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="popular"
                  checked={formData.popular}
                  onCheckedChange={(checked) => setFormData({ ...formData, popular: checked as boolean })}
                />
                <Label htmlFor="popular">Mark as popular</Label>
              </div>
              <Button type="submit" className="w-full">
                {editingPlan ? "Update" : "Add"} Plan
              </Button>
            </form>
          </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {plans.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <p>No pricing plans yet. Add your first plan above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {plans.map((plan) => (
              <div key={plan.id} className="p-5 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
                      {plan.popular && <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-medium">Popular</span>}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{plan.description}</p>
                    <p className="font-semibold text-slate-900 dark:text-white mt-3">{plan.price}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Category: {plan.category}</p>
                    {plan.notes && <p className="text-xs italic text-slate-600 dark:text-slate-400 mt-2">{plan.notes}</p>}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon" onClick={() => openEditDialog(plan)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Plan</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="edit-name">Name</Label>
                          <Input
                            id="edit-name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                          <Label htmlFor="edit-price">Price</Label>
                          <Input
                            id="edit-price"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-features">Features (one per line)</Label>
                          <Textarea
                            id="edit-features"
                            value={formData.features}
                            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                            required
                            rows={5}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-category">Category</Label>
                          <select
                            id="edit-category"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                          >
                            <option value="wedding">Wedding</option>
                            <option value="video">Video & Other Services</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="edit-notes">Notes (optional)</Label>
                          <Textarea
                            id="edit-notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="edit-popular"
                            checked={formData.popular}
                            onCheckedChange={(checked) => setFormData({ ...formData, popular: checked as boolean })}
                          />
                          <Label htmlFor="edit-popular">Mark as popular</Label>
                        </div>
                        <Button type="submit" className="w-full">
                          Update Plan
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(plan.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
