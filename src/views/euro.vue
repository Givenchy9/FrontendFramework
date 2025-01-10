<template>
  <Header />
  <div style="background-image: url('https://editorial.uefa.com/resources/026e-1368802e0b82-f62b8b6fe139-1000/official_uefa_euro_2024_logo_and_brand_launch.jpeg'); background-repeat: no-repeat; background-size: cover;">
  <div class="grid grid-rows-5 h-screen">
      <div class="row-span-1 mt-10 text-white text-5xl font-bold text-center p-6">Euro 2024</div>
      <div class="row-span-4 grid grid-cols-5 grid-rows-5">
        <div
          v-for="(team, index) in teams"
          :key="index"
          class="text-center text-white p-4 backdrop-blur-3xl rounded-md cursor-pointer hover:bg-gray-800"
          @click="openPopup(team)"
        >
          <div class="justify-center items-center">
            <!-- Team Logo -->
            <span>{{ team.name }}</span>
            <img
              :src="team.logo"
              alt="Team Logo"
              class="m-auto w-12"
            />
          </div>
        </div>
      </div>
    </div>
  
    <!-- Popup for displaying player images -->
    <div v-if="selectedTeam" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-2/3 md:w-1/3">
        <h2 class="text-xl h-40 font-bold mb-4 text-center">{{ selectedTeam.name }} Players</h2>
        <div class="grid grid-cols-3 gap-4">
          <!-- Display players as images -->
          <div v-for="(player, index) in selectedTeam.players" :key="index" class="flex justify-center">
            <img :src="player" alt="Player Image" class="w-80 h-58 py-2 object-cover -mt-32" />
          </div>
        </div>
        <button @click="closePopup" 
          class="block mx-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition">
          Close
        </button>
      </div>
    </div>
</div>
</template>

<script setup>
import Header from "@/components/header.vue";
import { ref } from "vue";

