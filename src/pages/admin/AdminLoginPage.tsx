import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(t("admin.login.error"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16">
      <Card className="w-full max-w-md bg-background/70">
        <CardContent className="p-6">
          <h1 className="text-2xl font-semibold mb-4 text-center">{t("admin.login.title")}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder={t("admin.login.password")} required />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t("admin.login.loggingIn") : t("admin.login.loginButton")}
            </Button>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
