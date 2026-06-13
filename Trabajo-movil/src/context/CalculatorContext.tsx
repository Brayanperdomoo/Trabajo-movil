import React, { createContext, useContext, useState, useCallback } from 'react';

interface CalculatorContextType {
  display: string;
  previousValue: string | null;
  operation: string | null;
  shouldResetDisplay: boolean;
  history: string[];

  handleNumberPress: (num: string) => void;
  handleOperation: (op: string) => void;
  handleEquals: () => void;
  handleClear: () => void;
  handleDelete: () => void;
  handlePercent: () => void;
  handleToggleSign: () => void;
  clearHistory: () => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [shouldResetDisplay, setShouldResetDisplay] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  // Convierte el texto visible en número real para poder operar sin errores.
  const parseValue = (val: string): number => {
    const num = parseFloat(val.replace(',', '.'));
    return isFinite(num) ? num : 0;
  };

  // Normaliza resultados para que el display no muestre números demasiado largos.
  const formatNumber = (num: number): string => {
    if (!isFinite(num)) return '0';
    if (num === 0) return '0';

    const str = num.toString();
    if (str.includes('e')) {
      return num.toExponential(6);
    }

    if (str.includes('.')) {
      const parts = str.split('.');
      if (parts[1].length > 10) {
        return parseFloat(str).toFixed(10).replace(/\.?0+$/, '');
      }
    }

    return str;
  };

  const handleNumberPress = useCallback((num: string) => {
    setDisplay((prev) => {
      if (shouldResetDisplay) {
        setShouldResetDisplay(false);
        return num === '.' ? '0.' : num;
      }

      if (num === '.' && prev.includes('.')) return prev;
      if (num === '0' && prev === '0' && !prev.includes('.')) return prev;
      if (num === '.' && prev === '0') return prev + num;
      if (prev === '0' && num !== '.') return num;

      return prev + num;
    });
  }, [shouldResetDisplay]);

  const performOperation = (
    prev: number,
    current: number,
    op: string
  ): number => {
    switch (op) {
      case '+':
        return prev + current;
      case '−':
        return prev - current;
      case '×':
        return prev * current;
      case '÷':
        return current === 0 ? 0 : prev / current;
      case '%':
        return prev % current;
      case '^':
        return Math.pow(prev, current);
      default:
        return current;
    }
  };

  const handleOperation = useCallback((op: string) => {
    const currentValue = parseValue(display);

    if (previousValue !== null && operation && !shouldResetDisplay) {
      const prevNum = parseValue(previousValue);
      const result = performOperation(prevNum, currentValue, operation);
      const formattedResult = formatNumber(result);

      setDisplay(formattedResult);
      setPreviousValue(formattedResult);
    } else {
      setPreviousValue(display);
    }

    setOperation(op);
    setShouldResetDisplay(true);
  }, [display, previousValue, operation, shouldResetDisplay]);

  const handleEquals = useCallback(() => {
    if (operation && previousValue !== null) {
      const currentValue = parseValue(display);
      const prevNum = parseValue(previousValue);
      const result = performOperation(prevNum, currentValue, operation);
      const formattedResult = formatNumber(result);

      const calculation = `${previousValue} ${operation} ${display} = ${formattedResult}`;
      setHistory((prev) => [calculation, ...prev.slice(0, 9)]);

      setDisplay(formattedResult);
      setPreviousValue(null);
      setOperation(null);
      setShouldResetDisplay(true);
    }
  }, [display, operation, previousValue]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setShouldResetDisplay(false);
  }, []);

  const handleDelete = useCallback(() => {
    if (display.length === 1) {
      setDisplay('0');
    } else {
      setDisplay((prev) => prev.slice(0, -1));
    }
  }, [display]);

  const handlePercent = useCallback(() => {
    const currentValue = parseValue(display);
    const result = currentValue / 100;
    setDisplay(formatNumber(result));
  }, [display]);

  const handleToggleSign = useCallback(() => {
    const currentValue = parseValue(display);
    const result = currentValue * -1;
    setDisplay(formatNumber(result));
  }, [display]);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const value: CalculatorContextType = {
    display,
    previousValue,
    operation,
    shouldResetDisplay,
    history,
    handleNumberPress,
    handleOperation,
    handleEquals,
    handleClear,
    handleDelete,
    handlePercent,
    handleToggleSign,
    clearHistory,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator debe ser usado dentro de CalculatorProvider');
  }
  return context;
}