// List of Euro 2024 teams with logo URLs and players
const teams = ref([
  { 
    name: "Germany", 
    logo: "https://logos-world.net/wp-content/uploads/2024/06/Germany-National-Football-Team-Logo-2008.png",
    players: ["https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/212622.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/189596.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/205452.png?width=265"]
  },
  { 
    name: "Scotland", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Scotland_national_football_team_logo_2014.svg/1200px-Scotland_national_football_team_logo_2014.svg.png",
    players: ["https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/216267.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/210881.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/242280.png?width=265"]
  },
  { 
    name: "Hungary", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Hungarian_Football_Federation_logo.svg/1200px-Hungarian_Football_Federation_logo.svg.png",
    players: ["https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/204638.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/185122.png?width=250", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/236772.png?width=265"]
  },
  { 
    name: "Switzerland", 
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/SFV_Logo.svg",
    players: ["https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/235073.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/177683.png?width=250", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/199503.png?width=265"]
  },
  { 
    name: "Spain", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/39/Spain_national_football_team_crest.svg/1200px-Spain_national_football_team_crest.svg.png",
    players: ["https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/231866.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/277643.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/251854.png?width=265"]
  },
  { 
    name: "Croatia", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Croatian_Football_Federation_logo.svg/800px-Croatian_Football_Federation_logo.svg.png",
    players: ["https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/177003.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/207410.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/251517.png?width=265"]
  },
  { 
    name: "Italy", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_Italy_National_Football_Team_-_2023.svg/1200px-Logo_Italy_National_Football_Team_-_2023.svg.png",
    players: ["https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/230621.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/237383.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/224232.png?width=265"]
  },
  { 
    name: "Albania", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Stema_e_Fanell%C3%ABs_s%C3%AB_Komb%C3%ABtares.svg/1200px-Stema_e_Fanell%C3%ABs_s%C3%AB_Komb%C3%ABtares.svg.png",
    players: ["https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/208165.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/203581.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/230800.png?width=265"]
  },
  { 
    name: "Slovenia", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Slovenia_national_football_team.svg/1200px-Slovenia_national_football_team.svg.png",
    players: ["https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/200389.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/260592.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/195365.png?width=265"]
  },
  { 
    name: "Denmark", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Dansk_boldspil_union_logo.svg/1200px-Dansk_boldspil_union_logo.svg.png",
    players: ["https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/213661.png?width=250", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/224221.png?width=265", "https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/244669.png?width=265"]
  },
  { 
    name: "Serbia", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Fudbalski_savez_Srbije.svg/800px-Fudbalski_savez_Srbije.svg.png",
    players: ["Aleksandar Mitrović", "Dušan Tadić", "Sergej Milinković-Savić", "Nemanja Gudelj", "Marko Grujić"]
  },
  { 
    name: "England", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/England_national_football_team_crest.svg/1200px-England_national_football_team_crest.svg.png",
    players: ["Harry Kane", "Raheem Sterling", "Phil Foden", "Declan Rice", "Jordan Pickford"]
  },
  { 
    name: "Netherlands", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Netherlands_national_football_team_logo.svg/1200px-Netherlands_national_football_team_logo.svg.png",
    players: ["Virgil van Dijk", "Georginio Wijnaldum", "Memphis Depay", "Frenkie de Jong", "Donny van de Beek"]
  },
  { 
    name: "France", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/French_Football_Federation_logo.svg/1200px-French_Football_Federation_logo.svg.png",
    players: ["Kylian Mbappé", "Antoine Griezmann", "Paul Pogba", "N'Golo Kanté", "Hugo Lloris"]
  },
  { 
    name: "Poland", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Herb_Polski.svg",
    players: ["Robert Lewandowski", "Piotr Zieliński", "Wojciech Szczęsny", "Kamil Glik", "Grzegorz Krychowiak"]
  },
  { 
    name: "Austria", 
    logo: "https://upload.wikimedia.org/wikipedia/en/f/fc/Football_Australia_logo.svg",
    players: ["David Alaba", "Marko Arnautović", "Julian Baumgartlinger", "Xaver Schlager", "Andreas Ulmer"]
  },
  { 
    name: "Belgium", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f9/Royal_Belgian_FA_logo_2019.svg/1200px-Royal_Belgian_FA_logo_2019.svg.png",
    players: ["Kevin De Bruyne", "Eden Hazard", "Romelu Lukaku", "Thibaut Courtois", "Dries Mertens"]
  },
  { 
    name: "Slovakia", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Slovak_Football_Association_logo.svg/1200px-Slovak_Football_Association_logo.svg.png",
    players: ["Marek Hamšík", "Štefan Senecký", "Juraj Kucka", "Martin Dúbravka", "Róbert Mak"]
  },
  { 
    name: "Romania", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Romania_national_football_team_logo.svg/1200px-Romania_national_football_team_logo.svg.png",
    players: ["Florin Andone", "Alexandru Maxim", "Denis Alibec", "Victor Pițurcă", "Mihai Pintilii"]
  },
  { 
    name: "Ukraine", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Logo_F%C3%A9d%C3%A9ration_Ukraine_Football_2016.svg",
    players: ["Andriy Yarmolenko", "Roman Zozulya", "Oleksandr Zinchenko", "Taras Stepanenko", "Serhiy Sydorchuk"]
  },
  { 
    name: "Portugal", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Portuguese_Football_Federation.svg/1200px-Portuguese_Football_Federation.svg.png",
    players: ["Cristiano Ronaldo", "Bruno Fernandes", "João Félix", "Rúben Dias", "Pepe"]
  },
  { 
    name: "Czech Republic", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Czech_Republic_national_football_team_logo.svg/1200px-Czech_Republic_national_football_team_logo.svg.png",
    players: ["Patrik Schick", "Tomáš Souček", "Vladimír Coufal", "Jiří Pavlenka", "Alex Král"]
  },
  { 
    name: "Georgia", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Georgia_national_football_team_crest.svg/1200px-Georgia_national_football_team_crest.svg.png",
    players: ["Vako Kazaishvili", "Jano Ananidze", "Guram Kashia", "Beka Mikeltadze", "Saba Lobjanidze"]
  },
  { 
    name: "Turkey", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Turkish_Football_Federation_crest.svg/1200px-Turkish_Football_Federation_crest.svg.png",
    players: ["Hakan Çalhanoğlu", "Cengiz Ünder", "Burak Yılmaz", "Yusuf Yazıcı", "Merih Demiral"]
  },
  { 
    name: "Winners", 
    logo: "",
    players: ["Hakan Çalhanoğlu", "Cengiz Ünder", "Burak Yılmaz", "Yusuf Yazıcı", "Merih Demiral"]
  }
]);

const selectedTeam = ref(null);

// Open the popup with the players of the selected team
const openPopup = (team) => {
  selectedTeam.value = team;
};

// Close the popup
const closePopup = () => {
  selectedTeam.value = null;
};
</script>

<style scoped>
/* Popup background */
.fixed {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
}

.bg-white {
  background-color: white;
}

.w-11\12 {
  width: 90%;
}

.sm\:w-2\/3 {
  width: 66.67%;
}

.md\:w-1\/3 {
  width: 33.33%;
}
</style>
