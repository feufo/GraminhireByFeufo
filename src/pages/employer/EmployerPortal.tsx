import Navigation from "@/components/layout/Navigation";
import EmployerDashboard from "@/components/dashboard/EmployerDashboard";

const EmployerPortal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <EmployerDashboard />
      </div>
    </div>
  );
};

export default EmployerPortal;
