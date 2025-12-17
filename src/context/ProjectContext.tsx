import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { collection, getDocs, query } from 'firebase/firestore'; 
import { db } from '@/lib/firebase';

export type ProjectInfo = {
    id?: string; 
    title: string;
    description: string;
    link: string;
    createdAt?: any;
};

interface ProjectContextType {
    projects: ProjectInfo[];
    isLoading: boolean;
    refreshProjects: () => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
    const [projects, setProjects] = useState<ProjectInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        try {
            
            const q = query(collection(db, "projects")); 
            const querySnapshot = await getDocs(q);
            const projectList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ProjectInfo[];
            
            setProjects(projectList);
        } catch (error) {
            console.error("Projeler çekilemedi:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    return (
        <ProjectContext.Provider value={{ projects, isLoading, refreshProjects: fetchProjects }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (!context) throw new Error('useProject, ProjectProvider içinde kullanılmalıdır.');
    return context;
};