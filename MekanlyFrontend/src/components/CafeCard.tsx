import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  cafe: any;
  onPress: () => void;
};

export default function CafeCard({ cafe, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{cafe?.name ?? "İsimsiz Mekan"}</Text>
      <Text style={styles.location}>
        {cafe?.district ?? "-"} / {cafe?.neighborhood ?? "-"}
      </Text>
      <Text style={styles.address}>{cafe?.address ?? "-"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  location: {
    color: "#64748B",
    marginTop: 6,
  },
  address: {
    color: "#475569",
    marginTop: 6,
  },
});
