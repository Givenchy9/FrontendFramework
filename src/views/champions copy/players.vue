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
          <p class="mt-12 border-2 rounded-xl">Goals: {{ selectedPlayer.goals }} <br> Assists: {{ selectedPlayer.assists
            }}</p>
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
{ name: "Giovanni Di Lorenzo", team: "Napoli", market_value: "€35M", goals: 3, assists: 5, position: "Right-back" },
  { name: "Emiliano Martínez", team: "Aston Villa", market_value: "€25M", goals: 0, assists: 0, position: "Goalkeeper" },
  { name: "Sergio Canales", team: "Real Betis", market_value: "€35M", goals: 6, assists: 5, position: "Midfielder" },
  { name: "Timo Werner", team: "RB Leipzig", market_value: "€30M", goals: 12, assists: 4, position: "Striker" },
  { name: "Zeki Çelik", team: "Roma", market_value: "€10M", goals: 1, assists: 4, position: "Right-back" },
  { name: "Marten de Roon", team: "Atalanta", market_value: "€12M", goals: 3, assists: 5, position: "Midfielder" },
  { name: "Wissam Ben Yedder", team: "Monaco", market_value: "€35M", goals: 11, assists: 5, position: "Striker" },
  { name: "Ciro Immobile", team: "Lazio", market_value: "€25M", goals: 12, assists: 3, position: "Striker" },
  { name: "Federico Chiesa", team: "Juventus", market_value: "€40M", goals: 6, assists: 4, position: "Winger" },
  { name: "Antoine Griezmann", team: "Atlético Madrid", market_value: "€40M", goals: 9, assists: 6, position: "Forward" },
  { name: "Ivan Rakitić", team: "Sevilla FC", market_value: "€10M", goals: 4, assists: 5, position: "Midfielder" },
  { name: "Jesus Navas", team: "Sevilla FC", market_value: "€5M", goals: 0, assists: 4, position: "Right-back" },
  { name: "Rasmus Højlund", team: "Manchester United", market_value: "€55M", goals: 10, assists: 2, position: "Striker" },
  { name: "Alexandre Lacazette", team: "Olympique Lyon", market_value: "€12M", goals: 15, assists: 3, position: "Striker" },
  { name: "Moussa Diaby", team: "Aston Villa", market_value: "€55M", goals: 8, assists: 4, position: "Winger" },
  { name: "Nicolò Zaniolo", team: "Aston Villa", market_value: "€30M", goals: 3, assists: 1, position: "Winger" },
  { name: "Mason Mount", team: "Chelsea", market_value: "€65M", goals: 5, assists: 7, position: "Midfielder" },
  { name: "Marten de Roon", team: "Atalanta", market_value: "€12M", goals: 3, assists: 5, position: "Midfielder" },
  { name: "João Félix", team: "Atlético Madrid", market_value: "€60M", goals: 5, assists: 4, position: "Forward" },
  { name: "Philippe Coutinho", team: "Aston Villa", market_value: "€25M", goals: 2, assists: 3, position: "Attacking Midfielder" },
  { name: "César Azpilicueta", team: "Atletico Madrid", market_value: "€8M", goals: 0, assists: 1, position: "Right-back" },
  { name: "Gavi", team: "Barcelona", market_value: "€70M", goals: 3, assists: 6, position: "Midfielder" },
  { name: "Sergi Roberto", team: "Barcelona", market_value: "€15M", goals: 1, assists: 2, position: "Midfielder" },
  { name: "Pedri", team: "Barcelona", market_value: "€80M", goals: 5, assists: 7, position: "Midfielder" },
  { name: "Frenkie de Jong", team: "Barcelona", market_value: "€85M", goals: 6, assists: 4, position: "Midfielder" },
  { name: "Alexandre Lacazette", team: "Olympique Lyon", market_value: "€12M", goals: 15, assists: 3, position: "Striker" },
  { name: "Nabil Fekir", team: "Real Betis", market_value: "€35M", goals: 7, assists: 5, position: "Attacking Midfielder" },
  { name: "Ciro Immobile", team: "Lazio", market_value: "€25M", goals: 12, assists: 3, position: "Striker" },
  { name: "Federico Chiesa", team: "Juventus", market_value: "€40M", goals: 6, assists: 4, position: "Winger" },
  { name: "Hakim Ziyech", team: "Chelsea", market_value: "€25M", goals: 4, assists: 6, position: "Winger" },
  { name: "Zeki Çelik", team: "Roma", market_value: "€10M", goals: 1, assists: 4, position: "Right-back" },
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
