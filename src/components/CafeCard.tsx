import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Cafe } from "../types/cafe";

type Props = {
  cafe: Cafe;
  onPress: () => void;
};

export default function CafeCard({ cafe, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.name}>{cafe.name}</Text>

      <Text style={styles.location}>
        {cafe.district} / {cafe.neighborhood}
      </Text>

      <View style={styles.row}>
        <Text style={styles.rating}>⭐ {cafe.rating}</Text>
        <Text style={styles.category}>{cafe.categories[0]}</Text>
      </View>

      <Text style={styles.address} numberOfLines={1}>
        {cafe.address}
      </Text>

      <Text numberOfLines={2} style={styles.desc}>
        {cafe.description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  location: {
    color: "#64748B",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  rating: {
    color: "#F59E0B",
    fontWeight: "600",
  },
  category: {
    color: "#4F46E5",
    fontWeight: "600",
  },
  address: {
    color: "#475569",
    marginBottom: 6,
  },
  desc: {
    color: "#334155",
    lineHeight: 20,
  },
});
