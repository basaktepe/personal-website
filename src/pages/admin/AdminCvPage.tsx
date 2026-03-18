import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";

export default function AdminCvPage() {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const uploadCv = async () => {
        if (!file) {
            toast.warn(t("admin.cv.selectFile"), { position: "top-center" });
            return;
        }

        setIsLoading(true);

        try {

            const storageRef = ref(storage, `cv/${file.name}`);

            toast.info(t("admin.cv.uploadingInfo"), { autoClose: 2000, position: "top-center" });
            await uploadBytes(storageRef, file);


            const url = await getDownloadURL(storageRef);

            await setDoc(doc(db, "settings", "cv"), { url });


            toast.success(t("admin.cv.success"), { position: "top-center" });
            setFile(null);

        } catch (error) {
            console.error("CV yükleme veya URL kaydetme hatası:", error);

            toast.error(t("admin.cv.error"), { position: "top-center" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center mt-10">
            <div className="p-6 space-y-4 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center">{t("admin.cv.title")}</h1>

                <Input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    disabled={isLoading}
                />
                <Button
                    onClick={uploadCv}
                    disabled={isLoading || !file}
                    className="w-full"
                >
                    {isLoading ? t("admin.cv.uploading") : t("admin.cv.upload")}
                </Button>
            </div>
        </div>
    );
}
