import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface CalculatorDisplayProps {
  value: string;
  operation?: string | null;
  previousValue?: string | null;
}

export function CalculatorDisplay({
  value,
  operation,
  previousValue,
}: CalculatorDisplayProps) {
  const [animValue] = useState(new Animated.Value(1));

  useEffect(() => {
    animValue.setValue(0.95);
    Animated.spring(animValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [value, animValue]);

  return (
    <View style={styles.container}>
      {operation && (
        <View style={styles.operationRow}>
          <Text style={styles.operationText}>{previousValue}</Text>
          <Text style={styles.operatorSymbol}>{operation}</Text>
        </View>
      )}

      <Animated.View style={{ transform: [{ scale: animValue }] }}>
        <Text style={styles.mainValue} numberOfLines={1}>
          {value}
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 22,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d6dbe1',
    marginBottom: 20,
  },
  operationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  operationText: {
    fontSize: 15,
    color: '#6b7280',
    fontWeight: '600',
  },
  operatorSymbol: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '700',
  },
  mainValue: {
    fontSize: 52,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'right',
  },
});
