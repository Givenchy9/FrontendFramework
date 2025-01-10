<template>
    <div class="players overflow-auto row-span-5">
        <div v-for="(row, rowIndex) in chunkPlayers(topChampionsLeagueGoals, 8)" :key="rowIndex" class="player-row">
            <div v-for="(player, index) in row" :key="player.id"
                class="player-card backdrop-blur text-white hover:p-4 hover:bg-gray-500"
                @click="showPlayerDetails(player)">
                <img :src="player.image" :alt="player.player" />
                <p>{{ player.player }}</p>
                <p>{{ player.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Array with player data (Player name, match, goal description, image URL)
const topChampionsLeagueGoals = ref([
    {
        id: 1, player: 'Cristiano Ronaldo', description: 'A stunning bicycle kick that left the entire stadium in awe, one of the greatest individual goals ever in the competition.',
        match: 'Real Madrid vs. Juventus - 2018',
        image: 'https://example.com/images/cristiano_ronaldo.jpg'
    },
    {
        id: 2, player: 'Zinedine Zidane', description: 'A perfect volley with his weaker foot in the final to secure Real Madrid’s 9th European Cup.',
        match: 'Real Madrid vs. Bayer Leverkusen - 2002',
        image: 'https://example.com/images/zinedine_zidane.jpg'
    },
    {
        id: 3, player: 'Lionel Messi', description: 'A brilliant solo goal where Messi dribbled past several Bayern defenders before scoring with a precise finish.',
        match: 'Barcelona vs. Bayern Munich - 2015',
        image: 'https://example.com/images/lionel_messi.jpg'
    },
    {
        id: 4, player: 'Gareth Bale', description: 'A bicycle kick that was almost identical to Ronaldo’s, but this one came in the final, sealing Real Madrid’s victory.',
        match: 'Real Madrid vs. Liverpool - 2018',
        image: 'https://example.com/images/gareth_bale.jpg'
    },
    {
        id: 5, player: 'Ricardo Quaresma', description: 'A stunning outside-of-the-foot curling shot that helped Porto claim a memorable 3-0 win.',
        match: 'Porto vs. AS Roma - 2016',
        image: 'https://example.com/images/ricardo_quaresma.jpg'
    },
    {
        id: 6, player: 'Cristiano Ronaldo', description: 'A long-range thunderbolt that left the goalkeeper with no chance, one of Ronaldo’s greatest strikes.',
        match: 'Manchester United vs. Porto - 2009',
        image: 'https://example.com/images/cristiano_ronaldo_2009.jpg'
    },
    {
        id: 7, player: 'Wayne Rooney', description: 'A perfect bicycle kick from Rooney helped United win the derby, a magnificent goal.',
        match: 'Manchester United vs. Manchester City - 2014',
        image: 'https://example.com/images/wayne_rooney.jpg'
    },
    {
        id: 8, player: 'Philippe Coutinho', description: 'A stunning strike from outside the box, Coutinho’s goal was an absolute beauty against Pep Guardiola’s City.',
        match: 'Liverpool vs. Manchester City - 2018',
        image: 'https://example.com/images/philippe_coutinho.jpg'
    },
    {
        id: 9, player: 'Dejan Stanković', description: 'A long-range goal from almost the halfway line, a rare and sensational strike in the Champions League.',
        match: 'Inter Milan vs. Schalke 04 - 2011',
        image: 'https://example.com/images/dejan_stankovic.jpg'
    },
    {
        id: 10, player: 'Mohamed Salah', description: 'A coolly finished goal after weaving past defenders in a brilliant solo run.',
        match: 'Liverpool vs. Roma - 2018',
        image: 'https://example.com/images/mohamed_salah.jpg'
    },
    {
        id: 11, player: 'Marco van Basten', description: 'A volley that’s often hailed as one of the greatest goals in football history.',
        match: 'AC Milan vs. Barcelona - 1994',
        image: 'https://example.com/images/marco_van_basten.jpg'
    },
    {
        id: 12, player: 'Roberto Carlos', description: 'A free-kick that defied the laws of physics, curling around the wall and into the net.',
        match: 'Real Madrid vs. AS Roma - 2002',
        image: 'https://example.com/images/roberto_carlos.jpg'
    },
    {
        id: 13, player: 'Henrik Larsson', description: 'A spectacular header in the 90th minute that helped Celtic earn a draw.',
        match: 'Celtic vs. Manchester United - 2006',
        image: 'https://example.com/images/henrik_larsson.jpg'
    },
    {
        id: 14, player: 'Kaka', description: 'A solo run that ended with a clinical finish, showcasing Kaka’s brilliance in one of the best individual goals.',
        match: 'AC Milan vs. Manchester United - 2007',
        image: 'https://example.com/images/kaka.jpg'
    },
    {
        id: 15, player: 'David Beckham', description: 'A stunning free-kick from Beckham that helped United claim a memorable win at the Santiago Bernabéu.',
        match: 'Manchester United vs. Real Madrid - 2003',
        image: 'https://example.com/images/david_beckham.jpg'
    },
    {
        id: 16, player: 'Sergio Agüero', description: 'A long-range shot that was perfectly placed into the corner of the net.',
        match: 'Manchester City vs. Bayern Munich - 2014',
        image: 'https://example.com/images/sergio_aguero.jpg'
    },
    {
        id: 17, player: 'Francesco Totti', description: 'A superb volley that showcased Totti\'s brilliance, a moment of true quality.',
        match: 'Roma vs. Lyon - 2007',
        image: 'https://example.com/images/francesco_totti.jpg'
    },
    {
        id: 18, player: 'Raul', description: 'A close-range volley that helped Real Madrid knock out Bayern Munich, it showed Raul’s impeccable timing.',
        match: 'Real Madrid vs. Bayern Munich - 2004',
        image: 'https://example.com/images/raul.jpg'
    },
    {
        id: 19, player: 'Zlatan Ibrahimović', description: 'A curling shot from outside the box, which went into the top corner of the net in typical Zlatan fashion.',
        match: 'Barcelona vs. Panathinaikos - 2009',
        image: 'https://example.com/images/zlatan_ibrahimovic.jpg'
    },
    {
        id: 20, player: 'Andriy Shevchenko', description: 'A decisive header in the final that played a key role in Milan’s victory.',
        match: 'AC Milan vs. Liverpool - 2005 Final',
        image: 'https://example.com/images/andriy_shevchenko.jpg'
    }
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
