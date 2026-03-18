import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function AdminDashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          {t("admin.dashboard.title")}
        </h1>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/admin/settings">{t("admin.dashboard.profileSettings")}</Link>
          </Button>

          <Button asChild>
            <Link to="/admin/cv">{t("admin.dashboard.cvManagement")}</Link>
          </Button>

          <Button asChild>
            <Link to="/admin/projects">{t("admin.dashboard.projects")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
