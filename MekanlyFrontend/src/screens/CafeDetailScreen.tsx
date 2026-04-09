import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Cafe } from "../types/cafe";

type Props = NativeStackScreenProps<RootStackParamList, "CafeDetail">;

export default function CafeDetailScreen({ route, navigation }: Props) {
  const { cafeId } = route.params;

  const [cafe, setCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
    };

    loadUser();
  }, []);

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:5180/api/cafes/${cafeId}`,
        );
        const data = await response.json();
        setCafe(data);
      } catch (error) {
        console.log("Detail API hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCafe();
  }, [cafeId]);

 const handleFavorite = async () => {
  if (!userId) {
    alert("Favorilere eklemek için önce giriş yapmalısın");
    navigation.navigate("MainTabs", { screen: "ProfileTab" });
    return;
  }

  if (!cafe) return;

  try {
    const response = await fetch(
      `http://10.0.2.2:5180/api/favorites?userId=${userId}&cafeId=${cafe.id}`,
      {
        method: "POST",
      }
    );

    const data = await response.json();
    alert(data.message);
  } catch (error) {
    console.log("Favori hata:", error);
    alert("Favori eklenemedi");
  }
};

  if (loading) {
    return (
      <View style={styles.centerBox}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.infoText}>Mekan detayı yükleniyor...</Text>
      </View>
    );
  }

  if (!cafe) {
    return (
      <View style={styles.centerBox}>
        <Text style={styles.notFound}>Mekan bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cafe.name}</Text>

      <Text style={styles.location}>
        {cafe.district} / {cafe.neighborhood}
      </Text>

      <Text style={styles.rating}>⭐ {cafe.rating}</Text>

      <Text style={styles.label}>Adres</Text>
      <Text style={styles.text}>{cafe.address}</Text>

      <Text style={styles.label}>Açıklama</Text>
      <Text style={styles.text}>{cafe.description}</Text>

      <Text style={styles.label}>Durum</Text>
      <Text style={styles.text}>{cafe.isOpen ? "Açık" : "Kapalı"}</Text>

      <TouchableOpacity style={styles.favButton} onPress={handleFavorite}>
        <Text style={styles.favText}>❤️ Favorilere Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 12,
  },
  rating: {
    fontSize: 18,
    color: "#F59E0B",
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 6,
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  centerBox: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  infoText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 15,
  },
  notFound: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "700",
  },
  favButton: {
    marginTop: 20,
    backgroundColor: "#EF4444",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  favText: {
    color: "#fff",
    fontWeight: "700",
  },
});
