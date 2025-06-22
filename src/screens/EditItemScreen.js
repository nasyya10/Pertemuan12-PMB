import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { updateItem } from '../services/api';

export default function EditItemScreen({ route, navigation }) {
  const { item } = route.params;
  const [form, setForm] = useState({
    nama_barang: item.nama_barang,
    harga: String(item.harga),
    stok: String(item.stok),
    kategori: item.kategori
  });

  const handleSubmit = async () => {
    if (!form.nama_barang || !form.harga || !form.stok || !form.kategori) {
      Alert.alert('Error', 'Semua field wajib diisi!');
      return;
    }

    try {
      await updateItem(item._id, {
        nama_barang: form.nama_barang,
        harga: Number(form.harga),
        stok: Number(form.stok),
        kategori: form.kategori
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Gagal mengupdate barang');
    }
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <TextInput
        label="Nama Barang"
        value={form.nama_barang}
        onChangeText={(text) => setForm({...form, nama_barang: text})}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Harga"
        value={form.harga}
        onChangeText={(text) => setForm({...form, harga: text})}
        keyboardType="numeric"
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Stok"
        value={form.stok}
        onChangeText={(text) => setForm({...form, stok: text})}
        keyboardType="numeric"
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Kategori"
        value={form.kategori}
        onChangeText={(text) => setForm({...form, kategori: text})}
        style={{ marginBottom: 20 }}
      />
      <Button 
        mode="contained" 
        onPress={handleSubmit}
        style={{ marginTop: 10 }}
      >
        Update Barang
      </Button>
    </ScrollView>
  );
}