import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type ProjectInfo = {
    title: string;
    description: string;
    link : string;
};

const DEFAULT_PROJECT: ProjectInfo = {
    title: "",
    description: "",
    link: "#",
};

interface ProjectContextType {
    project: ProjectInfo;
    isLoading: boolean;
    refreshProject: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [project, setProject] = useState<ProjectInfo>(DEFAULT_PROJECT);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProject = useCallback(async () => {
        setIsLoading(true);
        try {
            const ref = doc(db, "settings", "project");
            const snap = await getDoc(ref); 

            if (snap.exists()) {
                setProject(snap.data() as ProjectInfo);
            } else {
                setProject(DEFAULT_PROJECT);
            }
        } catch (error) {
            console.error("Profil Context verisi çekilemedi:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProject();
    }, [fetchProject]);

    const contextValue = {
        project,
        isLoading,
        refreshProfile: fetchProject,
    };

    return (
        <ProjectContext.Provider value={contextValue}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error('useProfile, ProfileProvider içinde kullanılmalıdır.');
    }
    return context;
};