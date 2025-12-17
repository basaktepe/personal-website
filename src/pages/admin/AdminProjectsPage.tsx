import { useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import { useProject} from '@/context/ProjectContext';
import type { ProjectInfo } from "@/context/ProjectContext";


export default function AdminProjectPage() {
    const { projects, isLoading: contextLoading, refreshProjects } = useProject();
    const [isLoading, setIsLoading] = useState(false);
  
    const [formData, setFormData] = useState<ProjectInfo>({ title: "", description: "", link: "" });
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editingId) {
                
                const ref = doc(db, "projects", editingId);
                await updateDoc(ref, { ...formData });
                toast.success("Proje güncellendi!");
            } else {
                
                await addDoc(collection(db, "projects"), {
                    ...formData,
                    createdAt: new Date()
                });
                toast.success("Yeni proje eklendi!");
            }
            
            setFormData({ title: "", description: "", link: "" });
            setEditingId(null);
            await refreshProjects();
        } catch (error) {
            toast.error("İşlem başarısız.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (proj: ProjectInfo) => {
        setFormData({ title: proj.title, description: proj.description, link: proj.link });
        setEditingId(proj.id!);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Emin misiniz?")) return;
        await deleteDoc(doc(db, "projects", id));
        refreshProjects();
        toast.info("Proje silindi.");
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Proje Yönetimi</h1>

            <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-lg mb-10 space-y-4">
                <h2 className="text-lg font-medium">{editingId ? "Projeyi Düzenle" : "Yeni Proje Ekle"}</h2>
                <Input 
                    placeholder="Proje Başlığı" 
                    value={formData.title} 
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    required
                />
                <Input 
                    placeholder="Açıklama" 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    required
                />
                <Input 
                    placeholder="Proje Linki" 
                    value={formData.link} 
                    onChange={e => setFormData({...formData, link: e.target.value})}
                />
                <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                        {editingId ? "Güncelle" : "Ekle"}
                    </Button>
                    {editingId && (
                        <Button variant="outline" onClick={() => { setEditingId(null); setFormData({title:"", description:"", link:""}); }}>
                            Vazgeç
                        </Button>
                    )}
                </div>
            </form>

       
            <div className="space-y-4">
                {contextLoading ? <p>Yükleniyor...</p> : projects.map(proj => (
                    <div key={proj.id} className="border p-4 rounded flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{proj.title}</h3>
                            <p className="text-sm text-gray-500">{proj.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" onClick={() => handleEdit(proj)}>Düzenle</Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(proj.id!)}>Sil</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}