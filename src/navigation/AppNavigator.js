import { createStackNavigator } from '@react-navigation/stack';
import ItemListScreen from '../screens/ItemListScreen';
import AddItemScreen from '../screens/AddItemScreen';
import EditItemScreen from '../screens/EditItemScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ItemList" component={ItemListScreen} options={{ title: 'Daftar Barang' }} />
      <Stack.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Tambah Barang' }} />
      <Stack.Screen name="EditItem" component={EditItemScreen} options={{ title: 'Edit Barang' }} />
    </Stack.Navigator>
  );
}