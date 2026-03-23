import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import { useProfile } from '@/context/ProfileContext';
import { useTranslation } from "react-i18next";
import type { LocalizedString } from "@/types/localized";
import { emptyLocalizedString } from "@/types/localized";

type ProfileSettings = {
    name: string;
    title: LocalizedString;
    github: string;
    linkedin: string;
    avatarUrl: string;
};

export default function AdminSettingsPage() {
    const [profile, setProfile] = useState<ProfileSettings>({
        name: "",
        title: emptyLocalizedString(),
        github: "",
        linkedin: "",
        avatarUrl: "",
    });
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { refreshProfile } = useProfile();
    const { t } = useTranslation();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const ref = doc(db, "settings", "profile");
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    setProfile({
                        ...data,
                        // Backward compat: if title is a plain string, convert it
                        title: typeof data.title === "string"
                            ? { tr: data.title, en: "" }
                            : data.title || emptyLocalizedString(),
                    } as ProfileSettings);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (field: keyof ProfileSettings, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleTitleChange = (lang: keyof LocalizedString, value: string) => {
        setProfile((prev) => ({
            ...prev,
            title: { ...prev.title, [lang]: value },
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const saveProfile = async () => {
        setIsLoading(true);
        try {
            let finalImageUrl = profile.avatarUrl;

            if (file) {
                const storageRef = ref(storage, `profile/pfp_${Date.now()}`);
                await uploadBytes(storageRef, file);
                finalImageUrl = await getDownloadURL(storageRef);
            }

            const updatedProfile = { ...profile, avatarUrl: finalImageUrl };
            await setDoc(doc(db, "settings", "profile"), updatedProfile);

            await refreshProfile();
            setFile(null);
            toast.success(t("admin.settings.success"));
        } catch (error) {
            console.error(error);
            toast.error(t("admin.settings.error"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="p-6 max-w-xl space-y-4 w-full flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold">{t("admin.settings.title")}</h1>

                <div className="flex flex-col items-center gap-4">
                    <div className="h-24 w-24 rounded-full border overflow-hidden bg-muted">
                        <img
                            src={file ? URL.createObjectURL(file) : (profile.avatarUrl || "/placeholder.jpg")}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <label className="cursor-pointer bg-secondary px-4 py-2 rounded-md text-sm border">
                        {t("admin.settings.selectPhoto")}
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                </div>

                <Input value={profile.name} onChange={(e) => handleChange("name", e.target.value)} placeholder={t("admin.settings.fullName")} disabled={isLoading} />

                <div className="w-full space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{t("admin.settings.titlePlaceholder")} (TR)</label>
                    <Input value={profile.title.tr} onChange={(e) => handleTitleChange("tr", e.target.value)} placeholder="Yazılım Geliştirici" disabled={isLoading} />
                </div>
                <div className="w-full space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{t("admin.settings.titlePlaceholder")} (EN)</label>
                    <Input value={profile.title.en} onChange={(e) => handleTitleChange("en", e.target.value)} placeholder="Software Developer" disabled={isLoading} />
                </div>

                <Input value={profile.github} onChange={(e) => handleChange("github", e.target.value)} placeholder={t("admin.settings.github")} disabled={isLoading} />
                <Input value={profile.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} placeholder={t("admin.settings.linkedin")} disabled={isLoading} />

                <Button className="w-full" onClick={saveProfile} disabled={isLoading}>
                    {isLoading ? t("admin.settings.saving") : t("admin.settings.save")}
                </Button>
            </div>
        </div>
    );
}
