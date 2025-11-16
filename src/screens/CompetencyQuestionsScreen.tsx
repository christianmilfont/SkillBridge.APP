import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import AuthContext from "../context/AuthContext";
import api from "../context/api";

export default function CompetencyQuestionsScreen({ navigation }: any) {
  const { user } = useContext(AuthContext);
  const [competencies, setCompetencies] = useState<any[]>([]);
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCompetencies();
    loadExistingProfileData();
  }, []);

  const loadCompetencies = async () => {
    try {
      const res = await api.get("/api/v1/competencies");
      setCompetencies(res.data || []);
    } catch (err) {
      console.log("Erro ao carregar competências", err);
      Alert.alert("Erro", "Não foi possível carregar as competências.");
    }
  };

  const loadExistingProfileData = async () => {
    try {
      const res = await api.get("/api/v1/profiles");
      const list = res.data as any[];
      const myProfile = list.find((p) => p.userId === user?.id);
      if (myProfile) {
        setFullName(myProfile.fullName || "");
        setBio(myProfile.bio || "");
        setLocation(myProfile.location || "");
        // carregar competências já existentes (selfAssessedLevel)
        (myProfile.profileCompetencies || []).forEach((pc: any) => {
          setSelected((prev) => ({ ...prev, [pc.competencyId]: pc.selfAssessedLevel }));
        });
      }
    } catch (err) {
      console.log("Erro ao carregar profile existente", err);
    }
  };

  const toggleSkill = (id: string) => {
    setSelected((prev) => {
      if (prev[id] !== undefined) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: 3 };
    });
  };

  const updateLevel = (id: string, value: string) => {
    const n = Number(value);
    if (isNaN(n) || n < 1 || n > 5) return;
    setSelected((prev) => ({ ...prev, [id]: n }));
  };

  const submit = async () => {
    setLoading(true);
    try {
      // 1) encontrar profile do usuário (se houver)
      const resProfiles = await api.get("/api/v1/profiles");
      const profiles = resProfiles.data as any[];
      let profile = profiles.find((p) => p.userId === user?.id);

      // 2) criar profile se não existir
      if (!profile) {
        const createRes = await api.post("/api/v1/profiles", {
          fullName,
          bio,
          location,
          userId: user.id,
        });
        profile = createRes.data;
      } else {
        // opcional: atualizar profile via endpoint se você tiver um PUT (não definido ainda)
        // se não tiver, poderia criar um endpoint para UpdateProfile.
      }

      // 3) enviar competências selecionadas
      const entries = Object.entries(selected);
      for (const [compId, level] of entries) {
        try {
          await api.post(`/api/v1/profiles/${profile.id}/competencies`, {
            competencyId: compId,
            selfAssessedLevel: level,
          });
        } catch (err: any) {
          // pode já existir join — ignore erros individuais
          console.log(`Erro ao adicionar competency ${compId}:`, err?.response?.data || err);
        }
      }

      // 4) Voltar ao perfil e recarregar
      navigation.navigate("Profile");
    } catch (err) {
      console.log("Erro ao salvar perfil e competências", err);
      Alert.alert("Erro", "Não foi possível salvar seu perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Questionário de Competências</Text>

      <Text style={styles.label}>Nome completo</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Seu nome completo" />

      <Text style={styles.label}>Bio</Text>
      <TextInput style={styles.input} value={bio} onChangeText={setBio} placeholder="Uma frase sobre você" />

      <Text style={styles.label}>Localização</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Cidade, Estado" />

      <Text style={styles.subTitle}>Selecione suas competências e nivele (1-5)</Text>

      {competencies.map((c) => {
        const chosen = selected[c.id];
        return (
          <View key={c.id} style={styles.compBox}>
            <TouchableOpacity onPress={() => toggleSkill(c.id)}>
              <Text style={styles.compName}>{c.name}</Text>
              <Text style={styles.compDesc}>{c.description}</Text>
            </TouchableOpacity>

            {chosen !== undefined && (
              <TextInput
                style={styles.levelInput}
                value={String(chosen)}
                keyboardType="numeric"
                onChangeText={(v) => updateLevel(c.id, v)}
                placeholder="1-5"
                maxLength={1}
              />
            )}
          </View>
        );
      })}

      <TouchableOpacity style={styles.saveButton} onPress={submit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveText}>Salvar Perfil</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12 },
  label: { marginTop: 10, fontWeight: "700" },
  input: { backgroundColor: "#F3F4F6", padding: 10, borderRadius: 8, marginTop: 6 },
  subTitle: { marginTop: 14, fontWeight: "700", fontSize: 16 },
  compBox: { marginTop: 12, padding: 12, backgroundColor: "#FFF", borderRadius: 10, elevation: 1 },
  compName: { fontWeight: "700", fontSize: 15 },
  compDesc: { color: "#6B7280", marginTop: 4 },
  levelInput: { width: 80, marginTop: 8, backgroundColor: "#EEF2FF", padding: 8, borderRadius: 8 },
  saveButton: { backgroundColor: "#0B81FF", padding: 14, borderRadius: 10, marginTop: 20, alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "700" },
});
