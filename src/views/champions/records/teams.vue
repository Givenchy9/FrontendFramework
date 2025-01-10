<template>
    <div class="players overflow-auto row-span-5">
      <div v-for="(row, rowIndex) in chunkWinners(championsLeagueWinners, 8)" :key="rowIndex" class="player-row">
        <div 
          v-for="(winner, index) in row" 
          :key="winner.id"
          class="player-card backdrop-blur text-white hover:p-4 hover:bg-gray-500"
          @click="showWinnerDetails(winner)"
        >
          <img :src="winner.logo" :alt="winner.club" />
          <p>{{ winner.club }}</p>
          <p>Titles: {{ winner.titles }}</p>
          <p>Years: {{ winner.years.join(', ') }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Example data array provided earlier
  const championsLeagueWinners = ref([
  { id: 1, club: 'Real Madrid', titles: 15, years: [1956, 1957, 1958, 1959, 1960, 1966, 1998, 2000, 2002, 2014, 2016, 2017, 2018, 2022, 2023] },
  { id: 2, club: 'AC Milan', titles: 7, years: [1963, 1969, 1989, 1990, 1994, 2003, 2007] },
  { id: 3, club: 'Bayern Munich', titles: 6, years: [1974, 1975, 1976, 2001, 2013, 2020] },
  { id: 4, club: 'Liverpool', titles: 6, years: [1977, 1978, 1981, 1984, 2005, 2019] },
  { id: 5, club: 'Barcelona', titles: 5, years: [1992, 2006, 2009, 2011, 2015] },
  { id: 6, club: 'Ajax', titles: 4, years: [1971, 1972, 1973, 1995] },
  { id: 7, club: 'Manchester United', titles: 3, years: [1968, 1999, 2008] },
  { id: 8, club: 'Inter Milan', titles: 3, years: [1964, 1965, 2010] },
  { id: 9, club: 'Benfica', titles: 2, years: [1961, 1962] },
  { id: 10, club: 'Juventus', titles: 2, years: [1985, 1996] },
  { id: 11, club: 'Nottingham Forest', titles: 2, years: [1979, 1980] },
  { id: 12, club: 'Porto', titles: 2, years: [1987, 2004] },
  { id: 13, club: 'Chelsea', titles: 2, years: [2012, 2021] },
  { id: 14, club: 'Celtic', titles: 1, years: [1967] },
  { id: 15, club: 'Hamburg SV', titles: 1, years: [1983] },
  { id: 16, club: 'Steaua Bucharest', titles: 1, years: [1986] },
  { id: 17, club: 'Marseille', titles: 1, years: [1993] },
  { id: 18, club: 'Feyenoord', titles: 1, years: [1970] },
  { id: 19, club: 'Aston Villa', titles: 1, years: [1982] },
  { id: 20, club: 'PSV Eindhoven', titles: 1, years: [1988] },
  { id: 21, club: 'Red Star Belgrade', titles: 1, years: [1991] },
  { id: 22, club: 'Borussia Dortmund', titles: 1, years: [1997] },
  { id: 23, club: 'Manchester City', titles: 1, years: [2023] }
]);
  
  // Function to chunk the data into smaller arrays
  function chunkWinners(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
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
  