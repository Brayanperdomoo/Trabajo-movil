import 'react-native-gesture-handler';

import React, { useMemo, useRef, useState } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { InfoModal } from '@/src/components/InfoModal';
import { InventoryDropdown } from '@/src/components/InventoryDropdown';
import { InventoryScrollLoading } from '@/src/components/InventoryScrollLoading';
import { SectionCard } from '@/src/components/SectionCard';
import { ModernCalculator } from '@/src/components/Calculator/ModernCalculator';
import { categoryOptions, inventorySeed } from '@/src/data/inventory';

type RootStackParamList = {
  MainTabs: undefined;
  Detail: { productName?: string } | undefined;
  Calculator: undefined;
};

type TabsParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabsParamList>();
const APP_BG = '#edf0f3';

// Ref global para abrir pantallas desde accesos del menú lateral.
const navigationRef = createNavigationContainerRef<RootStackParamList>();

function App() {
  const drawerRef = useRef<DrawerLayout | null>(null);
  const windowDimensions = useWindowDimensions();

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <DrawerLayout
          ref={drawerRef}
          drawerWidth={Math.min(302, windowDimensions.width * 0.78)}
          drawerPosition="left"
          renderNavigationView={() => (
            <DrawerMenu
              drawerRef={drawerRef}
              onGoToCalculator={() => navigationRef.current?.navigate('Calculator')}
            />
          )}
        >
          <NavigationContainer ref={navigationRef}>
            <StatusBar barStyle="dark-content" backgroundColor={APP_BG} />

            <Stack.Navigator
              initialRouteName="MainTabs"
              screenOptions={{
                headerStyle: { backgroundColor: APP_BG },
                headerTintColor: '#111827',
                headerTitleStyle: { fontWeight: '800' },
                contentStyle: { backgroundColor: APP_BG },
              }}
            >
              <Stack.Screen
                name="MainTabs"
                component={TabsNavigator}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Detail"
                component={DetailScreen}
                options={{ title: 'Detalle de producto' }}
              />

              <Stack.Screen
                name="Calculator"
                component={CalculatorScreen}
                options={{ title: 'Calculadora' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </DrawerLayout>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

interface DrawerMenuProps {
  drawerRef: React.RefObject<DrawerLayout | null>;
  onGoToCalculator?: () => void;
  onOpenModal?: () => void;
}

function DrawerMenu({ drawerRef, onGoToCalculator, onOpenModal }: DrawerMenuProps) {
  const closeDrawer = () => drawerRef.current?.closeDrawer();

  const handleAction = (action?: () => void) => {
    closeDrawer();
    action?.();
  };

  return (
    <View style={styles.drawer}>
      <Text style={styles.drawerTitle}>Menú</Text>
      <Text style={styles.drawerText}>
        Accesos rápidos con un estilo más limpio y ordenado.
      </Text>

      <Pressable
        style={({ pressed }) => [styles.drawerButton, pressed && styles.drawerButtonPressed]}
        onPress={() => handleAction(onGoToCalculator)}
        accessibilityRole="button"
        accessibilityLabel="Abrir calculadora"
      >
        <View style={styles.drawerIconWrap}>
          <Ionicons name="calculator-outline" size={20} color="#111827" />
        </View>
        <View style={styles.drawerButtonBody}>
          <Text style={styles.drawerButtonTitle}>Calculadora</Text>
          <Text style={styles.drawerButtonSubtitle}>Abrir pantalla independiente</Text>
        </View>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.drawerButton, pressed && styles.drawerButtonPressed]}
        onPress={() => handleAction(onOpenModal)}
        accessibilityRole="button"
        accessibilityLabel="Abrir modal"
      >
        <View style={styles.drawerIconWrap}>
          <Ionicons name="alert-circle-outline" size={20} color="#111827" />
        </View>
        <View style={styles.drawerButtonBody}>
          <Text style={styles.drawerButtonTitle}>Modal</Text>
          <Text style={styles.drawerButtonSubtitle}>Mostrar aviso emergente</Text>
        </View>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.drawerButton, pressed && styles.drawerButtonPressed]}
        onPress={closeDrawer}
        accessibilityRole="button"
        accessibilityLabel="Cerrar menú"
      >
        <View style={styles.drawerIconWrap}>
          <Ionicons name="close-outline" size={20} color="#111827" />
        </View>
        <View style={styles.drawerButtonBody}>
          <Text style={styles.drawerButtonTitle}>Cerrar</Text>
          <Text style={styles.drawerButtonSubtitle}>Volver a la vista actual</Text>
        </View>
      </Pressable>
    </View>
  );
}

