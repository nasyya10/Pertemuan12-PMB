// ItemCard.js
import React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

export default function ItemCard({ item, onEdit, onDelete }) {
  return (
    <Card style={{ margin: 10 }}>
      <Card.Content>
        <Title>{item.nama_barang}</Title>
        <Paragraph>Harga: Rp{item.harga.toLocaleString()}</Paragraph>
        <Paragraph>Stok: {item.stok}</Paragraph>
        <Button onPress={() => onEdit(item)}>Edit</Button>
        <Button onPress={() => onDelete(item._id)}>Delete</Button>
      </Card.Content>
    </Card>
  );
}