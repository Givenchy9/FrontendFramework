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
                <p>Goals: {{ selectedPlayer.goals }}</p>
                <p>Assists: {{ selectedPlayer.assists }}</p>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, computed } from 'vue';

// Define players
const players = ref([
  { id: 0, name: 'Cristiano Ronaldo', country: 'Portugal', group: 'A', logo: '', titles: 5, goals: 140, assists: 42 },
  { id: 1, name: 'Lionel Messi', country: 'Argentina', group: 'B', logo: '', titles: 4, goals: 130, assists: 35 },
  { id: 2, name: 'Robert Lewandowski', country: 'Poland', group: 'C', logo: '', titles: 1, goals: 91, assists: 23 },
  { id: 3, name: 'Karim Benzema', country: 'France', group: 'D', logo: '', titles: 5, goals: 89, assists: 31 },
  { id: 4, name: 'Andrés Iniesta', country: 'Spain', group: 'E', logo: '', titles: 4, goals: 30, assists: 35 },
  { id: 5, name: 'Paolo Maldini', country: 'Italy', group: 'F', logo: '', titles: 5, goals: 40, assists: 10 },
  { id: 6, name: 'Xavi Hernández', country: 'Spain', group: 'G', logo: '', titles: 4, goals: 25, assists: 50 },
  { id: 7, name: 'Clarence Seedorf', country: 'Netherlands', group: 'H', logo: '', titles: 4, goals: 24, assists: 10 },
  { id: 8, name: 'Thierry Henry', country: 'France', group: 'A', logo: '', titles: 2, goals: 50, assists: 34 },
  { id: 9, name: 'Gianluigi Buffon', country: 'Italy', group: 'B', logo: '', titles: 0, goals: 0, assists: 0 },
  { id: 10, name: 'Alessandro Del Piero', country: 'Italy', group: 'C', logo: '', titles: 1, goals: 42, assists: 18 },
  { id: 11, name: 'Raúl González', country: 'Spain', group: 'D', logo: '', titles: 3, goals: 71, assists: 20 },
  { id: 12, name: 'Samuel Eto’o', country: 'Cameroon', group: 'E', logo: '', titles: 2, goals: 33, assists: 9 },
  { id: 13, name: 'Didier Drogba', country: 'Ivory Coast', group: 'F', logo: '', titles: 1, goals: 36, assists: 11 },
  { id: 14, name: 'David Villa', country: 'Spain', group: 'G', logo: '', titles: 2, goals: 29, assists: 10 },
  { id: 15, name: 'George Weah', country: 'Liberia', group: 'H', logo: '', titles: 0, goals: 0, assists: 0 },
  { id: 16, name: 'Zinedine Zidane', country: 'France', group: 'A', logo: '', titles: 1, goals: 14, assists: 5 },
  { id: 17, name: 'Andrea Pirlo', country: 'Italy', group: 'B', logo: '', titles: 2, goals: 16, assists: 21 },
  { id: 18, name: 'Frank Lampard', country: 'England', group: 'C', logo: '', titles: 1, goals: 23, assists: 30 },
  { id: 19, name: 'Steven Gerrard', country: 'England', group: 'D', logo: '', titles: 2, goals: 21, assists: 25 },
  { id: 20, name: 'Michael Ballack', country: 'Germany', group: 'E', logo: '', titles: 0, goals: 11, assists: 6 },
  { id: 21, name: 'Paul Scholes', country: 'England', group: 'F', logo: '', titles: 2, goals: 24, assists: 12 },
  { id: 22, name: 'Luis Figo', country: 'Portugal', group: 'G', logo: '', titles: 1, goals: 14, assists: 15 },
  { id: 23, name: 'Ryan Giggs', country: 'Wales', group: 'H', logo: '', titles: 2, goals: 28, assists: 30 },
  { id: 24, name: 'Carles Puyol', country: 'Spain', group: 'A', logo: '', titles: 3, goals: 15, assists: 3 },
  { id: 25, name: 'Sergio Ramos', country: 'Spain', group: 'B', logo: '', titles: 5, goals: 20, assists: 10 },
  { id: 26, name: 'Franco Baresi', country: 'Italy', group: 'C', logo: '', titles: 1, goals: 7, assists: 2 },
  { id: 27, name: 'Nemanja Vidić', country: 'Serbia', group: 'D', logo: '', titles: 1, goals: 15, assists: 5 },
  { id: 28, name: 'Javier Zanetti', country: 'Argentina', group: 'E', logo: '', titles: 1, goals: 7, assists: 5 },
  { id: 29, name: 'Roberto Carlos', country: 'Brazil', group: 'F', logo: '', titles: 3, goals: 16, assists: 19 },
  { id: 30, name: 'Iker Casillas', country: 'Spain', group: 'G', logo: '', titles: 3, goals: 0, assists: 0 },
  { id: 31, name: 'Manuel Neuer', country: 'Germany', group: 'H', logo: '', titles: 2, goals: 0, assists: 0 },
  { id: 32, name: 'Oliver Kahn', country: 'Germany', group: 'A', logo: '', titles: 1, goals: 0, assists: 0 },
  { id: 33, name: 'Ruud van Nistelrooy', country: 'Netherlands', group: 'B', logo: '', titles: 0, goals: 56, assists: 15 },
  { id: 34, name: 'Zlatan Ibrahimović', country: 'Sweden', group: 'C', logo: '', titles: 0, goals: 49, assists: 18 },
  { id: 35, name: 'Wayne Rooney', country: 'England', group: 'D', logo: '', titles: 1, goals: 30, assists: 16 },
  { id: 36, name: 'Marco van Basten', country: 'Netherlands', group: 'E', logo: '', titles: 3, goals: 20, assists: 4 },
  { id: 37, name: 'Andriy Shevchenko', country: 'Ukraine', group: 'F', logo: '', titles: 1, goals: 59, assists: 15 },
  { id: 38, name: 'Fernando Torres', country: 'Spain', group: 'G', logo: '', titles: 1, goals: 14, assists: 6 },
  { id: 39, name: 'Kaka', country: 'Brazil', group: 'H', logo: '', titles: 1, goals: 30, assists: 13 },
  { id: 40, name: 'Gareth Bale', country: 'Wales', group: 'A', logo: '', titles: 5, goals: 4, assists: 3 },
  { id: 41, name: 'Patrick Vieira', country: 'France', group: 'B', logo: '', titles: 1, goals: 11, assists: 6 },
  { id: 42, name: 'Cesc Fàbregas', country: 'Spain', group: 'C', logo: '', titles: 1, goals: 6, assists: 7 },
  { id: 43, name: 'John Terry', country: 'England', group: 'D', logo: '', titles: 1, goals: 5, assists: 3 },
  { id: 44, name: 'Phillip Lahm', country: 'Germany', group: 'E', logo: '', titles: 1, goals: 4, assists: 10 },
  { id: 45, name: 'Xabi Alonso', country: 'Spain', group: 'F', logo: '', titles: 2, goals: 7, assists: 15 },
  { id: 46, name: 'Marcel Desailly', country: 'France', group: 'G', logo: '', titles: 2, goals: 10, assists: 5 },
  { id: 47, name: 'Roy Keane', country: 'Ireland', group: 'H', logo: '', titles: 1, goals: 10, assists: 7 },
  { id: 48, name: 'Michael Essien', country: 'Ghana', group: 'A', logo: '', titles: 0, goals: 7, assists: 5 }
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