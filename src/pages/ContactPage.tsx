import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const res = await fetch("https://formspree.io/f/xldqldag", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    setStatus(res.ok ? "success" : "error");
    form.reset();
  };

  return (
    <div className="py-12 max-w-xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">{t("contact.title")}</h1>

      <Card className="bg-background/60">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="name" placeholder={t("contact.name")} required />
            <Input name="email" placeholder={t("contact.email")} required type="email" />
            <Textarea name="message" placeholder={t("contact.message")} required />

            <Button type="submit" className="w-full">
              {status === "loading" ? t("contact.sending") : t("contact.send")}
            </Button>

            {status === "success" && (
              <p className="text-green-600 text-sm mt-2">{t("contact.success")}</p>
            )}
            {status === "error" && (
              <p className="text-red-600 text-sm mt-2">{t("contact.error")}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
