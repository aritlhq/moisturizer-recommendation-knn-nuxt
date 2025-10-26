<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-primary">📊 Admin Dashboard</h1>
      <button @click="openModal()" class="btn btn-primary">Tambah Produk</button>
    </div>

    <div class="form-control mb-6">
      <input
          v-model="search"
          type="text"
          placeholder="Cari produk..."
          class="input input-bordered w-full"
      />
    </div>

    <div v-if="pending" class="text-center"><span class="loading loading-lg"></span></div>
    <div v-else-if="error" class="alert alert-error">Gagal memuat data: {{ error.message }}</div>
    <div v-else class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
            <tr>
              <th>Nama Produk</th>
              <th>Brand</th>
              <th>Tipe Kulit</th>
              <th>Aksi</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="product in products.products" :key="product.id">
              <td class="font-semibold">{{ product.name }}</td>
              <td>{{ product.brand }}</td>
              <td><span class="badge badge-primary">{{ product.skin_type }}</span></td>
              <td class="flex gap-2">
                <button @click="openModal(product)" class="btn btn-sm btn-info">Edit</button>
                <button @click="handleDelete(product)" class="btn btn-sm btn-error">Hapus</button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="join flex justify-center mt-6">
          <button @click="page--" :disabled="page === 1" class="join-item btn">«</button>
          <button class="join-item btn">Page {{ page }}</button>
          <button @click="page++" :disabled="page >= products.pagination.totalPages" class="join-item btn">»</button>
        </div>
      </div>
    </div>

    <dialog id="product_modal" class="modal">
      <div class="modal-box max-w-2xl">
        <h3 class="font-bold text-lg">{{ editMode ? 'Edit Produk' : 'Tambah Produk Baru' }}</h3>
        <form @submit.prevent="handleSave" class="space-y-4 mt-4">
          <input v-model="formData.name" placeholder="Nama Produk" class="input input-bordered w-full" required />
          <input v-model="formData.brand" placeholder="Brand" class="input input-bordered w-full" required />
          <select v-model="formData.product_type" class="select select-bordered w-full" required>
            <option value="Moisturizer Gel">Moisturizer Gel</option>
            <option value="Moisturizer Cream">Moisturizer Cream</option>
          </select>
          <select v-model="formData.skin_type" class="select select-bordered w-full" required>
            <option value="Kering">Kering</option>
            <option value="Normal">Normal</option>
            <option value="Berminyak">Berminyak</option>
          </select>
          <select v-model="formData.main_ingredient" class="select select-bordered w-full" required>
            <option value="Niacinamide">Niacinamide</option>
            <option value="Hyaluronic Acid">Hyaluronic Acid</option>
            <option value="Salicylic Acid">Salicylic Acid</option>
            <option value="Vitamin C">Vitamin C</option>
            <option value="Ceramide">Ceramide</option>
            <option value="Centella Asiatica">Centella Asiatica</option>
          </select>
          <input v-model="formData.product_url" placeholder="URL Produk" class="input input-bordered w-full" />
          <input v-model="formData.image_url" placeholder="URL Gambar" class="input input-bordered w-full" />
          <div class="modal-action">
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
const formData = ref({});

const { data: products, pending, error, refresh } = await useApiFetch('/api/products', {
  query: { page, search },
  watch: [page, search]
});

const openModal = (product = {}) => {
  editMode.value = !!product.id;
  formData.value = { ...product };
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
    toast.error('Gagal menyimpan produk');
  }
};

const handleDelete = async (product) => {
  if (!confirm(`Yakin ingin menghapus "${product.name}"?`)) return;

  try {
    await $fetch(`/api/products/${product.id}`, { method: 'DELETE' });
    toast.success('Produk berhasil dihapus');
    refresh();
  } catch (err) {
    toast.error('Gagal menghapus produk');
  }
};
</script>