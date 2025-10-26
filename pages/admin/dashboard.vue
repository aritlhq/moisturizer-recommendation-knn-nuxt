<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
      <h1 class="text-3xl font-bold text-pink-500">📊 Admin Dashboard</h1>
      <button @click="openModal()" class="btn btn-primary">Tambah Produk</button>
    </div>

    <!-- Search Input -->
    <div class="mb-6">
      <input
          v-model="search"
          type="text"
          placeholder="Cari produk berdasarkan nama, brand, atau kandungan..."
          class="input w-full"
      />
    </div>

    <!-- Loading/Error State -->
    <div v-if="pending" class="text-center py-10">
      <div class="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="mt-4 text-content-light">Memuat data produk...</p>
    </div>
    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
      Gagal memuat data: {{ error.message }}
    </div>

    <!-- Products Table -->
    <div v-else class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-content">
          <thead class="text-xs text-content-light uppercase bg-cream-50">
          <tr>
            <th scope="col" class="px-6 py-3">Nama Produk</th>
            <th scope="col" class="px-6 py-3">Brand</th>
            <th scope="col" class="px-6 py-3">Tipe Kulit</th>
            <th scope="col" class="px-6 py-3 text-right">Aksi</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="product in products.products" :key="product.id" class="bg-white border-b hover:bg-cream-50">
            <td class="px-6 py-4 font-semibold">{{ product.name }}</td>
            <td class="px-6 py-4">{{ product.brand }}</td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700">{{ product.skin_type }}</span>
            </td>
            <td class="px-6 py-4 flex gap-2 justify-end">
              <button @click="openModal(product)" class="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white">Edit</button>
              <button @click="handleDelete(product)" class="btn btn-sm btn-error">Hapus</button>
            </td>
          </tr>
          <tr v-if="products.products.length === 0">
            <td colspan="4" class="text-center py-10 text-content-light">Tidak ada data produk yang ditemukan.</td>
          </tr>
          </tbody>
        </table>
      </div>
      <!-- Pagination -->
      <div v-if="products.pagination.totalPages > 1" class="flex justify-center p-4">
        <div class="flex items-center gap-2">
          <button @click="page--" :disabled="page === 1" class="btn btn-ghost disabled:text-gray-300">«</button>
          <span class="text-sm font-medium">Halaman {{ page }} dari {{ products.pagination.totalPages }}</span>
          <button @click="page++" :disabled="page >= products.pagination.totalPages" class="btn btn-ghost disabled:text-gray-300">»</button>
        </div>
      </div>
    </div>

    <!-- Modal Dialog -->
    <dialog id="product_modal" class="p-0 rounded-2xl shadow-2xl max-w-2xl w-full backdrop:bg-black/40">
      <div class="p-8">
        <h3 class="font-bold text-2xl text-pink-500">{{ editMode ? 'Edit Produk' : 'Tambah Produk Baru' }}</h3>
        <form @submit.prevent="handleSave" class="space-y-4 mt-6">
          <input v-model="formData.name" placeholder="Nama Produk" class="input" required />
          <input v-model="formData.brand" placeholder="Brand" class="input" required />
          <select v-model="formData.product_type" class="select" required>
            <option disabled value="">Pilih Tipe Produk</option>
            <option value="Moisturizer Gel">Moisturizer Gel</option>
            <option value="Moisturizer Cream">Moisturizer Cream</option>
          </select>
          <select v-model="formData.skin_type" class="select" required>
            <option disabled value="">Pilih Tipe Kulit</option>
            <option value="Kering">Kering</option>
            <option value="Normal">Normal</option>
            <option value="Berminyak">Berminyak</option>
          </select>
          <select v-model="formData.main_ingredient" class="select" required>
            <option disabled value="">Pilih Kandungan Utama</option>
            <option value="Niacinamide">Niacinamide</option>
            <option value="Hyaluronic Acid">Hyaluronic Acid</option>
            <option value="Salicylic Acid">Salicylic Acid</option>
            <option value="Vitamin C">Vitamin C</option>
            <option value="Ceramide">Ceramide</option>
            <option value="Centella Asiatica">Centella Asiatica</option>
          </select>
          <input v-model="formData.product_url" placeholder="URL Produk (Opsional)" class="input" />
          <input v-model="formData.image_url" placeholder="URL Gambar (Opsional)" class="input" />
          <div class="flex justify-end gap-4 pt-4">
            <button type="button" @click="closeModal" class="btn btn-ghost">Batal</button>
            <button type="submit" class="btn btn-primary">Simpan</button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const toast = useToast();
const page = ref(1);
const search = ref('');
const editMode = ref(false);
const formData = ref({
  name: '',
  brand: '',
  product_type: '',
  skin_type: '',
  main_ingredient: '',
  product_url: '',
  image_url: ''
});

const { data: products, pending, error, refresh } = await useApiFetch('/api/products', {
  query: { page, search },
  watch: [page, search],
  default: () => ({ products: [], pagination: { totalPages: 1 } })
});

const openModal = (product = null) => {
  editMode.value = !!product?.id;
  formData.value = product ? { ...product } : {
    name: '',
    brand: '',
    product_type: '',
    skin_type: '',
    main_ingredient: '',
    product_url: '',
    image_url: ''
  };
  product_modal.showModal();
};

const closeModal = () => {
  product_modal.close();
};

const handleSave = async () => {
  const method = editMode.value ? 'PUT' : 'POST';
  const url = editMode.value ? `/api/products/${formData.value.id}` : '/api/products';

  try {
    await $fetch(url, { method, body: formData.value });
    toast.success(`Produk berhasil ${editMode.value ? 'diupdate' : 'ditambahkan'}`);
    refresh();
    closeModal();
  } catch (err) {
    toast.error(err.data?.statusMessage || 'Gagal menyimpan produk');
  }
};

const handleDelete = async (product) => {
  if (!confirm(`Apakah Anda yakin ingin menghapus "${product.name}"?`)) return;

  try {
    await $fetch(`/api/products/${product.id}`, { method: 'DELETE' });
    toast.success('Produk berhasil dihapus');
    refresh();
  } catch (err) {
    toast.error(err.data?.statusMessage || 'Gagal menghapus produk');
  }
};
</script>