# Arquitectura Moderna de la Calculadora

## 📋 Descripción General

Se ha completado una **refactorización integral** de la calculadora con una arquitectura moderna, modular y escalable. El nuevo diseño mejora significativamente la experiencia visual y la mantenibilidad del código.

---

## 🏗️ Estructura de Carpetas

```
src/
├── context/
│   └── CalculatorContext.tsx          ← Estado global
├── components/
│   ├── InventoryCalculator.tsx        ← Wrapper (compatible con código anterior)
│   └── Calculator/
│       ├── ModernCalculator.tsx       ← Componente principal
│       ├── CalculatorDisplay.tsx      ← Display con animación
│       ├── CalculatorButton.tsx       ← Botón reutilizable (5 variantes)
│       ├── CalculatorKeypad.tsx       ← Teclado organizador
│       └── CalculatorHistory.tsx      ← Modal de historial
```

---

## 🔄 Arquitectura de Estado

### CalculatorContext.tsx
Gestiona el estado global de la calculadora usando **React Context + Custom Hook**:

```tsx
// Acceso a la calculadora desde cualquier componente
const calculator = useCalculator();

// Propiedades disponibles
calculator.display           // Valor actual mostrado
calculator.previousValue     // Valor anterior
calculator.operation         // Operación pendiente
calculator.history           // Historial de cálculos

// Métodos disponibles
calculator.handleNumberPress(num)    // Agregar número
calculator.handleOperation(op)       // Seleccionar operación
calculator.handleEquals()            // Calcular resultado
calculator.handleClear()             // Limpiar todo
calculator.handleDelete()            // Eliminar último dígito
calculator.handlePercent()           // Calcular porcentaje
calculator.handleToggleSign()        // Cambiar signo +/-
calculator.clearHistory()            // Limpiar historial
```

---

## 🎨 Componentes

### 1. **ModernCalculator.tsx**
Componente principal que unifica toda la aplicación.

**Características:**
- SafeAreaView para compatibilidad con notches
- Header con botón de historial
- Display mejorado
- Teclado completo
- Modal de historial

**Colores:**
- Fondo: `#0d1621` (gris oscuro)
- Display: `#1a2f4d` (azul oscuro)
- Texto: `#ffffff` (blanco)

---

### 2. **CalculatorDisplay.tsx**
Muestra el valor actual con animación de escala.

**Props:**
```tsx
interface CalculatorDisplayProps {
  value: string;              // Valor a mostrar
  operation?: string | null;  // Operación pendiente
  previousValue?: string | null; // Valor anterior
}
```

**Características:**
- Animación smooth al cambiar valor
- Muestra operación pendiente
- Tipografía grande (56px)
- Muestra operador en gris pequeño

---

### 3. **CalculatorButton.tsx**
Botón reutilizable con 5 variantes de color.

**Variantes:**
- `number` - Números (gris)
- `operator` - Operadores (azul)
- `action` - Acciones (naranja)
- `equals` - Botón igual (verde)
- `function` - Funciones especiales (púrpura)

**Props:**
```tsx
interface CalculatorButtonProps {
  label: string;
  variant: 'number' | 'operator' | 'action' | 'equals' | 'function';
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: 'small' | 'large';  // large ocupa 2 espacios
}
```

**Características:**
- Animación de escala al presionar
- Ripple effect en Android
- Accesibilidad integrada

---

### 4. **CalculatorKeypad.tsx**
Organiza todos los botones en un layout profesional.

**Layout:**
```
[AC]  [⌫]  [%]   [÷]
[7]   [8]  [9]   [×]
[4]   [5]  [6]   [−]
[1]   [2]  [3]   [+]
[0 - - - -] [.]  [+/−] [=]
[^]   [√]  [-- --]
```

**Características:**
- 6 filas de botones
- Espaciado consistente
- Responsive

---

### 5. **CalculatorHistory.tsx**
Modal bottom-sheet con historial de cálculos.

**Características:**
- Muestra últimos 10 cálculos
- Scroll si hay muchos
- Botón para borrar historial
- Empty state cuando no hay historial
- Animación de aparición

---

## 📊 Operaciones Matemáticas Soportadas

| Símbolo | Operación | Tecla |
|---------|-----------|-------|
| `+` | Suma | [+] |
| `−` | Resta | [−] |
| `×` | Multiplicación | [×] |
| `÷` | División | [÷] |
| `%` | Porcentaje | [%] |
| `^` | Potencia | [^] |
| `√` | Raíz cuadrada | [√] |
| `+/−` | Toggle de signo | [+/−] |
| `AC` | Limpiar todo | [AC] |
| `⌫` | Eliminar dígito | [⌫] |

