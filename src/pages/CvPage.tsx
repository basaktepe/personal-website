import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Loader2, Download } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function CvPage() {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCv = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "cv"));
        if (snap.exists()) {
          setUrl((snap.data() as any).url || null);
        }
      } catch (error) {
        console.error("CV yüklenirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCv();
  }, []);

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-center mb-8 uppercase tracking-widest">{t("cv.title")}</h1>

      <Card className="bg-background/60 shadow-xl border-none">
        <CardContent className="p-2 md:p-6 space-y-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[600px] space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground italic">{t("cv.loading")}</p>
            </div>
          ) : url ? (
            <div className="space-y-6">

              <div className="w-full h-[600px] md:h-[800px] rounded-lg border bg-slate-100 overflow-hidden shadow-inner">
                <iframe
                  src={`${url}#view=FitH`}
                  className="w-full h-full"
                  title="CV Preview"
                />
              </div>


              <div className="flex flex-col sm:flex-row gap-4">


                <Button asChild variant="outline" className="w-full flex gap-2">
                  <a href={url} download="Basak_Tepe_CV.pdf">
                    <Download className="w-4 h-4" /> {t("cv.download")}
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              {t("cv.notFound")}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
