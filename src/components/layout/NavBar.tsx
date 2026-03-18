import { Menu, Moon, Sun } from "lucide-react";
import { Button } from  "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";



export function Navbar() {

  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "tr" ? "en" : "tr");
  };

  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        {/* Logo / İsim */}
        <Link to="/home" className="text-lg font-semibold">
          Başak Tepe
        </Link>

        {/* Desktop linkler */}
        <div className="hidden items-center gap-6 md:flex text-sm">
          <Link to="/projects" className="hover:underline">
            {t("nav.projects")}
          </Link>
          <Link to="/cv" className="hover:underline">
            {t("nav.cv")}
          </Link>
          <Link to="/contact" className="hover:underline">
            {t("nav.contact")}
          </Link>

        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
            <span className="text-xs font-semibold">{i18n.language === "tr" ? "EN" : "TR"}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobil hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4 pt-16">
              <Link to="/projects">{t("nav.projects")}</Link>
              <Link to="/cv">{t("nav.cv")}</Link>
              <Link to="/contact">{t("nav.contact")}</Link>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
