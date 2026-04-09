import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import CafeCard from "../components/CafeCard";
import CategoryChip from "../components/CategoryChip";
import { RootStackParamList, MainTabParamList } from "../types/navigation";

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, "HomeTab">,
  NativeStackScreenProps<RootStackParamList>
>;

// 🔥 TYPE EN ÜSTE ALINDI (ÖNEMLİ)
type Cafe = {
  id: string;
  name: string;
  district: string;
  neighborhood: string;
  description: string;
  rating: number;
  address: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
};

const categoryOptions = [
  "Tümü",
  "Çalışma",
  "Sessiz",
  "Canlı Müzik",
  "Wifi",
  "Popüler",
];

export default function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCafes();
  }, []);

  const fetchCafes = async () => {
    try {
      const response = await fetch("http://10.0.2.2:5180/api/cafes");
      const data: Cafe[] = await response.json();
      setCafes(data);
    } catch (error) {
      console.log("API hata:", error);
      setError("Mekanlar yüklenemedi");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Mekanly</Text>
      <Text style={styles.subtitle}>İhtiyacına uygun mekanı keşfet</Text>

      <TextInput
        placeholder="Mekan, semt veya mahalle ara..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        placeholderTextColor="#94A3B8"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        {categoryOptions.map((item) => (
          <CategoryChip
            key={item}
            label={item}
            selected={selectedCategory === item}
            onPress={() => setSelectedCategory(item)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Önerilen Mekanlar</Text>

      {loading ? (
        <View style={styles.centerBox}>
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text style={styles.infoText}>Mekanlar yükleniyor...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={cafes}
          keyExtractor={(item) => item.id.toString()} // 🔥 FIX
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CafeCard
              cafe={item}
              onPress={() =>
                navigation.navigate("CafeDetail", {
                  cafeId: item.id,
                })
              }
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Bu filtreye uygun mekan bulunamadı.
            </Text>
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },
  subtitle: {
    color: "#64748B",
    marginTop: 4,
    marginBottom: 16,
  },
  search: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  chipsContainer: {
    paddingBottom: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyText: {
    color: "#64748B",
    marginTop: 24,
    textAlign: "center",
  },
  centerBox: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 15,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
