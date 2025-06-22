const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect('mongodb://localhost:27017/tokoku')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));

// Model untuk TokoKu
const Item = mongoose.model('Item', {
    nama_barang: String,
    harga: Number,
    stok: Number,
    kategori: String
});

// Endpoint TokoKu

// Lihat daftar barang
app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tambah barang baru
app.post('/items', async (req, res) => {
    try {
        const { nama_barang, harga, stok, kategori } = req.body;
        if (!nama_barang || harga == null || stok == null || !kategori) {
            return res.status(400).json({ error: 'Semua field wajib diisi!' });
        }
        const newItem = new Item({ nama_barang, harga, stok, kategori });
        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Edit barang
app.put('/items/:id', async (req, res) => {
    try {
        const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ error: 'Barang tidak ditemukan' });
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Hapus barang
app.delete('/items/:id', async (req, res) => {
    try {
        const deleted = await Item.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Barang tidak ditemukan' });
        }
        res.json({ message: 'Barang berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});