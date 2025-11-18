import React, { createContext, useState, useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import api from "./api";

interface ProfileContextType {
  profile: any | null;
  loading: boolean;
  loadProfile: () => Promise<void>;
  setProfile: (p: any) => void;
}

const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  loading: true,
  loadProfile: async () => {},
  setProfile: () => {},
});

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    if (!user) return; // Não faz nada se o usuário não estiver logado
    if (profile) return; // Evita fazer a chamada novamente se o perfil já está carregado

    setLoading(true); // Marca o início do carregamento
    try {
      const res = await api.get("/api/v1/profiles");
      const myProfile = res.data.find((p: any) => p.userId === user.id);
      setProfile(myProfile || null); // Atualiza o perfil no contexto
    } catch (err) {
      console.log("Erro ao carregar perfil:", err);
    } finally {
      setLoading(false); // Marca o fim do carregamento
    }
  };

  useEffect(() => {
    loadProfile();
  }, [user]); // Recarrega o perfil sempre que o usuário mudar

  return (
    <ProfileContext.Provider value={{ profile, loading, loadProfile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
