<template>
    <div class="h-full bg-red-500">
        <div>
            <RouterView />
        </div>
        <div class="fixed w-5/6 bottom-4 shadow-sm text-center">
            <RouterLink to="/champions/records/teams"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-l-lg text-sm px-5 py-2.5 mb-2">
                Teams</RouterLink>
            <RouterLink to="/champions/records/players"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium text-sm px-5 py-2.5 mb-2">
                Players</RouterLink>
            <RouterLink to="/champions/records/goals"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium text-sm px-5 py-2.5 mb-2">Most
                Goals</RouterLink>
            <RouterLink to="/champions/records/keepers"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium text-sm px-5 py-2.5 mb-2">Best
                GKs</RouterLink>
            <RouterLink to="/champions/records/motm"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium text-sm px-5 py-2.5 mb-2">Most
                MOTM</RouterLink>
            <RouterLink to="/champions/records/shots"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-r-lg text-sm px-5 py-2.5 mb-2">
                Goals</RouterLink>
        </div>
    </div>
</template>
