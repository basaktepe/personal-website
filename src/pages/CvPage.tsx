import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function CvPage() {
  const [url, setUrl] = useState<string | null>(null);

   useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "settings", "cv"));
      if (snap.exists()) setUrl((snap.data() as any).url || null);
    })();
  }, []);

  return (
    <div className="py-12 max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8">CV</h1>

      <Card className="bg-background/60">
        <CardContent className="p-6 space-y-6">
          <p className="text-sm text-muted-foreground">
            Computer Engineering graduate & Software developer. I work with
            JavaScript, TypeScript, React, Redux Toolkit, Tailwind CSS, 
            shadcn/ui, Firebase Authentication and basic Spring Boot.
          </p>

          <Separator />

          <div>
            <h2 className="font-semibold text-lg mb-3">Technologies</h2>
            <ul className="list-disc ml-6 text-sm space-y-1">
              <li>React, JavaScript, TypeScript</li>
              <li>Redux Toolkit, React Router</li>
              <li>Tailwind CSS, shadcn/ui</li>
              <li>Firebase Authentication</li>
              <li>Spring Boot</li>
              <li>SQL (MySQL / MsSQL)</li>
            </ul>
          </div>

          <Separator />

          <Button asChild className="w-full mt-4">
           <a href={url} target="_blank" rel="noopener noreferrer" download>
      <Button className="w-full">Download my CV</Button>
    </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
