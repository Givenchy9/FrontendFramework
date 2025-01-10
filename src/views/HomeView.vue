<template>
  <div class="template grid grid-rows-12 h-screen">
    <div class="header backdrop-blur border-2 border-white row-span-1 grid grid-cols-3 items-center rounded-2xl">
      <div><i class="fa-solid fa-futbol fa-xl pl-10"></i></div>
      <div class="text-center">
        {{ isLoggedIn ? `Welcome, ${loggedInUserName}` : "Please login" }}
      </div>
      <div class="text-end">
        <RouterLink
          v-if="!isLoggedIn"
          to="/login"
          class="focus:outline-none text-white bg-blue-300 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2 mx-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          Login
        </RouterLink>
        <button
          v-else
          @click="handleLogout"
          class="focus:outline-none text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
        >
          Logout
        </button>
      </div>
    </div>
    <div class="content grid grid-cols-10 row-span-10">
      <div class="sidebara col-span-2">
        <div
          class="sidebara2 backdrop-blur-xl scroll-smooth mt-32 h-80 overflow-auto"
          @click="showTextPopup"
        >
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
        </div>
      </div>
      <div class="content2 col-span-6 grid grid-rows-9">
        <div class="row-span-1">
          <div class="nav grid grid-cols-3 h-full">
            <div>
              <router-link
                to="/"
                active-class="bg-red-500"
                class="routerlink place-content-center py-2.5 px-5 m-2 flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
              >
                Home
              </router-link>
            </div>
            <div>
              <RouterLink
                to="/leagues"
                class="routerlink place-content-center py-2.5 px-5 m-2 flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
              >
                Leagues
              </RouterLink>
            </div>
            <div>
              <RouterLink
                to="/euro"
                class="routerlink place-content-center py-2.5 px-5 m-2 flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
              >
                Euro
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="main">2</div>
      </div>
      <div class="sidebarb col-span-2">
        <div
          v-for="(product, index) in products"
          :key="product.id"
          class="imgs border-2 my-4 rounded cursor-pointer"
          @click="showPopup(product)"
        >
          <img
            class="img object-cover w-full h-full"
            :src="product.image"
            :alt="product.name"
          />
        </div>
      </div>
    </div>
    <div class="footer backdrop-blur-3xl row-span-1">© 2024 Givenchy</div>

    <!-- Popup -->
    <div
      v-if="selectedProduct"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        class="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-2/3 md:w-1/3"
      >
        <h2 class="text-xl font-bold mb-4 text-center">
          {{ selectedProduct.name }}
        </h2>
        <img
          :src="selectedProduct.image"
          :alt="selectedProduct.name"
          class="w-full h-auto rounded mb-4"
        />
        <RouterLink to="/shop" class="block mx-auto bg-green-500 hover:bg-green-600 mb-2 text-center text-white font-semibold py-2 px-4 rounded-lg transition">Shop</RouterLink>
        <button
          @click="closePopup"
          class="block mx-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
    <div
      v-if="isTextPopupVisible"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-2/3 md:w-1/3">
        <h2 class="text-xl font-bold mb-4 text-center">Information</h2>
        <p class="mb-4 text-center overflow-auto h-80">
          What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

5
	paragraphs
	words
	bytes
	lists
	Start with 'Lorem
ipsum dolor sit amet...'

        </p>
        <button
          @click="closeTextPopup"
          class="block mx-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Reactive properties
const products = ref([
  {
    id: 0,
    name: "Messi",
    image:
      "https://assets.goal.com/images/v3/blt01fda1e33d639b71/FW22_WC_REACTIVE_KV_DIGITAL_16x9.jpg?auto=webp&format=pjpg&width=3840&quality=60",
  },
  {
    id: 1,
    name: "Ronaldo",
    image:
      "https://static.startuptalky.com/2021/06/Cristiano-Ronaldo-endorsed-brands-StartupTalky.jpg",
  },
  {
    id: 2,
    name: "Neymar",
    image:
      "https://www.puma-catchup.com/wp-content/uploads/2021/03/Neymar-header.jpg",
  },
  {
    id: 3,
    name: "Mbappe",
    image:
      "https://magento.sportshop.com/media/magefan_blog/mbappe-blog-sept23.jpg",
  },
  {
    id: 4,
    name: "Bellingham",
    image:
      "https://publish-p47754-e237306.adobeaemcloud.com/adobe/dynamicmedia/deliver/dm-aid--d856cece-37ea-4933-ab50-2164dfbbe2c6/nd_H24266_FW24_JUDE_BELLINGHAM_PREDATOR_2_PLAYER_05_16x9.app.webp?preferwebp=true",
  },
]);

const selectedProduct = ref(null);
const isLoggedIn = ref(false);
const router = useRouter();
const loggedInUserName = ref('');

// Check login state on page load
onMounted(() => {
  const token = localStorage.getItem('authToken');
  const userName = localStorage.getItem('authUserName');

  isLoggedIn.value = token !== null;
  loggedInUserName.value = userName || '';
});

// Handle popup display
function showPopup(product) {
  selectedProduct.value = product;
}

function closePopup() {
  selectedProduct.value = null;
}

// Handle logout
function handleLogout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUserName');
  isLoggedIn.value = false;
  loggedInUserName.value = '';
  router.push('/login'); // Redirect to login page
}

// Popup state
const isTextPopupVisible = ref(false);

// Functions to handle popup visibility
function showTextPopup() {
  isTextPopupVisible.value = true;
}

function closeTextPopup() {
  isTextPopupVisible.value = false;
}
</script>
<style>


.template {
  background-image: url('https://www.ziggosport.nl/images/competitions/symbols/uefa-champions-league.png');
  /* background-image: url('https://images.redbull.tv/image/upload/g_xy_center,x_1039,y_522,c_fill,w_1250,h_704,q_90,f_webp/v1715426097405/playnet/bfa73cd3-ff4f-4f45-ad97-05600603df34'); */
  background-repeat: no-repeat;
  /* background-size: cover; */
}

.homeimg {
  width: 700px;
}

.sidebara2::-webkit-scrollbar {
    display: none;
}

.sidebarb {
    height: 600px;
    overflow: auto;
  }

  .sidebarb::-webkit-scrollbar {
    display: none;
}

.imgs {
  height: 180px;
  width: 280px;
}

@media (max-width: 800px) {
  .template {
    grid-template-rows: repeat(10, minmax(0, 1fr));
  }

  .header {
    display: none;
  }

  .nav {
    display: block;
    width: 100%;
    padding-top: 8px;
  }

  .main {
    width: 100%;
  }

  .sidebara {
    display: none;
  }

  .sidebarb {
    display: flex;
    height: 8vh;
  }

  .imgs {
  height: 10px;
  width: 280px;
}

  .content {
    grid-template-columns: repeat(1, minmax(0, 1fr));
    background-image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.paramountplus.com%2Fshows%2Fuefa-champions-league%2Fnews%2F1010726%2Fuefa-champions-league-schedule%2F&psig=AOvVaw3ccocAUcTyXuV3tyxuKiS7&ust=1735146094534000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqGAoTCJDB9IfxwIoDFQAAAAAdAAAAABCDAQ";
  }

  .content2 {
    grid-template-rows: repeat(4, minmax(0, 1fr));
  }

  .routerlink {
    margin-top: 0;
    background-color: transparent;
    backdrop-filter: blur(64px);
  }

  .footer {
    display: none;
  }

  .img {
    width: 200px;
    height: 70px;
  }
}
</style>