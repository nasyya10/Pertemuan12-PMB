import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, ActivityIndicator, FAB } from 'react-native-paper';
import api from '../services/api';

export default function ItemListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
      Alert.alert('Error', 'Failed to load items');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = async (itemId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/items/${itemId}`);
              fetchItems();
              Alert.alert('Success', 'Item deleted successfully');
            } catch (error) {
              console.error('Delete failed:', error);
              Alert.alert('Error', 'Failed to delete item');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchItems();
    const unsubscribe = navigation.addListener('focus', fetchItems);
    return unsubscribe;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchItems}
          />
        }
      >
        {items.map((item) => (
          <Card key={item._id} style={styles.card}>
            <Card.Content>
              <Title style={styles.title}>{item.nama_barang}</Title>
              <Paragraph>Price: Rp {item.harga.toLocaleString('id-ID')}</Paragraph>
              <Paragraph>Stock: {item.stok} | Category: {item.kategori}</Paragraph>
              
              <View style={styles.actions}>
                <Button 
                  mode="outlined" 
                  onPress={() => navigation.navigate('EditItem', { item })}
                  style={styles.button}
                >
                  Edit
                </Button>
                
                <Button 
                  mode="outlined" 
                  onPress={() => handleDelete(item._id)}
                  style={[styles.button, styles.deleteButton]}
                  labelStyle={styles.deleteLabel}
                >
                  Delete
                </Button>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('AddItem')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  button: {
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#FFA500',
    backgroundColor: '#FFA500',
  },
  deleteButton: {
    borderColor: '#ff5252',
    backgroundColor: '#ff5252',
  },
  deleteLabel: {
    color: '#FFFFFF',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});