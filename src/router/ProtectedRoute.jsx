import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        Yükleniyor...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

 
  const allowedAdmins = ["basaktepe23@gmail.com"];
  if (!allowedAdmins.includes(user.email || "")) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
