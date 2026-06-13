import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  price?: number;
}

interface InventoryScrollLoadingProps {
  items: InventoryItem[];
}

export function InventoryScrollLoading({ items }: InventoryScrollLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#111827" />
        <Text style={styles.loadingText}>Cargando inventario...</Text>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="folder-outline" size={48} color="#111827" />
        <Text style={styles.emptyText}>No hay productos</Text>
        <Text style={styles.emptySubtext}>Selecciona otra categoría para ver elementos.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        Mostrando {items.length} producto{items.length !== 1 ? 's' : ''}
      </Text>

      <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={true} style={styles.scrollView}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Ionicons name="checkmark-circle-outline" size={16} color="#111827" />
        <Text style={styles.footerText}>Carga completada</Text>
      </View>
    </View>
  );
}

interface ItemCardProps {
  item: InventoryItem;
}

function ItemCard({ item }: ItemCardProps) {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCategory}>{item.category}</Text>
        </View>

        <View
          style={[
            styles.stockBadge,
            item.stock > 10
              ? styles.stockHigh
              : item.stock > 0
                ? styles.stockMedium
                : styles.stockLow,
          ]}
        >
          <Text style={styles.stockText}>{item.stock}</Text>
        </View>
      </View>

      <View style={styles.itemFooter}>
        <Text style={styles.itemInfo}>
          Disponible: <Text style={{ fontWeight: '700' }}>{item.stock} unidad{item.stock !== 1 ? 'es' : ''}</Text>
        </Text>
        {item.price && <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 420,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d6dbe1',
    overflow: 'hidden',
  },
  headerText: {
    color: '#111827',
    fontSize: 13,
    fontWeight: '800',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: '#ffffff',
  },
  loadingText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  emptyText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  emptySubtext: {
    color: '#6b7280',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
  },
  itemCard: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  itemName: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  itemCategory: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '500',
  },
  stockBadge: {
    minWidth: 48,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  stockHigh: {
    backgroundColor: '#111827',
  },
  stockMedium: {
    backgroundColor: '#6b7280',
  },
  stockLow: {
    backgroundColor: '#9ca3af',
  },
  stockText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
    paddingRight: 12,
  },
  itemPrice: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  footerText: {
    color: '#111827',
    fontSize: 12,
    fontWeight: '700',
  },
});
