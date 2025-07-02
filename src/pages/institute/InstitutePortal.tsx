import Navigation from "@/components/layout/Navigation";
import InstituteDashboard from "@/components/dashboard/InstituteDashboard";

const InstitutePortal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <InstituteDashboard />
      </div>
    </div>
  );
};

export default InstitutePortal;
