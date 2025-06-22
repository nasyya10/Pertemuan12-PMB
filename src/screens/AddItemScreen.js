import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { addItem } from '../services/api';

export default function AddItemScreen({ navigation }) {
  const [form, setForm] = useState({
    nama_barang: '',
    harga: '',
    stok: '',
    kategori: ''
  });

  const handleSubmit = async () => {
    if (!form.nama_barang || !form.harga || !form.stok || !form.kategori) {
      Alert.alert('Error', 'Semua field wajib diisi!');
      return;
    }

    try {
      await addItem({
        nama_barang: form.nama_barang,
        harga: Number(form.harga),
        stok: Number(form.stok),
        kategori: form.kategori
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Gagal menambahkan barang');
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
        Simpan Barang
      </Button>
    </ScrollView>
  );
}