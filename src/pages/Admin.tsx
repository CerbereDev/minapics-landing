import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { PricingManager } from "@/components/admin/PricingManager";
import { AboutManager } from "@/components/admin/AboutManager";
import { ContactManager } from "@/components/admin/ContactManager";

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    // checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/auth");
      return;
    }

    // Check if user has admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .single();

    if (!roles) {
      navigate("/");
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  // if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 dark:bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-950/60">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Panel</h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">Manage your website content</p>
          </div>
          <Button onClick={handleSignOut} variant="outline" className="gap-2">
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        <Tabs defaultValue="portfolio" className="w-full space-y-6">
          <TabsList className="inline-flex h-11 items-center justify-start rounded-lg bg-slate-100 dark:bg-slate-800 p-1 text-slate-600 dark:text-slate-400 w-full overflow-x-auto">
            <TabsTrigger value="portfolio" className="rounded-md px-6 py-2 text-sm font-medium">Portfolio</TabsTrigger>
            <TabsTrigger value="services" className="rounded-md px-6 py-2 text-sm font-medium">Services</TabsTrigger>
            <TabsTrigger value="pricing" className="rounded-md px-6 py-2 text-sm font-medium">Pricing</TabsTrigger>
            <TabsTrigger value="about" className="rounded-md px-6 py-2 text-sm font-medium">About</TabsTrigger>
            <TabsTrigger value="contact" className="rounded-md px-6 py-2 text-sm font-medium">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-4">
            <PortfolioManager />
          </TabsContent>

          <TabsContent value="services" className="space-y-4">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <PricingManager />
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <AboutManager />
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <ContactManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
