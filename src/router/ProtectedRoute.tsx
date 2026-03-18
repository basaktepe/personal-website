import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        {t("common.loading")}
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
