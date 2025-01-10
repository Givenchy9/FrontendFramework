<template>
    <div class="row-span-1 bg-blue-500 flex items-center text-center">
        <div class="matchx overflow-x-auto flex max-h-60">
            <div v-for="(match, matchIndex) in allMatches" :key="matchIndex"
                class="match w-80 text-center bg-white rounded pt-4 m-2">
                <p class="w-80">{{ match.time }} - {{ match.home }} vs {{ match.away }}</p>
            </div>
        </div>
    </div>
    <div>
        <Table />
    </div>
</template>

<script setup>
import matchData from '@/json/champions.json';
const allMatches = matchData.matchdays.flatMap(day => day.matches);
</script>

<style scoped>
.matchx {}
</style>