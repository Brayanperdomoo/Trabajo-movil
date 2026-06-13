import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ButtonVariant = 'number' | 'operator' | 'action' | 'equals' | 'function';

interface CalculatorButtonProps {
  label: string;
  variant: ButtonVariant;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: 'small' | 'large';
}

export function CalculatorButton({
  label,
  variant,
  onPress,
  icon,
  size = 'small',
}: CalculatorButtonProps) {
  const [scaleAnim] = React.useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.94,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getStyles = (): {
    container: ViewStyle;
    text: TextStyle;
  } => {
    const baseContainer: ViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 18,
      flex: 1,
      minHeight: size === 'large' ? 70 : 66,
      borderWidth: 1,
      borderColor: '#d6dbe1',
    };

    const baseText: TextStyle = {
      fontWeight: '700',
      textAlign: 'center',
    };

    switch (variant) {
      case 'number':
        return {
          container: {
            ...baseContainer,
            backgroundColor: '#f9fafb',
          },
          text: {
            ...baseText,
            color: '#111827',
            fontSize: 21,
            fontWeight: '800',
          },
        };

      case 'operator':
        return {
          container: {
            ...baseContainer,
            backgroundColor: '#111827',
            borderColor: '#111827',
          },
          text: {
            ...baseText,
            color: '#ffffff',
            fontSize: 22,
            fontWeight: '900',
          },
        };

      case 'action':
        return {
          container: {
            ...baseContainer,
            backgroundColor: '#e5e7eb',
          },
          text: {
            ...baseText,
            color: '#111827',
            fontSize: 18,
            fontWeight: '800',
          },
        };

      case 'equals':
        return {
          container: {
            ...baseContainer,
            backgroundColor: '#374151',
            borderColor: '#374151',
          },
          text: {
            ...baseText,
            color: '#ffffff',
            fontSize: 20,
            fontWeight: '900',
          },
        };

      case 'function':
        return {
          container: {
            ...baseContainer,
            backgroundColor: '#d1d5db',
          },
          text: {
            ...baseText,
            color: '#111827',
            fontSize: 16,
            fontWeight: '800',
          },
        };

      default:
        return { container: baseContainer, text: baseText };
    }
  };

  const { container, text } = getStyles();

  return (
    <Animated.View
      style={{
        flex: size === 'large' ? 2 : 1,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <Pressable
        style={[styles.buttonContainer, container]}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessible={true}
        accessibilityLabel={label}
      >
        {icon ? (
          <Ionicons name={icon} size={24} color={text.color as string} />
        ) : (
          <Text style={text}>{label}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    marginHorizontal: 0,
    marginVertical: 0,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 1,
  },
});
