<template>
  <div class="card bg-gradient-to-br from-pink-50 to-purple-50 shadow-xl">
    <div class="card-body">
      <div class="text-center mb-6">
        <h2 class="card-title text-3xl font-bold text-primary justify-center mb-2">
          ✨ Kenali Kulitmu, Temukan Moisturizer yang Tepat!
        </h2>
        <p class="text-base-content/70">
          Pelajari dasar skincare sebelum memilih produk yang cocok untukmu
        </p>
      </div>
      <div class="tabs tabs-boxed bg-white/50 mb-6">
        <a
            v-for="tab in tabs"
            :key="tab.id"
            class="tab"
            :class="{ 'tab-active': activeTab === tab.id }"
            @click="activeTab = tab.id"
        >
          {{ tab.icon }} {{ tab.label }}
        </a>
      </div>
      <div>
        <div v-if="activeTab === 'skin'" class="space-y-4">
          <div
              v-for="skinType in skinTypes"
              :key="skinType.name"
              class="collapse collapse-arrow bg-white shadow-md"
          >
            <input type="radio" :name="'skin-accordion'" />
            <div class="collapse-title text-lg font-semibold flex items-center gap-2">
              <span class="text-2xl">{{ skinType.icon }}</span>
              {{ skinType.name }}
            </div>
            <div class="collapse-content">
              <p class="text-base-content/80">{{ skinType.description }}</p>
            </div>
          </div>
        </div>
        <div v-if="activeTab === 'texture'" class="grid md:grid-cols-2 gap-4">
          <div
              v-for="texture in textures"
              :key="texture.name"
              class="card bg-white shadow-md hover:shadow-xl transition-all"
          >
            <div class="card-body">
              <h3 class="card-title text-secondary">
                {{ texture.icon }} {{ texture.name }}
              </h3>
              <p class="text-base-content/80">{{ texture.description }}</p>
              <div class="badge badge-outline badge-primary mt-2">
                {{ texture.recommendation }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="activeTab === 'ingredients'" class="grid md:grid-cols-2 gap-4">
          <div
              v-for="ingredient in ingredients"
              :key="ingredient.name"
              class="card bg-white shadow-md hover:shadow-xl transition-all"
          >
            <div class="card-body">
              <h3 class="card-title text-accent">
                {{ ingredient.icon }} {{ ingredient.name }}
              </h3>
              <p class="text-sm text-base-content/80 mb-2">{{ ingredient.benefit }}</p>
              <div class="badge badge-outline badge-secondary">
                Cocok untuk: {{ ingredient.suitable }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-actions justify-center mt-8">
        <button
            @click="$emit('ready')"
            class="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl"
        >
          <span>🚀</span>
          Mulai Cari Rekomendasi Sekarang!
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineEmits(['ready'])

const activeTab = ref('skin')

const tabs = [
  { id: 'skin', label: 'Tipe Kulit', icon: '🧴' },
  { id: 'texture', label: 'Tekstur', icon: '💧' },
  { id: 'ingredients', label: 'Kandungan', icon: '🌿' }
]

const skinTypes = [
  { name: 'Kulit Kering', icon: '🌵', description: 'Kulit kering biasanya terasa kencang, bersisik, atau mengelupas karena kekurangan minyak alami. Membutuhkan pelembap bertekstur cream yang kaya dan melembapkan.' },
  { name: 'Kulit Normal', icon: '✨', description: 'Kulit normal memiliki keseimbangan antara kelembapan dan minyak. Dapat menggunakan berbagai jenis pelembap, baik bertekstur gel maupun cream.' },
  { name: 'Kulit Berminyak', icon: '💦', description: 'Kulit berminyak menghasilkan sebum berlebih terutama di area T-zone. Membutuhkan pelembap bertekstur gel yang ringan dan cepat meresap.' }
]

const textures = [
  { name: 'Gel', icon: '💧', description: 'Moisturizer bertekstur gel memiliki formula ringan, cepat meresap, dan tidak meninggalkan rasa lengket.', recommendation: 'Ideal untuk kulit berminyak dan kombinasi' },
  { name: 'Cream', icon: '🧴', description: 'Moisturizer bertekstur cream lebih kental, memberikan kelembapan mendalam.', recommendation: 'Cocok untuk kulit kering hingga normal' }
]

const ingredients = [
  { name: 'Niacinamide', icon: '🌟', benefit: 'Mengontrol produksi minyak, mengecilkan pori, mengurangi kemerahan, dan memperbaiki tekstur kulit.', suitable: 'Kulit berminyak & berjerawat' },
  { name: 'Hyaluronic Acid', icon: '💎', benefit: 'Menarik dan mempertahankan kelembapan kulit, memberikan efek hidrasi mendalam tanpa membuat berat.', suitable: 'Kulit kering & dehidrasi' },
  { name: 'Salicylic Acid', icon: '🔬', benefit: 'Mengangkat sel kulit mati dan membersihkan pori-pori dari minyak berlebih.', suitable: 'Kulit berminyak & berjerawat' },
  { name: 'Vitamin C', icon: '🍊', benefit: 'Mencerahkan kulit, menyamarkan noda hitam, dan melindungi dari radikal bebas.', suitable: 'Kulit normal hingga kusam' },
  { name: 'Ceramide', icon: '🛡️', benefit: 'Memperkuat lapisan pelindung kulit, mencegah kehilangan kelembapan, dan mengurangi iritasi.', suitable: 'Kulit kering & sensitif' },
  { name: 'Centella Asiatica', icon: '🌿', benefit: 'Menenangkan kulit, memiliki sifat antiinflamasi, dan membantu memperbaiki skin barrier.', suitable: 'Kulit sensitif' }
]
</script>