function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: APP_BG },
        headerTintColor: '#111827',
        headerTitleStyle: { fontWeight: '800' },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#d6dbe1',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor: '#6b7280',
        tabBarIcon: ({ color, size }) => {
          const iconName: keyof typeof Ionicons.glyphMap =
            route.name === 'Home' ? 'layers-outline' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ color }) => {
          const label = route.name === 'Home' ? 'Inventario' : 'Perfil';
          return <Text style={{ color, fontWeight: '700', fontSize: 12 }}>{label}</Text>;
        },
      })}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Inventario' }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Perfil' }}
      />
    </Tabs.Navigator>
  );
}

function HomeScreen({ navigation }: any) {
  const drawerRef = useRef<DrawerLayout>(null);
  const insets = useSafeAreaInsets();
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [headline, setHeadline] = useState('Panel de inventario');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredItems = useMemo(
    () =>
      inventorySeed.filter((item) => {
        if (selectedCategory === 'Todas') {
          return true;
        }
        return item.category === selectedCategory;
      }),
    [selectedCategory]
  );

  const totalProducts = filteredItems.length;
  const totalStock = filteredItems.reduce((sum, item) => sum + item.stock, 0);

  const openDetail = () => {
    navigation.getParent?.()?.navigate('Detail', {
      productName: filteredItems[0]?.name ?? 'Inventario',
    });
  };

  const openCalculator = () => {
    navigation.getParent?.()?.navigate('Calculator');
  };

  return (
    <DrawerLayout
      ref={drawerRef}
      drawerWidth={292}
      renderNavigationView={() => (
        <DrawerMenu
          drawerRef={drawerRef}
          onGoToCalculator={openCalculator}
          onOpenModal={() => setNoticeVisible(true)}
        />
      )}
    >
      <View style={[styles.screen, { paddingBottom: insets.bottom + 16 }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <View style={styles.titleSection}>
              <Text style={styles.brand}>Inventario móvil</Text>
              <Text style={styles.subtitle}>{headline}</Text>
            </View>

            <Pressable
              style={({ pressed }) => [styles.menuButton, pressed && styles.menuButtonPressed]}
              onPress={() => drawerRef.current?.openDrawer()}
              accessibilityRole="button"
              accessibilityLabel="Abrir menú"
            >
              <Ionicons name="menu-outline" size={24} color="#111827" />
            </Pressable>
          </View>

          <SectionCard
            title="Acciones rápidas"
            subtitle="Botones limpios y funcionales."
          >
            <View style={styles.buttonGrid}>
              <Pressable
                style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}
                onPress={() => setNoticeVisible(true)}
              >
                <Ionicons name="alert-circle-outline" size={18} color="#ffffff" />
                <Text style={styles.primaryButtonText}>Abrir modal</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}
                onPress={() =>
                  setHeadline((current) =>
                    current === 'Panel de inventario'
                      ? 'Inventario listo para revisar'
                      : 'Panel de inventario'
                  )
                }
              >
                <Ionicons name="refresh-outline" size={18} color="#111827" />
                <Text style={styles.secondaryButtonText}>Cambiar texto</Text>
              </Pressable>

              <Pressable
                style={({ pressed }) => [styles.ghostButton, pressed && styles.buttonPressed]}
                onPress={openDetail}
              >
                <Ionicons name="open-outline" size={18} color="#111827" />
                <Text style={styles.ghostButtonText}>Ir a detalle</Text>
              </Pressable>
            </View>
          </SectionCard>

          <SectionCard
            title="Filtro"
            subtitle="Selector con modal propio."
          >
            <InventoryDropdown
              label="Categoría de inventario"
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />
          </SectionCard>

          <SectionCard
            title="Resumen"
            subtitle="Datos filtrados en tiempo real."
          >
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{totalProducts}</Text>
                <Text style={styles.statLabel}>Productos</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>{totalStock}</Text>
                <Text style={styles.statLabel}>Unidades</Text>
              </View>
            </View>
          </SectionCard>

          <SectionCard
            title="Lista dinámica"
            subtitle="Carga progresiva de elementos."
          >
            <InventoryScrollLoading items={filteredItems} />
          </SectionCard>
        </ScrollView>

        <InfoModal
          visible={noticeVisible}
          onClose={() => setNoticeVisible(false)}
        />
      </View>
    </DrawerLayout>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.centerScreen}>
      <Ionicons name="person-circle-outline" size={84} color="#111827" style={{ marginBottom: 18 }} />
      <Text style={styles.pageTitle}>Perfil</Text>

      <View style={styles.profileCard}>
        <Text style={styles.profileLabel}>Usuario</Text>
        <Text style={styles.profileValue}>Aprendiz Técnico</Text>

        <Text style={[styles.profileLabel, styles.sectionSpacing]}>Email</Text>
        <Text style={styles.profileValue}>usuario@ejemplo.com</Text>

        <Text style={[styles.profileLabel, styles.sectionSpacing]}>Rol</Text>
        <Text style={styles.profileValue}>Administrador de Inventario</Text>
      </View>
    </View>
  );
}

