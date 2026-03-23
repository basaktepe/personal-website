import { useState } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'react-toastify';
import { useProject } from '@/context/ProjectContext';
import type { ProjectInfo } from "@/context/ProjectContext";
import { useTranslation } from "react-i18next";
import type { LocalizedString } from "@/types/localized";
import { emptyLocalizedString } from "@/types/localized";

type ProjectFormData = {
    title: LocalizedString;
    description: LocalizedString;
    link: string;
};

const emptyForm = (): ProjectFormData => ({
    title: emptyLocalizedString(),
    description: emptyLocalizedString(),
    link: "",
});

export default function AdminProjectPage() {
    const { projects, isLoading: contextLoading, refreshProjects } = useProject();
    const [isLoading, setIsLoading] = useState(false);
    const { t, i18n } = useTranslation();

    const [formData, setFormData] = useState<ProjectFormData>(emptyForm());
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleLocalizedChange = (field: "title" | "description", lang: keyof LocalizedString, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: { ...prev[field], [lang]: value },
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editingId) {
                const ref = doc(db, "projects", editingId);
                await updateDoc(ref, { ...formData });
                toast.success(t("admin.projects.updated"));
            } else {
                await addDoc(collection(db, "projects"), {
                    ...formData,
                    createdAt: new Date()
                });
                toast.success(t("admin.projects.added"));
            }

            setFormData(emptyForm());
            setEditingId(null);
            await refreshProjects();
        } catch (error) {
            toast.error(t("admin.projects.error"));
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (proj: ProjectInfo) => {
        // Backward compat: handle plain strings from old data
        const title = typeof proj.title === "string"
            ? { tr: proj.title, en: "" }
            : proj.title || emptyLocalizedString();
        const description = typeof proj.description === "string"
            ? { tr: proj.description, en: "" }
            : proj.description || emptyLocalizedString();

        setFormData({ title, description, link: proj.link });
        setEditingId(proj.id!);
    };

    const handleDelete = async (id: string) => {
        if (!confirm(t("admin.projects.confirm"))) return;
        await deleteDoc(doc(db, "projects", id));
        refreshProjects();
        toast.info(t("admin.projects.deleted"));
    };

    const getDisplayValue = (value: LocalizedString | string | undefined): string => {
        if (!value) return "";
        if (typeof value === "string") return value;
        const lang = i18n.language as keyof LocalizedString;
        return value[lang] || value.tr || value.en || "";
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">{t("admin.projects.title")}</h1>

            <form onSubmit={handleSubmit} className="bg-slate-50 p-6 rounded-lg mb-10 space-y-4">
                <h2 className="text-lg font-medium">{editingId ? t("admin.projects.editProject") : t("admin.projects.addProject")}</h2>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{t("admin.projects.projectTitle")} (TR)</label>
                    <Input
                        placeholder="Proje başlığı"
                        value={formData.title.tr}
                        onChange={e => handleLocalizedChange("title", "tr", e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{t("admin.projects.projectTitle")} (EN)</label>
                    <Input
                        placeholder="Project title"
                        value={formData.title.en}
                        onChange={e => handleLocalizedChange("title", "en", e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{t("admin.projects.description")} (TR)</label>
                    <Input
                        placeholder="Proje açıklaması"
                        value={formData.description.tr}
                        onChange={e => handleLocalizedChange("description", "tr", e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{t("admin.projects.description")} (EN)</label>
                    <Input
                        placeholder="Project description"
                        value={formData.description.en}
                        onChange={e => handleLocalizedChange("description", "en", e.target.value)}
                        required
                    />
                </div>

                <Input
                    placeholder={t("admin.projects.projectLink")}
                    value={formData.link}
                    onChange={e => setFormData({ ...formData, link: e.target.value })}
                />
                <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                        {editingId ? t("admin.projects.update") : t("admin.projects.add")}
                    </Button>
                    {editingId && (
                        <Button variant="outline" onClick={() => { setEditingId(null); setFormData(emptyForm()); }}>
                            {t("admin.projects.cancel")}
                        </Button>
                    )}
                </div>
            </form>


            <div className="space-y-4">
                {contextLoading ? <p>{t("common.loading")}</p> : projects.map(proj => (
                    <div key={proj.id} className="border p-4 rounded flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{getDisplayValue(proj.title)}</h3>
                            <p className="text-sm text-gray-500">{getDisplayValue(proj.description)}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm" onClick={() => handleEdit(proj)}>{t("admin.projects.edit")}</Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDelete(proj.id!)}>{t("admin.projects.delete")}</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
