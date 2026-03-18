import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation();

  return (
    <section className="flex justify-center px-4 mt-14">
      <div className="w-full max-w-4xl text-center space-y-6">

        <h2 className="text-4xl font-bold tracking-tight">
          {t("home.greeting")}
        </h2>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t("home.welcome")}
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">{t("home.contactInfo")}</p>

        <div className="flex justify-center">
          <span className="h-px w-24 bg-muted" />
        </div>

      </div>
    </section>
  );
}

export default HomePage;
