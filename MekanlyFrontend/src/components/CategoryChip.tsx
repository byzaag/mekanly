import { Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function CategoryChip({ label, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selectedChip]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, selected && styles.selectedText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 8,
  },
  selectedChip: {
    backgroundColor: "#4F46E5",
  },
  text: {
    color: "#3730A3",
    fontWeight: "600",
    fontSize: 13,
  },
  selectedText: {
    color: "#fff",
  },
});
