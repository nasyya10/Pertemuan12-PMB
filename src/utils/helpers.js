export const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value).replace(/\D00(?=\D*$)/, '');
};

export const validateItemForm = (data) => {
  return data.nama_barang && data.harga && data.stok && data.kategori;
};