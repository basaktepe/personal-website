import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import pfp from "@/assets/pfp.png"

export function UserCard() {
  return (
    <Card className=" w-full               
    max-w-xs              
    sm:max-w-sm          
    md:max-w-md          
    lg:max-w-lg          
    xl:max-w-xl          
    border bg-background/60 ">
      <CardContent className="flex flex-col items-center gap-4 pt-6 pb-6">
        <Avatar className="h-20 w-20">
          
          <AvatarImage src={pfp} alt="Başak Tepe" />
          <AvatarFallback>BT</AvatarFallback>
        </Avatar>

        <div className="text-center space-y-1">
          <h1 className="text-xl font-semibold">Başak Tepe</h1>
          <p className="text-sm text-muted-foreground">
            Computer Engineering Graduate &amp; Frontend Developer
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href="https://github.com/basaktepe" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="https://www.linkedin.com/basaktepe" target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
