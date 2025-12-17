import { useProject } from '@/context/ProjectContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FolderCode } from "lucide-react";

export default function ProjectPage() {
    const { projects, isLoading } = useProject();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex flex-col items-center mb-10 space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Projelerim</h1>
                <p className="text-muted-foreground text-center max-w-[600px] !mt-6">
                    Geliştirdiğim projeler ve üzerinde çalıştığım çalışmaların bir listesi.
                </p>
            </div>

            {projects.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                    Henüz bir proje eklenmemiş.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((proj) => (
                        <Card key={proj.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center space-x-2 mb-2">
                                    <FolderCode className="w-5 h-5 text-primary" />
                                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        Project
                                    </span>
                                </div>
                                <CardTitle className="text-xl">{proj.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                                    {proj.description}
                                </CardDescription>
                            </CardContent>
                            <CardFooter className="border-t pt-4">
                                <Button asChild variant="outline" className="w-full">
                                    <a 
                                        href={proj.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        İncele <ExternalLink className="w-4 h-4" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}