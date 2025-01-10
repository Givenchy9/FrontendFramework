<template>
  <Header />
  <div class="grid grid-rows-10 h-screen">
    <div class="main row-span-10 grid grid-cols-3 items-center">
      <RouterLink to="/europa">
        <img
          class="knop2 knoppen hover:bg-black text-white font-bold text-center duration-700 hover:opacity-60 hover:border-t-8 hover:p-4 hover:border-red-500"
          src="https://static.cdnlogo.com/logos/u/35/uefa-europa-league.png" />
      </RouterLink>
      <RouterLink to="/champions">
        <img
          class="knop1 knoppen py-10 bg-black hover:bg-black text-white font-bold text-center duration-700 hover:opacity-60 hover:border-t-8 hover:p-4 hover:border-blue-700"
          src="https://i.pinimg.com/736x/59/54/29/5954296a5007cc5a0858de17ad8efbce.jpg" />
      </RouterLink>
      <RouterLink to="/champions">
        <img
          class="knop3 knoppen hover:bg-black text-white font-bold text-center duration-700 hover:opacity-60 hover:border-t-8 hover:p-4 hover:border-green-500"
          src="https://www.logo-designer.co/storage/2020/12/2020-new-uefa-europa-conference-league-logo-design-2.png" />
      </RouterLink>
    </div>
    <RouterLink to="/" class="xbutton hidden absolute"><i
        class="fa-solid fa-circle-xmark fa-2xl text-red-500 mt-4 "></i>
    </RouterLink>
  </div>
  <Footer />
</template>

<script setup>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
</script>
<style>
.knoppen {
  height: 600px;
}

@media (max-width: 800px) {
  .main {
    grid-template-rows: repeat(3, minmax(0, 1fr));
    grid-template-columns: repeat(1, minmax(0, 1fr));
    display: block;
  }

  .knoppen {
    width: 300px;
    height: 280px;
    margin: auto;
  }

  .xbutton {
    display: block;
  }
}
</style>
