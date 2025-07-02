import { Routes, Route } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import EmployerDashboard from "@/components/dashboard/EmployerDashboard";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";

const EmployerPortal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mx-auto px-4 py-8">
              <EmployerDashboard />
            </div>
          }
        />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/settings" element={<AccountSettings />} />
      </Routes>
    </div>
  );
};

export default EmployerPortal;
