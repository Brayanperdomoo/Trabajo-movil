import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DropdownOption {
  value: string;
  label: string;
}

interface InventoryDropdownProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
}

export function InventoryDropdown({
  label,
  options,
  value,
  onChange,
}: InventoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = options.find((option) => option.value === value)?.label || 'Seleccionar';

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <View>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={({ pressed }) => [styles.dropdownButton, pressed && styles.dropdownButtonPressed]}
        onPress={() => setIsOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`Dropdown: ${selectedLabel}`}
      >
        <Text style={styles.dropdownButtonText}>{selectedLabel}</Text>
        <Ionicons name="chevron-down" size={22} color="#111827" />
      </Pressable>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setIsOpen(false)}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>

              <Pressable onPress={() => setIsOpen(false)} accessibilityRole="button">
                <Ionicons name="close" size={24} color="#111827" />
              </Pressable>
            </View>

            <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
              {options.map((option) => {
                const isSelected = option.value === value;

                return (
                  <Pressable
                    key={option.value}
                    style={({ pressed }) => [
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected,
                      pressed && styles.optionButtonPressed,
                    ]}
                    onPress={() => handleSelect(option.value)}
                    accessibilityRole="button"
                    accessibilityLabel={`Opción: ${option.label}`}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={20} color="#111827" />
                    )}

                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: '#374151',
    marginBottom: 10,
    fontWeight: '700',
    fontSize: 13,
  },
  dropdownButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d6dbe1',
  },
  dropdownButtonPressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.96,
  },
  dropdownButtonText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(17, 24, 39, 0.44)',
    justifyContent: 'flex-start',
    paddingTop: 72,
    paddingHorizontal: 16,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d6dbe1',
    overflow: 'hidden',
    maxWidth: 340,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  modalTitle: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
  },
  optionsList: {
    maxHeight: 320,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  optionButtonPressed: {
    opacity: 0.9,
  },
  optionButtonSelected: {
    backgroundColor: '#f3f4f6',
  },
  optionText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    marginLeft: 12,
  },
  optionTextSelected: {
    color: '#111827',
    fontWeight: '800',
  },
});
