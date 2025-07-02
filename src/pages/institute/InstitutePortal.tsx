import { Routes, Route } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import InstituteDashboard from "@/components/dashboard/InstituteDashboard";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";

const InstitutePortal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <div className="container mx-auto px-4 py-8">
              <InstituteDashboard />
            </div>
          }
        />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/settings" element={<AccountSettings />} />
      </Routes>
    </div>
  );
};

export default InstitutePortal;
