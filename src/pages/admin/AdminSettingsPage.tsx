import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import { useProfile } from '@/context/ProfileContext';

type ProfileSettings = {
    name: string;
    title: string;
    github: string;
    linkedin: string;
};

export default function AdminSettingsPage() {
    const [profile, setProfile] = useState<ProfileSettings>({
        name: "",
        title: "",
        github: "",
        linkedin: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const { refreshProfile } = useProfile();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const ref = doc(db, "settings", "profile");
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setProfile(snap.data() as ProfileSettings);
                }
            } catch (error) {
                console.error("Profil verisi çekilemedi:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (field: keyof ProfileSettings, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const saveProfile = async () => {
        setIsLoading(true);
        try {
            await setDoc(doc(db, "settings", "profile"), profile);
            
            await refreshProfile(); 

            toast.success("Profil başarıyla güncellendi!", {
                position: "top-center"
            });
        } catch (error) {
            console.error("Kaydetme hatası:", error);
            toast.error("Kaydetme başarısız oldu! Yetki veya Ağ hatası olabilir.", {
                position: "top-center"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="p-6 max-w-xl space-y-4 w-full flex flex-col justify-center items-center ">
                <h1 className="text-xl font-semibold ">Profil Ayarları</h1>
                <Input 
                    value={profile.name} 
                    onChange={(e) => handleChange("name", e.target.value)} 
                    placeholder="Ad Soyad" 
                    disabled={isLoading} 
                />
                <Input 
                    value={profile.title} 
                    onChange={(e) => handleChange("title", e.target.value)} 
                    placeholder="Title" 
                    disabled={isLoading} 
                />
                <Input 
                    value={profile.github} 
                    onChange={(e) => handleChange("github", e.target.value)} 
                    placeholder="GitHub" 
                    disabled={isLoading} 
                />
                <Input 
                    value={profile.linkedin} 
                    onChange={(e) => handleChange("linkedin", e.target.value)} 
                    placeholder="LinkedIn" 
                    disabled={isLoading} 
                />
                <Button onClick={saveProfile} disabled={isLoading}>
                    {isLoading ? "Kaydediliyor..." : "Kaydet"}
                </Button>
            </div>
        </div>
    );
}