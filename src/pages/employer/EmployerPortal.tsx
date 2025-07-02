import { Routes, Route } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import EmployerDashboard from "@/components/dashboard/EmployerDashboard";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";

const EmployerPortal = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployerDashboard />} />
      <Route path="/profile" element={<ProfileSettings />} />
      <Route path="/settings" element={<AccountSettings />} />
    </Routes>
  );
};

export default EmployerPortal;