---

## 🎯 Mejoras Implementadas

### 1. **Arquitectura**
✅ Contexto global para estado  
✅ Componentes pequeños y reutilizables  
✅ Separación clara de responsabilidades  
✅ Fácil de mantener y extender  

### 2. **Diseño Visual**
✅ Paleta moderna (azul, naranja, verde, púrpura)  
✅ Animaciones suaves y responsivas  
✅ Tipografía mejorada  
✅ Espaciado consistente  
✅ Mejor contraste de colores  

### 3. **Funcionalidad**
✅ Historial de cálculos  
✅ Más operaciones matemáticas  
✅ Validación robusta  
✅ Formateo inteligente de números  
✅ Manejo de decimales  

### 4. **Experiencia de Usuario**
✅ Feedback visual en botones  
✅ Animaciones suaves  
✅ Display grande y legible  
✅ Accesibilidad integrada  
✅ Historial accesible  

---

## 💡 Casos de Uso

### Suma Simple
```
1. Presiona: [5]
2. Presiona: [+]
3. Presiona: [3]
4. Presiona: [=]
   Resultado: 8
```

### Operación en Cadena
```
1. Presiona: [10]
2. Presiona: [+]
3. Presiona: [5]      (aún sin calcular)
4. Presiona: [×]      (calcula 10+5=15, luego multiplica)
5. Presiona: [2]
6. Presiona: [=]      (calcula 15×2=30)
   Resultado: 30
```

### Acceder al Historial
```
1. Presiona: [⏱️] (botón de historial en header)
2. Se abre modal con últimos 10 cálculos
3. Presiona: [🗑️] para borrar historial
4. Presiona: [X] para cerrar
```

---

## 🔧 Extensibilidad

### Agregar Nueva Operación

1. **En `CalculatorContext.tsx`**, actualiza `performOperation()`:
```tsx
case '√':
  return Math.sqrt(prev);  // Operación unaria
```

2. **En `CalculatorKeypad.tsx`**, agrega botón:
```tsx
<CalculatorButton
  label="√"
  variant="function"
  onPress={() => handleOperation('√')}
/>
```

### Cambiar Colores

En los componentes, reemplaza los valores hex:
```tsx
backgroundColor: '#2e76ff'  // Cambiar a nuevo color
```

### Agregar Funcionalidad

1. Agrega acción al contexto
2. Crea botón que invoque la acción
3. Implemen la lógica en `performOperation()`

---

## 📱 Compatibilidad

- ✅ iOS (React Native + Expo)
- ✅ Android (React Native + Expo)
- ✅ Web (React Native Web)
- ✅ Diferentes tamaños de pantalla
- ✅ Notches y safe areas

---

## 🚀 Cómo Usar

### Importar la Calculadora
```tsx
import { InventoryCalculator } from '@/src/components/InventoryCalculator';

// Usar en tu aplicación
<InventoryCalculator />
```

### Acceder al Contexto
```tsx
import { useCalculator } from '@/src/context/CalculatorContext';

function MiComponente() {
  const { display, handleNumberPress } = useCalculator();
  return <Text>{display}</Text>;
}
```

---

## 📝 Notas Importantes

1. **InventoryCalculator.tsx** es un wrapper que mantiene compatibilidad con código anterior
2. Todo el estado está centralizado en `CalculatorContext`
3. Los componentes son sin estado (stateless) y reutilizables
4. Las animaciones usan `Animated` API nativa
5. El historial se limita a los últimos 10 cálculos
6. Los decimales se muestran hasta 10 dígitos

---

## 📦 Archivos Creados

```
✅ src/context/CalculatorContext.tsx
✅ src/components/Calculator/ModernCalculator.tsx
✅ src/components/Calculator/CalculatorDisplay.tsx
✅ src/components/Calculator/CalculatorButton.tsx
✅ src/components/Calculator/CalculatorKeypad.tsx
✅ src/components/Calculator/CalculatorHistory.tsx
✅ src/components/InventoryCalculator.tsx (actualizado)
✅ CALCULATOR_ARCHITECTURE.md (este archivo)
```

---

## 🎓 Aprendizajes

Este refactor demuestra:
- Context API para estado global
- Composición de componentes
- Custom Hooks
- Animated API
- Validación de números
- Responsive design
- Accesibilidad
- Buenas prácticas de React

