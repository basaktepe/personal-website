import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Admin Dashboard
        </h1>

        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link to="/admin/settings">Profil Ayarları</Link>
          </Button>

          <Button asChild>
            <Link to="/admin/cv">CV Yönetimi</Link>
          </Button>

          <Button asChild>
            <Link to="/admin/projects">Projeler</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
