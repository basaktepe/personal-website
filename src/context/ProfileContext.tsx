import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type ProfileSettings = {
    name: string;
    title: string;
    github: string;
    linkedin: string;
};

const DEFAULT_PROFILE: ProfileSettings = {
    name: "",
    title: "",
    github: "#",
    linkedin: "#",
};

interface ProfileContextType {
    profile: ProfileSettings;
    isLoading: boolean;
    refreshProfile: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState<ProfileSettings>(DEFAULT_PROFILE);
    const [isLoading, setIsLoading] = useState(true);

    const fetchProfile = useCallback(async () => {
        setIsLoading(true);
        try {
            const ref = doc(db, "settings", "profile");
            const snap = await getDoc(ref); 

            if (snap.exists()) {
                setProfile(snap.data() as ProfileSettings);
            } else {
                setProfile(DEFAULT_PROFILE);
            }
        } catch (error) {
            console.error("Profil Context verisi çekilemedi:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const contextValue = {
        profile,
        isLoading,
        refreshProfile: fetchProfile,
    };

    return (
        <ProfileContext.Provider value={contextValue}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfile, ProfileProvider içinde kullanılmalıdır.');
    }
    return context;
};