<template>
  <div class="grid grid-rows-6 h-full">
    <div class="search row-span-1 mt-8 p-4">
      <!-- Search bar -->
      <input v-model="searchQuery" type="text" class="w-full p-2 rounded-md" placeholder="Search players..." />
    </div>
    <div class="players overflow-auto row-span-5">
      <div v-for="(row, rowIndex) in chunkPlayers(filteredPlayers, 8)" :key="rowIndex" class="player-row">
        <div v-for="(player, index) in row" :key="player.id"
          class="player-card backdrop-blur text-white hover:p-4 hover:bg-gray-500" @click="showPlayerDetails(player)">
          <img :src="player.cardImage" :alt="player.name" />
          <p>{{ player.name }}</p>
        </div>
      </div>
    </div>

    <!-- Player Details Popup -->
    <div v-if="isPopupVisible" class="popup-overlay" @click="closePopup">
      <div class="popup-content grid grid-cols-2 backdrop-blur-3xl text-white" @click.stop>
        <div>
          <button class="close-btn" @click="closePopup">X</button>
          <h2>{{ selectedPlayer.name }}</h2>
          <img :src="selectedPlayer.cardImage" :alt="selectedPlayer.name" />
          <p>{{ selectedPlayer.team }}</p>
        </div>
        <div class="text-3xl">
          <p class="border-2 rounded-xl">Position: {{ selectedPlayer.position }}</p>
          <p class="mt-10 border-2 rounded-xl">Market Value: {{ selectedPlayer.marketValue }}</p>
          <p class="mt-12 border-2 rounded-xl">Goals: {{ selectedPlayer.goals }} <br> Assists: {{ selectedPlayer.assists }}</p>
          <!-- <p>FIFA Rating: {{ selectedPlayer.fifaRating }}</p> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';

