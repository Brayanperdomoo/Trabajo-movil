import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useCalculator } from '@/src/context/CalculatorContext';
import { CalculatorButton } from './CalculatorButton';

export function CalculatorKeypad() {
  const {
    handleNumberPress,
    handleOperation,
    handleEquals,
    handleClear,
    handleDelete,
    handlePercent,
    handleToggleSign,
  } = useCalculator();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <CalculatorButton label="AC" variant="action" onPress={handleClear} />
        <CalculatorButton label="⌫" variant="action" onPress={handleDelete} />
        <CalculatorButton label="%" variant="function" onPress={handlePercent} />
        <CalculatorButton label="÷" variant="operator" onPress={() => handleOperation('÷')} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="7" variant="number" onPress={() => handleNumberPress('7')} />
        <CalculatorButton label="8" variant="number" onPress={() => handleNumberPress('8')} />
        <CalculatorButton label="9" variant="number" onPress={() => handleNumberPress('9')} />
        <CalculatorButton label="×" variant="operator" onPress={() => handleOperation('×')} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="4" variant="number" onPress={() => handleNumberPress('4')} />
        <CalculatorButton label="5" variant="number" onPress={() => handleNumberPress('5')} />
        <CalculatorButton label="6" variant="number" onPress={() => handleNumberPress('6')} />
        <CalculatorButton label="−" variant="operator" onPress={() => handleOperation('−')} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="1" variant="number" onPress={() => handleNumberPress('1')} />
        <CalculatorButton label="2" variant="number" onPress={() => handleNumberPress('2')} />
        <CalculatorButton label="3" variant="number" onPress={() => handleNumberPress('3')} />
        <CalculatorButton label="+" variant="operator" onPress={() => handleOperation('+')} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="0" variant="number" onPress={() => handleNumberPress('0')} size="large" />
        <CalculatorButton label="." variant="number" onPress={() => handleNumberPress('.')} />
        <CalculatorButton label="+/−" variant="function" onPress={handleToggleSign} />
        <CalculatorButton label="=" variant="equals" onPress={handleEquals} />
      </View>

      <View style={styles.row}>
        <CalculatorButton label="^" variant="function" onPress={() => handleOperation('^')} />
        <CalculatorButton
          label="√"
          variant="function"
          onPress={() => {
            handleOperation('^');
            handleNumberPress('0.5');
            handleEquals();
          }}
        />
        <View style={styles.filler} />
        <View style={styles.filler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  filler: {
    flex: 1,
  },
});
