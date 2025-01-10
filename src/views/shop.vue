<template>
  <Header />
  <div class="relative max-w-3xl mx-auto mt-20">
    <!-- Image Display -->
    <div class="flex justify-center items-center overflow-hidden">
      <img :src="images[currentIndex]" alt="Slideshow Image" class="w-full h-auto transition-all duration-500 ease-in-out transform" />
    </div>

    <!-- Navigation Buttons -->
    <div class="absolute top-1/2 left-0 right-0 flex justify-between px-4 transform -translate-y-1/2">
      <button
        @click="prevImage"
        class="bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg hover:bg-opacity-70 transition duration-300"
      >
        &lt;
      </button>
      <button
        @click="nextImage"
        class="bg-black bg-opacity-50 text-white p-3 rounded-full shadow-lg hover:bg-opacity-70 transition duration-300"
      >
        &gt;
      </button>
    </div>

    <div class="flex">
        <RouterLink to="/" class="block mx-auto bg-green-500 hover:bg-green-600 w-40 mb-2 text-center text-white font-semibold py-2 px-4 rounded-lg transition">Clothes</RouterLink>
        <RouterLink to="/" class="block mx-auto bg-green-500 hover:bg-green-600 w-40 mb-2 text-center text-white font-semibold py-2 px-4 rounded-lg transition">Players</RouterLink>
        <RouterLink to="/" class="block mx-auto bg-green-500 hover:bg-green-600 w-40 mb-2 text-center text-white font-semibold py-2 px-4 rounded-lg transition">Assesoires</RouterLink>
        <RouterLink to="/" class="block mx-auto bg-green-500 hover:bg-green-600 w-40 mb-2 text-center text-white font-semibold py-2 px-4 rounded-lg transition">Games</RouterLink>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import { ref } from 'vue';

// List of images for the slideshow
const images = ref([
  'https://storage.googleapis.com/pr-newsroom-wp/1/2024/10/Header-Homepage-Carousel-1-1439x733.jpg',
  'https://livesport-ott-images.ssl.cdn.cra.cz/r900xfq60/626dc998-db08-4489-b636-72d934b48eac.jpeg',
  'https://www.mancity.com/meta/media/5symlbwg/24aw_pr_ts_football_man-city_home_matchwear_kv_horizontal_16x9_1920x1080px.jpg',
  'https://www.voetbalshirts.com/media/qj2e0mwa/paris-saint-germain-thuisshirt-2024-2025.jpg?width=750&height=450&format=webp&quality=65&rnd=133598294314000000'
]);

// Index for the current image
const currentIndex = ref(0);

// Move to the previous image
const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

// Move to the next image
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};
</script>

<style scoped>
/* Ensure the slideshow container has enough height */
.relative {
  height: 400px; /* Set a height for the slideshow */
}

img {
  object-fit: cover; /* Ensure the images cover the full container */
}
</style>
