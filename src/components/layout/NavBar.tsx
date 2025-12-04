import { Menu, Moon, Sun } from "lucide-react";
import { Button } from  "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../ui/sheet";
import { useTheme } from "@/context/ThemeContext";
import { Link } from "react-router-dom";



export function Navbar() {

  const { theme, toggleTheme } = useTheme();

 


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
            Projeler
          </Link>
          <Link to="/cv" className="hover:underline">
            CV
          </Link>
          <Link to="/contact" className="hover:underline">
            Bana Ulaş
          </Link>
         
        </div>
         <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

        {/* Mobil hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-4 pt-16">
              <Link to="/projects">Projeler</Link>
              <Link to="/cv">CV</Link>
              <Link to="/contact">Bana Ulaş</Link>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
