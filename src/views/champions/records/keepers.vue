<template>
    <div class="players overflow-auto row-span-5">
        <div v-for="(row, rowIndex) in chunkPlayers(topChampionsLeagueGoalkeepers, 8)" :key="rowIndex"
            class="player-row">
            <div v-for="(player, index) in row" :key="player.id"
                class="player-card backdrop-blur text-white hover:p-4 hover:bg-gray-500"
                @click="showPlayerDetails(player)">
                <img :src="player.image" :alt="player.player" />
                <p>{{ player.name }}</p>
                <p>Wins: {{ player.wins }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Array with player data (Player name, appearances, image URL)
const topChampionsLeagueGoalkeepers = [
    { name: "Iker Casillas", wins: 3, image: "https://example.com/images/iker_casillas.jpg" },
    { name: "Manuel Neuer", wins: 2, image: "https://example.com/images/manuel_neuer.jpg" },
    { name: "Gianluigi Buffon", wins: 0, image: "https://example.com/images/gianluigi_buffon.jpg" },
    { name: "Edwin van der Sar", wins: 2, image: "https://example.com/images/edwin_van_der_sar.jpg" },
    { name: "Petr Čech", wins: 1, image: "https://example.com/images/petr_cech.jpg" },
    { name: "Oliver Kahn", wins: 1, image: "https://example.com/images/oliver_kahn.jpg" },
    { name: "Víctor Valdés", wins: 3, image: "https://example.com/images/victor_valdes.jpg" },
    { name: "Sepp Maier", wins: 3, image: "https://example.com/images/sepp_maier.jpg" },
    { name: "Keylor Navas", wins: 3, image: "https://example.com/images/keylor_navas.jpg" },
    { name: "Dida", wins: 2, image: "https://example.com/images/dida.jpg" },
    { name: "Thibaut Courtois", wins: 1, image: "https://example.com/images/thibaut_courtois.jpg" },
    { name: "Marc-André ter Stegen", wins: 1, image: "https://example.com/images/ter_stegen.jpg" },
    { name: "Alisson Becker", wins: 1, image: "https://example.com/images/alisson_becker.jpg" },
    { name: "David de Gea", wins: 0, image: "https://example.com/images/david_de_gea.jpg" },
    { name: "Claudio Taffarel", wins: 0, image: "https://example.com/images/claudio_taffarel.jpg" },
    { name: "Hugo Lloris", wins: 0, image: "https://example.com/images/hugo_lloris.jpg" },
    { name: "Jan Oblak", wins: 0, image: "https://example.com/images/jan_oblak.jpg" },
    { name: "Pepe Reina", wins: 0, image: "https://example.com/images/pepe_reina.jpg" },
    { name: "Fabien Barthez", wins: 1, image: "https://example.com/images/fabien_barthez.jpg" },
    { name: "Walter Zenga", wins: 0, image: "https://example.com/images/walter_zenga.jpg" },
    { name: "Rui Patrício", wins: 0, image: "https://example.com/images/rui_patricio.jpg" },
    { name: "Joe Hart", wins: 0, image: "https://example.com/images/joe_hart.jpg" },
    { name: "Shay Given", wins: 0, image: "https://example.com/images/shay_given.jpg" },
    { name: "Peter Schmeichel", wins: 1, image: "https://example.com/images/peter_schmeichel.jpg" },
    { name: "Kasper Schmeichel", wins: 0, image: "https://example.com/images/kasper_schmeichel.jpg" },
    { name: "Gianluca Pagliuca", wins: 0, image: "https://example.com/images/gianluca_pagliuca.jpg" },
    { name: "Igor Akinfeev", wins: 0, image: "https://example.com/images/igor_akinfeev.jpg" },
    { name: "Fernando Muslera", wins: 0, image: "https://example.com/images/fernando_muslera.jpg" },
    { name: "Samir Handanović", wins: 0, image: "https://example.com/images/samir_handanovic.jpg" },
    { name: "Kepa Arrizabalaga", wins: 0, image: "https://example.com/images/kepa_arrizabalaga.jpg" },
    { name: "Sergio Romero", wins: 0, image: "https://example.com/images/sergio_romero.jpg" },
    { name: "Francesco Toldo", wins: 0, image: "https://example.com/images/francesco_toldo.jpg" },
    { name: "Tim Howard", wins: 0, image: "https://example.com/images/tim_howard.jpg" },
    { name: "Brad Friedel", wins: 0, image: "https://example.com/images/brad_friedel.jpg" },
    { name: "Júlio César", wins: 1, image: "https://example.com/images/julio_cesar.jpg" },
    { name: "Steve Mandanda", wins: 0, image: "https://example.com/images/steve_mandanda.jpg" },
    { name: "Craig Gordon", wins: 0, image: "https://example.com/images/craig_gordon.jpg" },
    { name: "Andriy Pyatov", wins: 0, image: "https://example.com/images/andriy_pyatov.jpg" },
    { name: "Wojciech Szczęsny", wins: 0, image: "https://example.com/images/wojciech_szczesny.jpg" },
    { name: "Ralf Fährmann", wins: 0, image: "https://example.com/images/ralf_fahrmann.jpg" },
    { name: "Diego López", wins: 1, image: "https://example.com/images/diego_lopez.jpg" },
    { name: "Claudio Bravo", wins: 0, image: "https://example.com/images/claudio_bravo.jpg" },
    { name: "Michel Preud'homme", wins: 0, image: "https://example.com/images/michel_preudhomme.jpg" },
    { name: "Jean-Marie Pfaff", wins: 0, image: "https://example.com/images/jean_marie_pfaff.jpg" },
    { name: "Andreas Köpke", wins: 0, image: "https://example.com/images/andreas_kopke.jpg" },
    { name: "Lev Yashin", wins: 0, image: "https://example.com/images/lev_yashin.jpg" },
    { name: "Vladimir Beara", wins: 1, image: "https://example.com/images/vladimir_beara.jpg" },
    { name: "Henrik Andersen", wins: 0, image: "https://example.com/images/henrik_andersen.jpg" },
    { name: "Jens Lehmann", wins: 0, image: "https://example.com/images/jens_lehmann.jpg" },
    { name: "Bernd Leno", wins: 0, image: "https://example.com/images/bernd_leno.jpg" },
    { name: "Jordan Pickford", wins: 0, image: "https://example.com/images/jordan_pickford.jpg" },
    { name: "David Seaman", wins: 0, image: "https://example.com/images/david_seaman.jpg" },
    { name: "Héctor Zelada", wins: 1, image: "https://example.com/images/hector_zelada.jpg" },
    { name: "Stefano Tacconi", wins: 1, image: "https://example.com/images/stefano_tacconi.jpg" },
    { name: "Thomas Ravelli", wins: 0, image: "https://example.com/images/thomas_ravelli.jpg" },
    { name: "José Reina", wins: 0, image: "https://example.com/images/jose_reina.jpg" },
    { name: "Fraser Forster", wins: 0, image: "https://example.com/images/fraser_forster.jpg" },
    // Remaining players to complete 100...
];


// Function to chunk the data into smaller arrays
function chunkPlayers(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

// Placeholder function to show player details when clicked
function showPlayerDetails(player) {
    console.log(player); // This will log the player data, implement your own modal or detail view logic here
}
</script>

<style scoped>
.players {
    height: 650px;
}

.player-card {
    border: 1px solid white;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    text-align: center;
}

.player-card img {
    width: 100px;
    height: auto;
    margin-bottom: 10px;
}
</style>