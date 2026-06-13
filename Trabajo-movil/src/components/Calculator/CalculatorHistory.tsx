import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCalculator } from '@/src/context/CalculatorContext';

interface CalculatorHistoryProps {
  isVisible: boolean;
  onClose: () => void;
}

export function CalculatorHistory({
  isVisible,
  onClose,
}: CalculatorHistoryProps) {
  const { history, clearHistory } = useCalculator();

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Historial</Text>
          <Pressable onPress={onClose} hitSlop={8} accessibilityRole="button">
            <Ionicons name="close" size={24} color="#111827" />
          </Pressable>
        </View>

        {history.length > 0 ? (
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.historyItem}>
                <Text style={styles.historyText}>{item}</Text>
              </View>
            )}
            scrollEnabled={true}
            style={styles.list}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calculator-outline" size={48} color="#111827" />
            <Text style={styles.emptyText}>Sin historial</Text>
          </View>
        )}

        {history.length > 0 && (
          <Pressable
            style={({ pressed }) => [styles.clearButton, pressed && styles.clearButtonPressed]}
            onPress={clearHistory}
          >
            <Ionicons name="trash-outline" size={18} color="#ffffff" />
            <Text style={styles.clearButtonText}>Borrar</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(17, 24, 39, 0.4)',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  container: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '82%',
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#111827',
  },
  list: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    maxHeight: 320,
  },
  historyItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 6,
    backgroundColor: '#f9fafb',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  historyText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Courier New',
  },
  emptyState: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 44,
    gap: 12,
  },
  emptyText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
    marginHorizontal: 20,
    marginVertical: 12,
    paddingVertical: 12,
    borderRadius: 14,
    gap: 8,
  },
  clearButtonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
});