// Define players
const players = ref([
  { id: 0, name: 'Haaland', team: 'Manchester City', marketValue: '€200M', goals: 5, assists: 2, fifaRating: 91, position: 'ST', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/239085.png?width=265' },
  { id: 1, name: 'De Bruyne', team: 'Manchester City', marketValue: '€120M', goals: 3, assists: 6, fifaRating: 89, position: 'CM', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/192985.png?width=265' },
  { id: 2, name: 'Kane', team: 'Bayern Munich', marketValue: '€110M', goals: 6, assists: 1, fifaRating: 88, position: 'ST', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/202126.png?width=265' },
  { id: 3, name: 'Kimmich', team: 'Bayern Munich', marketValue: '€85M', goals: 1, assists: 5, fifaRating: 87, position: 'CDM', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/212622.png?width=265' },
  { id: 4, name: 'Bellingham', team: 'Real Madrid', marketValue: '€100M', goals: 4, assists: 3, fifaRating: 88, position: 'CM', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/252371.png?width=265' },
  { id: 5, name: 'Vinícius Jr.', team: 'Real Madrid', marketValue: '€90M', goals: 3, assists: 2, fifaRating: 86, position: 'LW', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/238794.png?width=265' },
  { id: 6, name: 'Lewandowski', team: 'Barcelona', marketValue: '€60M', goals: 7, assists: 2, fifaRating: 89, position: 'ST', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/188545.png?width=265' },
  { id: 7, name: 'Pedri', team: 'Barcelona', marketValue: '€75M', goals: 2, assists: 4, fifaRating: 85, position: 'CM', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/251854.png?width=265' },
  { id: 8, name: 'Mbappé', team: 'PSG', marketValue: '€180M', goals: 5, assists: 4, fifaRating: 91, position: 'LW', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/231747.png?width=265' },
  { id: 9, name: 'Dembélé', team: 'PSG', marketValue: '€50M', goals: 2, assists: 3, fifaRating: 84, position: 'RW', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/231443.png?width=265' },
  { id: 10, name: 'Saka', team: 'Arsenal', marketValue: '€90M', goals: 4, assists: 5, fifaRating: 85, position: 'RW', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/246669.png?width=265' },
  { id: 11, name: 'Ødegaard', team: 'Arsenal', marketValue: '€85M', goals: 3, assists: 6, fifaRating: 87, position: 'CAM', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/222665.png?width=265' },
  { id: 12, name: 'Vlahovic', team: 'Juventus', marketValue: '€65M', goals: 6, assists: 1, fifaRating: 85, position: 'ST', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/246430.png?width=265' },
  { id: 13, name: 'Di María', team: 'Juventus', marketValue: '€15M', goals: 2, assists: 4, fifaRating: 85, position: 'RW', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/183898.png?width=265' },
  { id: 14, name: 'Salah', team: 'Liverpool', marketValue: '€90M', goals: 5, assists: 2, fifaRating: 89, position: 'RW', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/209331.png?width=265' },
  { id: 15, name: 'van Dijk', team: 'Liverpool', marketValue: '€60M', goals: 1, assists: 0, fifaRating: 88, position: 'CB', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/203376.png?width=265' },
  { id: 16, name: 'Sterling', team: 'Chelsea', marketValue: '€70M', goals: 3, assists: 2, fifaRating: 86, position: 'RW', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/202652.png?width=265' },
  { id: 17, name: 'Mudryk', team: 'Chelsea', marketValue: '€50M', goals: 2, assists: 3, fifaRating: 83, position: 'LW', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/246340.png?width=265' },
  { id: 18, name: 'Giroud', team: 'AC Milan', marketValue: '€15M', goals: 4, assists: 1, fifaRating: 82, position: 'ST', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/178509.png?width=265' },
  { id: 19, name: 'Leão', team: 'AC Milan', marketValue: '€75M', goals: 5, assists: 2, fifaRating: 86, position: 'LW', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/241721.png?width=265' },
  { id: 20, name: 'Griezmann', team: 'Atlético Madrid', marketValue: '€50M', goals: 3, assists: 4, fifaRating: 85, position: 'CAM', cardImage: 'https://ratings-images-prod.pulse.ea.com/FC25/full/player-shields/en/194765.png?width=265' },
  { id: 21, name: 'Félix', team: 'Atlético Madrid', marketValue: '€60M', goals: 2, assists: 3, fifaRating: 85, position: 'CF', cardImage: '' },
  { id: 22, name: 'Martínez', team: 'Inter Milan', marketValue: '€85M', goals: 6, assists: 2, fifaRating: 86, position: 'ST', cardImage: '' },
  { id: 23, name: 'Lukaku', team: 'Inter Milan', marketValue: '€50M', goals: 4, assists: 1, fifaRating: 85, position: 'ST', cardImage: '' },
  { id: 24, name: 'Nkunku', team: 'RB Leipzig', marketValue: '€50M', goals: 3, assists: 4, fifaRating: 84, position: 'CAM', cardImage: '' },
  { id: 25, name: 'Olmo', team: 'RB Leipzig', marketValue: '€40M', goals: 2, assists: 3, fifaRating: 82, position: 'CM', cardImage: '' },
  { id: 26, name: 'Bellingham', team: 'Borussia Dortmund', marketValue: '€60M', goals: 3, assists: 4, fifaRating: 84, position: 'CM', cardImage: '' },
  { id: 27, name: 'Reyna', team: 'Borussia Dortmund', marketValue: '€30M', goals: 2, assists: 1, fifaRating: 80, position: 'CAM', cardImage: '' },
  { id: 28, name: 'Taremi', team: 'Porto', marketValue: '€40M', goals: 5, assists: 3, fifaRating: 83, position: 'ST', cardImage: '' },
  { id: 29, name: 'Otávio', team: 'Porto', marketValue: '€30M', goals: 1, assists: 5, fifaRating: 81, position: 'LM', cardImage: '' },
  { id: 30, name: 'Okafor', team: 'Salzburg', marketValue: '€25M', goals: 2, assists: 1, fifaRating: 78, position: 'ST', cardImage: '' },
  { id: 31, name: 'Sesko', team: 'Salzburg', marketValue: '€30M', goals: 3, assists: 2, fifaRating: 79, position: 'ST', cardImage: '' },
  { id: 32, name: 'Abraham', team: 'Roma', marketValue: '€40M', goals: 2, assists: 1, fifaRating: 81, position: 'ST', cardImage: '' },
  { id: 33, name: 'Dybala', team: 'Roma', marketValue: '€45M', goals: 4, assists: 3, fifaRating: 85, position: 'CAM', cardImage: '' },
  { id: 34, name: 'Kudus', team: 'Ajax', marketValue: '€25M', goals: 3, assists: 1, fifaRating: 79, position: 'CAM', cardImage: '' },
  { id: 35, name: 'Bergwijn', team: 'Ajax', marketValue: '€35M', goals: 4, assists: 2, fifaRating: 81, position: 'LW', cardImage: '' },
  { id: 36, name: 'Zaha', team: 'Galatasaray', marketValue: '€40M', goals: 3, assists: 2, fifaRating: 82, position: 'LW', cardImage: '' },
  { id: 37, name: 'Icardi', team: 'Galatasaray', marketValue: '€25M', goals: 4, assists: 1, fifaRating: 83, position: 'ST', cardImage: '' },
  { id: 38, name: 'Torreira', team: 'Galatasaray', marketValue: '€15M', goals: 1, assists: 3, fifaRating: 79, position: 'CDM', cardImage: '' },
  { id: 39, name: 'Muslera', team: 'Galatasaray', marketValue: '€5M', goals: 0, assists: 0, fifaRating: 80, position: 'GK', cardImage: '' },
  { id: 40, name: 'Giménez', team: 'Feyenoord', marketValue: '€20M', goals: 2, assists: 1, fifaRating: 80, position: 'ST', cardImage: '' },
  { id: 41, name: 'Dilrosun', team: 'Feyenoord', marketValue: '€15M', goals: 1, assists: 3, fifaRating: 78, position: 'LW', cardImage: '' },
  { id: 42, name: 'Kökçü', team: 'Feyenoord', marketValue: '€25M', goals: 4, assists: 2, fifaRating: 81, position: 'CM', cardImage: '' },
  { id: 43, name: 'Tadić', team: 'Ajax', marketValue: '€20M', goals: 3, assists: 2, fifaRating: 81, position: 'LW', cardImage: '' },
  { id: 44, name: 'Dolberg', team: 'Copenhagen', marketValue: '€15M', goals: 1, assists: 2, fifaRating: 76, position: 'ST', cardImage: '' },
  { id: 45, name: 'Falk', team: 'Copenhagen', marketValue: '€12M', goals: 2, assists: 3, fifaRating: 77, position: 'LW', cardImage: '' },
  { id: 46, name: 'Abu Fani', team: 'Maccabi Haifa', marketValue: '€5M', goals: 0, assists: 0, fifaRating: 69, position: 'CDM', cardImage: '' },
  { id: 47, name: 'Pierrot', team: 'Maccabi Haifa', marketValue: '€8M', goals: 1, assists: 1, fifaRating: 70, position: 'ST', cardImage: '' },
  { id: 48, name: 'Volodko', team: 'BATE Borisov', marketValue: '€3M', goals: 0, assists: 0, fifaRating: 64, position: 'CDM', cardImage: '' },
  { id: 49, name: 'Signevich', team: 'BATE Borisov', marketValue: '€2M', goals: 1, assists: 0, fifaRating: 65, position: 'ST', cardImage: '' },
  { id: 50, name: 'Majer', team: 'Dinamo Zagreb', marketValue: '€5M', goals: 2, assists: 0, fifaRating: 71, position: 'CM', cardImage: '' },
  { id: 51, name: 'Petković', team: 'Dinamo Zagreb', marketValue: '€4M', goals: 1, assists: 1, fifaRating: 72, position: 'ST', cardImage: '' },
  { id: 52, name: 'Gvardiol', team: 'Dinamo Zagreb', marketValue: '€15M', goals: 0, assists: 0, fifaRating: 80, position: 'CB', cardImage: '' },
  { id: 53, name: 'Pavkov', team: 'Red Star Belgrade', marketValue: '€4M', goals: 1, assists: 0, fifaRating: 70, position: 'ST', cardImage: '' },
  { id: 54, name: 'Ivanić', team: 'Red Star Belgrade', marketValue: '€3M', goals: 2, assists: 1, fifaRating: 71, position: 'CM', cardImage: '' },
  { id: 55, name: 'Tsyhankov', team: 'Dinamo Kyiv', marketValue: '€8M', goals: 3, assists: 1, fifaRating: 75, position: 'RW', cardImage: '' },
  { id: 56, name: 'Kryvtsov', team: 'Shakhtar Donetsk', marketValue: '€6M', goals: 0, assists: 0, fifaRating: 72, position: 'CB', cardImage: '' },
  { id: 57, name: 'Zubkov', team: 'Shakhtar Donetsk', marketValue: '€5M', goals: 1, assists: 1, fifaRating: 73, position: 'CM', cardImage: '' },
  { id: 58, name: 'Dodo', team: 'Shakhtar Donetsk', marketValue: '€7M', goals: 2, assists: 0, fifaRating: 74, position: 'RB', cardImage: '' }
]);

// Reactive variable for the search query
const searchQuery = ref('');

// Computed property to filter players based on the search query
const filteredPlayers = computed(() => {
  if (!searchQuery.value) return players.value;
  return players.value.filter(player =>
    player.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Method to chunk the players array into smaller arrays
const chunkPlayers = (players, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < players.length; i += chunkSize) {
    chunks.push(players.slice(i, i + chunkSize));
  }
  return chunks;
};

// Reactive variables for the popup
const isPopupVisible = ref(false);
const selectedPlayer = ref(null);

// Function to show the player details popup
const showPlayerDetails = (player) => {
  selectedPlayer.value = player;
  isPopupVisible.value = true;
};

// Function to close the popup
const closePopup = () => {
  isPopupVisible.value = false;
  selectedPlayer.value = null;
};
</script>


<style>
@media (max-width: 800px) {
  .search {
    margin-top: -70px;
  }

  .players-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: none;
  }
}

.players {
  height: 570px;
}

.player-row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
}

.player-card {
  padding: 10px;
  margin: 2px;
  text-align: center;
  border-radius: 8px;
  height: 180px;
  width: 120px;
  cursor: pointer;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.popup-content img {
  width: 200px;
  height: auto;
  margin-bottom: 15px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
