<template>
    <div class="players overflow-auto row-span-5">
      <div v-for="(row, rowIndex) in chunkPlayers(championsLeagueAppearances, 8)" :key="rowIndex" class="player-row">
        <div 
          v-for="(player, index) in row" 
          :key="player.id"
          class="player-card backdrop-blur text-white hover:p-4 hover:bg-gray-500"
          @click="showPlayerDetails(player)"
        >
          <img :src="player.image" :alt="player.player" />
          <p>{{ player.player }}</p>
          <p>Appearances: {{ player.appearances }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Array with player data (Player name, appearances, image URL)
  const championsLeagueAppearances = ref([
    { id: 1, player: 'Cristiano Ronaldo', appearances: 183, image: 'https://example.com/images/ronaldo.jpg' },
    { id: 2, player: 'Iker Casillas', appearances: 177, image: 'https://example.com/images/casillas.jpg' },
    { id: 3, player: 'Lionel Messi', appearances: 163, image: 'https://example.com/images/messi.jpg' },
    { id: 4, player: 'Xavi Hernández', appearances: 151, image: 'https://example.com/images/xavi.jpg' },
    { id: 5, player: 'Raúl González', appearances: 142, image: 'https://example.com/images/raul.jpg' },
    { id: 6, player: 'Karim Benzema', appearances: 142, image: 'https://example.com/images/benzema.jpg' },
    { id: 7, player: 'Andrés Iniesta', appearances: 130, image: 'https://example.com/images/iniesta.jpg' },
    { id: 8, player: 'Sergio Ramos', appearances: 129, image: 'https://example.com/images/ramos.jpg' },
    { id: 9, player: 'Thomas Müller', appearances: 128, image: 'https://example.com/images/muller.jpg' },
    { id: 10, player: 'Clarence Seedorf', appearances: 125, image: 'https://example.com/images/seedorf.jpg' },
    { id: 11, player: 'Gianluigi Buffon', appearances: 124, image: 'https://example.com/images/buffon.jpg' },
    { id: 12, player: 'Paolo Maldini', appearances: 123, image: 'https://example.com/images/maldini.jpg' },
    { id: 13, player: 'Petr Čech', appearances: 124, image: 'https://example.com/images/cech.jpg' },
    { id: 14, player: 'Zlatan Ibrahimović', appearances: 124, image: 'https://example.com/images/ibrahimovic.jpg' },
    { id: 15, player: 'Gerard Piqué', appearances: 122, image: 'https://example.com/images/pique.jpg' },
    { id: 16, player: 'Dani Alves', appearances: 111, image: 'https://example.com/images/dani_alves.jpg' },
    { id: 17, player: 'Frank Lampard', appearances: 111, image: 'https://example.com/images/lampard.jpg' },
    { id: 18, player: 'Ryan Giggs', appearances: 141, image: 'https://example.com/images/giggs.jpg' },
    { id: 19, player: 'Thiago Silva', appearances: 111, image: 'https://example.com/images/thiago_silva.jpg' },
    { id: 20, player: 'Paul Scholes', appearances: 124, image: 'https://example.com/images/scholes.jpg' },
    { id: 21, player: 'John Terry', appearances: 111, image: 'https://example.com/images/john_terry.jpg' },
    { id: 22, player: 'Cesc Fàbregas', appearances: 110, image: 'https://example.com/images/fabregas.jpg' },
    { id: 23, player: 'Wayne Rooney', appearances: 107, image: 'https://example.com/images/rooney.jpg' },
    { id: 24, player: 'Philipp Lahm', appearances: 112, image: 'https://example.com/images/lahm.jpg' },
    { id: 25, player: 'Koke', appearances: 100, image: 'https://example.com/images/koke.jpg' },
    { id: 26, player: 'Antoine Griezmann', appearances: 100, image: 'https://example.com/images/griezmann.jpg' },
    { id: 27, player: 'Luis Suárez', appearances: 100, image: 'https://example.com/images/suarez.jpg' },
    { id: 28, player: 'Sergio Busquets', appearances: 129, image: 'https://example.com/images/busquets.jpg' },
    { id: 29, player: 'Marcelo', appearances: 102, image: 'https://example.com/images/marcelo.jpg' },
    { id: 30, player: 'Luka Modrić', appearances: 111, image: 'https://example.com/images/modric.jpg' },
    { id: 31, player: 'Toni Kroos', appearances: 113, image: 'https://example.com/images/kroos.jpg' },
    { id: 32, player: 'Manuel Neuer', appearances: 117, image: 'https://example.com/images/neuer.jpg' },
    { id: 33, player: 'Robert Lewandowski', appearances: 111, image: 'https://example.com/images/lewandowski.jpg' },
    { id: 34, player: 'Gerard Piqué', appearances: 122, image: 'https://example.com/images/pique.jpg' },
    { id: 35, player: 'Sergio Agüero', appearances: 79, image: 'https://example.com/images/aguero.jpg' },
    { id: 36, player: 'Edwin van der Sar', appearances: 98, image: 'https://example.com/images/van_der_sar.jpg' },
    { id: 37, player: 'David Beckham', appearances: 107, image: 'https://example.com/images/beckham.jpg' },
    { id: 38, player: 'Steven Gerrard', appearances: 100, image: 'https://example.com/images/gerrard.jpg' },
    { id: 39, player: 'Carles Puyol', appearances: 115, image: 'https://example.com/images/puyol.jpg' },
    { id: 40, player: 'Ashley Cole', appearances: 108, image: 'https://example.com/images/cole.jpg' },
    { id: 41, player: 'Andrea Pirlo', appearances: 108, image: 'https://example.com/images/pirlo.jpg' },
    { id: 42, player: 'Xabi Alonso', appearances: 119, image: 'https://example.com/images/xabi_alonso.jpg' },
    { id: 43, player: 'Didier Drogba', appearances: 92, image: 'https://example.com/images/drogba.jpg' },
    { id: 44, player: 'Fernando Torres', appearances: 91, image: 'https://example.com/images/torres.jpg' },
    { id: 45, player: 'Patrick Vieira', appearances: 76, image: 'https://example.com/images/vieira.jpg' },
    { id: 46, player: 'Michael Ballack', appearances: 93, image: 'https://example.com/images/ballack.jpg' },
    { id: 47, player: 'Claude Makélélé', appearances: 101, image: 'https://example.com/images/makelele.jpg' },
    { id: 48, player: 'Rio Ferdinand', appearances: 89, image: 'https://example.com/images/ferdinand.jpg' },
    { id: 49, player: 'Nemanja Vidić', appearances: 60, image: 'https://example.com/images/vidic.jpg' },
    { id: 50, player: 'Gary Neville', appearances: 109, image: 'https://example.com/images/neville.jpg' },
    { id: 51, player: 'Paul Pogba', appearances: 53, image: 'https://example.com/images/pogba.jpg' },
    { id: 52, player: 'Neymar Jr.', appearances: 78, image: 'https://example.com/images/neymar.jpg' },
    { id: 53, player: 'Kylian Mbappé', appearances: 60, image: 'https://example.com/images/mbappe.jpg' },
    { id: 54, player: 'Erling Haaland', appearances: 25, image: 'https://example.com/images/haaland.jpg' },
    { id: 55, player: 'Gareth Bale', appearances: 66, image: 'https://example.com/images/bale.jpg' },
    { id: 56, player: 'Raheem Sterling', appearances: 74, image: 'https://example.com/images/sterling.jpg' },
    { id: 57, player: 'Kevin De Bruyne', appearances: 79, image: 'https://example.com/images/de_bruyne.jpg' },
    { id: 58, player: 'Mohamed Salah', appearances: 66, image: 'https://example.com/images/salah.jpg' },
    { id: 59, player: 'Sadio Mané', appearances: 66, image: 'https://example.com/images/mane.jpg' },
    { id: 60, player: 'Virgil van Dijk', appearances: 50, image: 'https://example.com/images/van_dijk.jpg' },
    { id: 61, player: 'Alisson Becker', appearances: 50, image: 'https://example.com/images/alisson.jpg' },
    { id: 62, player: 'Trent Alexander-Arnold', appearances: 50, image: 'https://example.com/images/alexander_arnold.jpg' },
    { id: 63, player: 'Andrew Robertson', appearances: 50, image: 'https://example.com/images/robertson.jpg' },
    { id: 64, player: 'Jordan Henderson', appearances: 72, image: 'https://example.com/images/henderson.jpg' },
    { id: 65, player: 'James Milner', appearances: 86, image: 'https://example.com/images/milner.jpg' },
    { id: 66, player: 'Roberto Firmino', appearances: 60, image: 'https://example.com/images/firmino.jpg' },
    { id: 67, player: 'Thiago Alcântara', appearances: 75, image: 'https://example.com/images/thiago.jpg' },
    { id: 68, player: 'Fabinho', appearances: 50, image: 'https://example.com/images/fabinho.jpg' },
    { id: 69, player: 'Diogo Jota', appearances: 50, image: 'https://example.com/images/jota.jpg' },
    { id: 70, player: 'Luis Díaz', appearances: 50, image: 'https://example.com/images/diaz.jpg' }
  ]);
  
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
  .players{
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
  