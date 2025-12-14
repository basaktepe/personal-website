import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import pfp from "@/assets/pfp.png"; 
import { useProfile } from "@/context/ProfileContext"; 

export function UserCard() {
    const { profile, isLoading } = useProfile(); 

    if (isLoading) {
        return (
            <Card className="w-full max-w-md p-6 flex justify-center items-center h-40 border bg-background/60">
                <span className="animate-pulse text-sm text-gray-500">Profil yükleniyor...</span>
            </Card>
        );
    }
    
    return (
        <Card className=" w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border bg-background/60 ">
            <CardContent className="flex flex-col items-center gap-4 pt-6 pb-6">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={pfp} alt={profile.name} />
                    <AvatarFallback>BT</AvatarFallback>
                </Avatar>

                <div className="text-center space-y-1">
                    <h1 className="text-xl font-semibold">{profile.name}</h1>
                    <p className="text-sm text-muted-foreground">
                        {profile.title || "Yazılım Geliştirici"} 
                    </p>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"> 
                            <Github className="h-4 w-4" />
                        </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"> 
                            <Linkedin className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}