import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  StatusBar,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CalculatorProvider, useCalculator } from '@/src/context/CalculatorContext';
import { CalculatorDisplay } from './CalculatorDisplay';
import { CalculatorKeypad } from './CalculatorKeypad';
import { CalculatorHistory } from './CalculatorHistory';

const CALC_BG = '#edf0f3';

function CalculatorContent() {
  const { display, operation, previousValue } = useCalculator();
  const [showHistory, setShowHistory] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={CALC_BG} />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTextBlock}>
            <Text style={styles.title}>Calculadora</Text>
            <Text style={styles.subtitle}>Operaciones rápidas y limpias</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.historyButton, pressed && styles.historyButtonPressed]}
            onPress={() => setShowHistory(true)}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Abrir historial"
          >
            <Ionicons name="time-outline" size={22} color="#111827" />
          </Pressable>
        </View>

        <CalculatorDisplay
          value={display}
          operation={operation}
          previousValue={previousValue}
        />

        <CalculatorKeypad />
      </View>

      <CalculatorHistory
        isVisible={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </SafeAreaView>
  );
}

export function ModernCalculator() {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: CALC_BG,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    minHeight: 54,
  },
  headerTextBlock: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '900',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
  },
  historyButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d6dbe1',
  },
  historyButtonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.9,
  },
});
