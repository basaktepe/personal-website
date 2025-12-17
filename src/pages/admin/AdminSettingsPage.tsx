import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import { useProfile } from '@/context/ProfileContext';

type ProfileSettings = {
    name: string;
    title: string;
    github: string;
    linkedin: string;
    avatarUrl: string;
};

export default function AdminSettingsPage() {
    const [profile, setProfile] = useState<ProfileSettings>({
        name: "",
        title: "",
        github: "",
        linkedin: "",
        avatarUrl: "",
    });
    const [file, setFile] = useState<File | null>(null);
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
                console.error(error);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (field: keyof ProfileSettings, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
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
            toast.success("Profil başarıyla güncellendi!");
        } catch (error) {
            console.error(error);
            toast.error("İşlem başarısız oldu.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="p-6 max-w-xl space-y-4 w-full flex flex-col justify-center items-center">
                <h1 className="text-xl font-semibold">Profil Ayarları</h1>
                
                <div className="flex flex-col items-center gap-4">
                    <div className="h-24 w-24 rounded-full border overflow-hidden bg-muted">
                        <img 
                            src={file ? URL.createObjectURL(file) : (profile.avatarUrl || "/placeholder.jpg")} 
                            className="h-full w-full object-cover" 
                        />
                    </div>
                    <label className="cursor-pointer bg-secondary px-4 py-2 rounded-md text-sm border">
                        Fotoğraf Seç
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                </div>

                <Input value={profile.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Ad Soyad" disabled={isLoading} />
                <Input value={profile.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Title" disabled={isLoading} />
                <Input value={profile.github} onChange={(e) => handleChange("github", e.target.value)} placeholder="GitHub" disabled={isLoading} />
                <Input value={profile.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} placeholder="LinkedIn" disabled={isLoading} />
                
                <Button className="w-full" onClick={saveProfile} disabled={isLoading}>
                    {isLoading ? "Kaydediliyor..." : "Kaydet"}
                </Button>
            </div>
        </div>
    );
}