function DetailScreen({ route }: any) {
  const productName = route.params?.productName ?? 'Producto';

  return (
    <View style={styles.centerScreen}>
      <Ionicons name="cube-outline" size={84} color="#111827" style={{ marginBottom: 18 }} />
      <Text style={styles.pageTitle}>Detalles</Text>

      <View style={styles.detailCard}>
        <Text style={styles.detailLabel}>Producto seleccionado</Text>
        <Text style={styles.detailValue}>{productName}</Text>

        <Text style={[styles.detailLabel, styles.sectionSpacing]}>Descripción</Text>
        <Text style={styles.pageText}>
          Esta pantalla se abre mediante el Stack Navigator y recibe parámetros desde otra vista.
        </Text>
      </View>
    </View>
  );
}

function CalculatorScreen() {
  return <ModernCalculator />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: APP_BG,
  },
  screen: {
    flex: 1,
    backgroundColor: APP_BG,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  titleSection: {
    flex: 1,
    paddingRight: 12,
  },
  brand: {
    color: '#111827',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.6,
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d6dbe1',
    marginLeft: 12,
    shadowColor: '#111827',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  menuButtonPressed: {
    transform: [{ scale: 0.96 }],
    opacity: 0.86,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    minWidth: '30%',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#111827',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
  },
  secondaryButton: {
    flex: 1,
    minWidth: '30%',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#f3f4f6',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d6dbe1',
  },
  secondaryButtonText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 13,
  },
  ghostButton: {
    flex: 1,
    minWidth: '30%',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#d6dbe1',
  },
  ghostButtonText: {
    color: '#374151',
    fontWeight: '700',
    fontSize: 13,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d6dbe1',
  },
  statValue: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  statLabel: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 12,
  },
  centerScreen: {
    flex: 1,
    backgroundColor: APP_BG,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  pageTitle: {
    color: '#111827',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 12,
  },
  pageText: {
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 14,
  },
  sectionSpacing: {
    marginTop: 16,
  },
  profileCard: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d6dbe1',
    marginVertical: 16,
  },
  profileLabel: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  profileValue: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 4,
  },
  detailCard: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d6dbe1',
  },
  detailLabel: {
    color: '#6b7280',
    fontWeight: '600',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  detailValue: {
    color: '#111827',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 6,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 20,
    paddingTop: 34,
  },
  drawerTitle: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },
  drawerText: {
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 22,
    fontSize: 14,
  },
  drawerButton: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#d6dbe1',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  drawerButtonPressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
  drawerIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerButtonBody: {
    flex: 1,
  },
  drawerButtonTitle: {
    color: '#111827',
    fontWeight: '800',
    fontSize: 14,
  },
  drawerButtonSubtitle: {
    color: '#6b7280',
    fontSize: 12,
    marginTop: 2,
  },
});

export default App;
