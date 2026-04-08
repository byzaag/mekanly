import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { Cafe } from "../types/cafe";
import { cafeService } from "../services/cafeService";

type Props = NativeStackScreenProps<RootStackParamList, "CafeDetail">;

export default function CafeDetailScreen({ route }: Props) {
  const { cafeId } = route.params;

  const [cafe, setCafe] = useState<Cafe | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCafe = async () => {
      try {
        setLoading(true);
        const data = await cafeService.getCafeById(cafeId);
        setCafe(data);
      } finally {
        setLoading(false);
      }
    };

    fetchCafe();
  }, [cafeId]);

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

      <Text style={styles.label}>Kategoriler</Text>
      <Text style={styles.text}>{cafe.categories.join(", ")}</Text>

      <Text style={styles.label}>Adres</Text>
      <Text style={styles.text}>{cafe.address}</Text>

      <Text style={styles.label}>Açıklama</Text>
      <Text style={styles.text}>{cafe.description}</Text>
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
});
