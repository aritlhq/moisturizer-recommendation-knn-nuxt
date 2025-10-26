<template>
  <div class="bg-white rounded-2xl shadow-xl p-8">
    <div class="text-center mb-8">
      <h2 class="text-3xl font-bold text-pink-500 mb-2">
        ✨ Kenali Kulitmu, Temukan Moisturizer yang Tepat!
      </h2>
      <p class="text-content-light">
        Pelajari dasar skincare sebelum memilih produk yang cocok untukmu
      </p>
    </div>
    <div class="flex justify-center border-b border-gray-200 mb-6">
      <button
          v-for="tab in tabs"
          :key="tab.id"
          class="px-6 py-3 text-lg font-semibold border-b-2 transition-colors"
          :class="activeTab === tab.id ? 'border-pink-500 text-pink-500' : 'border-transparent text-content-light hover:text-content'"
          @click="activeTab = tab.id"
      >
        {{ tab.icon }} {{ tab.label }}
      </button>
    </div>

    <div>
      <div v-if="activeTab === 'skin'" class="space-y-3">
        <details v-for="skinType in skinTypes" :key="skinType.name" class="p-4 rounded-lg bg-cream-100 group">
          <summary class="font-semibold text-lg flex items-center gap-2 cursor-pointer list-none">
            <span class="text-2xl">{{ skinType.icon }}</span> {{ skinType.name }}
          </summary>
          <p class="text-content-light mt-2 pl-8">{{ skinType.description }}</p>
        </details>
      </div>

      <div v-if="activeTab === 'texture'" class="grid md:grid-cols-2 gap-4">
        <div v-for="texture in textures" :key="texture.name" class="p-6 bg-cream-100 rounded-lg">
          <h3 class="font-bold text-xl text-peach-500 mb-2">{{ texture.icon }} {{ texture.name }}</h3>
          <p class="text-content-light mb-3">{{ texture.description }}</p>
          <span class="inline-block px-3 py-1 text-sm rounded-full border border-pink-300 text-pink-500">{{ texture.recommendation }}</span>
        </div>
      </div>

      <div v-if="activeTab === 'ingredients'" class="grid md:grid-cols-2 gap-4">
        <div v-for="ingredient in ingredients" :key="ingredient.name" class="p-6 bg-cream-100 rounded-lg">
          <h3 class="font-bold text-xl text-peach-500 mb-2">{{ ingredient.icon }} {{ ingredient.name }}</h3>
          <p class="text-sm text-content-light mb-3">{{ ingredient.benefit }}</p>
          <span class="inline-block px-3 py-1 text-sm rounded-full border border-peach-300 text-peach-500">Cocok untuk: {{ ingredient.suitable }}</span>
        </div>
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