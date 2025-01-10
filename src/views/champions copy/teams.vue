<template>
    <div class="grid grid-rows-6 h-full">
        <div class="search row-span-1 mt-8 p-4">
            <!-- Search bar -->
            <input v-model="searchQuery" type="text" class="w-full p-2 rounded-md" placeholder="Search players..." />
        </div>
        <div class="players overflow-auto row-span-5">
            <div v-for="(row, rowIndex) in chunkPlayers(filteredPlayers, 8)" :key="rowIndex" class="player-row">
                <div v-for="(player, index) in row" :key="player.id"
                    class="player-card backdrop-blur text-white hover:p-4 hover:bg-gray-500"
                    @click="showPlayerDetails(player)">
                    <img :src="player.cardImage" :alt="player.name" />
                    <p>{{ player.name }}</p>
                </div>
            </div>
        </div>

        <!-- Player Details Popup -->
        <div v-if="isPopupVisible" class="popup-overlay" @click="closePopup">
            <div class="popup-content" @click.stop>
                <button class="close-btn" @click="closePopup">X</button>
                <h2>{{ selectedPlayer.name }}</h2>
                <img :src="selectedPlayer.logo" :alt="selectedPlayer.name" />
                <p>Country: {{ selectedPlayer.country }}</p>
                <p>Group: {{ selectedPlayer.group }}</p>
                <p>Titles won: {{ selectedPlayer.championsLeagueTitles }}</p>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue';

// Define players
const players = ref([
{ id: 0, name: 'Arsenal', country: 'England', group: 'A', logo: '', championsLeagueTitles: 0 },
    { id: 1, name: 'Aston Villa', country: 'England', group: 'A', logo: '', championsLeagueTitles: 1 },
    { id: 2, name: 'Liverpool', country: 'England', group: 'B', logo: '', championsLeagueTitles: 6 },
    { id: 3, name: 'Manchester City', country: 'England', group: 'C', logo: '', championsLeagueTitles: 1 },
    { id: 4, name: 'Atlético de Madrid', country: 'Spain', group: 'D', logo: '', championsLeagueTitles: 0 },
    { id: 5, name: 'Barcelona', country: 'Spain', group: 'E', logo: '', championsLeagueTitles: 5 },
    { id: 6, name: 'Girona', country: 'Spain', group: 'F', logo: '', championsLeagueTitles: 0 },
    { id: 7, name: 'Real Madrid', country: 'Spain', group: 'G', logo: '', championsLeagueTitles: 14 },
    { id: 8, name: 'Bayern Munich', country: 'Germany', group: 'A', logo: '', championsLeagueTitles: 6 },
    { id: 9, name: 'Borussia Dortmund', country: 'Germany', group: 'B', logo: '', championsLeagueTitles: 1 },
    { id: 10, name: 'RB Leipzig', country: 'Germany', group: 'C', logo: '', championsLeagueTitles: 0 },
    { id: 11, name: 'Bayer Leverkusen', country: 'Germany', group: 'D', logo: '', championsLeagueTitles: 0 },
    { id: 12, name: 'VfB Stuttgart', country: 'Germany', group: 'E', logo: '', championsLeagueTitles: 0 },
    { id: 13, name: 'Atalanta', country: 'Italy', group: 'A', logo: '', championsLeagueTitles: 0 },
    { id: 14, name: 'Bologna', country: 'Italy', group: 'B', logo: '', championsLeagueTitles: 0 },
    { id: 15, name: 'Inter Milan', country: 'Italy', group: 'C', logo: '', championsLeagueTitles: 3 },
    { id: 16, name: 'Juventus', country: 'Italy', group: 'D', logo: '', championsLeagueTitles: 2 },
    { id: 17, name: 'AC Milan', country: 'Italy', group: 'E', logo: '', championsLeagueTitles: 7 },
    { id: 18, name: 'Brest', country: 'France', group: 'A', logo: '', championsLeagueTitles: 0 },
    { id: 19, name: 'Lille', country: 'France', group: 'B', logo: '', championsLeagueTitles: 0 },
    { id: 20, name: 'Monaco', country: 'France', group: 'C', logo: '', championsLeagueTitles: 0 },
    { id: 21, name: 'Paris Saint-Germain', country: 'France', group: 'D', logo: '', championsLeagueTitles: 0 },
    { id: 22, name: 'Red Bull Salzburg', country: 'Austria', group: 'A', logo: '', championsLeagueTitles: 0 },
    { id: 23, name: 'Sturm Graz', country: 'Austria', group: 'B', logo: '', championsLeagueTitles: 0 },
    { id: 24, name: 'Feyenoord', country: 'Netherlands', group: 'C', logo: '', championsLeagueTitles: 1 },
    { id: 25, name: 'PSV Eindhoven', country: 'Netherlands', group: 'D', logo: '', championsLeagueTitles: 1 },
    { id: 26, name: 'Benfica', country: 'Portugal', group: 'A', logo: '', championsLeagueTitles: 2 },
    { id: 27, name: 'Sporting CP', country: 'Portugal', group: 'B', logo: '', championsLeagueTitles: 0 },
    { id: 28, name: 'Club Brugge', country: 'Belgium', group: 'C', logo: '', championsLeagueTitles: 0 },
    { id: 29, name: 'GNK Dinamo Zagreb', country: 'Croatia', group: 'D', logo: '', championsLeagueTitles: 0 },
    { id: 30, name: 'Sparta Prague', country: 'Czech Republic', group: 'E', logo: '', championsLeagueTitles: 0 },
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
    background: #fff;
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