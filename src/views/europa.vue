<template>
    <Header />
    <div class="main bg-red-500 grid grid-cols-4 h-screen"
        style="background-image: url('https://images.metadata.sky.com/pd-image/194f4c4a-7360-4b27-96f7-194bbd7f13be/16-9'); background-repeat: no-repeat; background-size: cover;">
        <div class="main1 col-span-1 mt-32">
            <div v-for="(link, index) in links" :key="index"
                class="knoppen py-5 px-5 me-2 mb-2 text-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-orange-500 focus:z-10 focus:ring-4 focus:ring-gray-100"
                :class="{ 'bg-gray-300 pointer-events-none': $route.path === link.to }">
                <RouterLink :to="link.to" class="border-2 px-32 py-5"
                    :aria-current="$route.path === link.to ? 'page' : undefined">
                    {{ link.label }}
                </RouterLink>
            </div>
        </div>
        <div class="main2 col-span-3 mt-10">
            <RouterView />
        </div>
    </div>
</template>
<script setup>
import Header from "@/components/header.vue";
const links = [
    { to: '/europa/schema', label: 'Schema' },
    { to: '/europa/players', label: 'Players' },
    { to: '/europa/teams', label: 'Teams' },
    { to: '/europa/icons', label: 'Icons' },
    { to: '/europa/records', label: 'Records' },
];
</script>
<style>
@media (max-width: 800px) {
    .main {
        grid-template-rows: repeat(6, minmax(0, 1fr));
        grid-template-columns: none;
    }

    .main1 {
        overflow-x: auto;
        margin-top: 50px;
    }

    .knoppen {
        display: inline;
    }
}
</style>