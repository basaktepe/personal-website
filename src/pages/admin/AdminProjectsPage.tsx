import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import { useProfile } from '@/context/ProfileContext';

type Project = {
    title: string;
    description: string;
    
};

export default function AdminProjectsPage() {


    const [Project, setProject] = useState<Project>({
        name: "",
        title: "",
        github: "",
        linkedin: "",
    });

    const projects : Project[] = [];

    const [isLoading, setIsLoading] = useState(false);

    addProject(Project: Project) = {
        projects.push(Project);
    };
   

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const ref = doc(db, "settings", "p");
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
                <h1 className="text-xl font-semibold ">Projeler</h1>
                <Button onClick={addProject}>
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