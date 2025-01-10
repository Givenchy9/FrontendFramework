import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Simulated authentication check
const isAuthenticated = false;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/leagues.vue'),
      meta: { requiresAuth: true }, // Protected route
    },
    {
      path: '/leagues',
      name: 'leagues',
      component: () => import('../views/leagues.vue'),
      meta: { requiresAuth: true }, // Protected route
    },
    {
      path: '/euro',
      name: 'euro',
      component: () => import('../views/euro.vue'),
      meta: { requiresAuth: true }, // Protected route
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/shop.vue'),
      meta: { requiresAuth: true }, // Protected route
    },
    {
      path: '/champions',
      name: 'champions',
      component: () => import('../views/champions.vue'),
      meta: { requiresAuth: true }, // Protected route
      children: [
        {
          path: 'schema',
          component: () => import('../views/champions/schema.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'players',
          component: () => import('../views/champions/players.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'teams',
          component: () => import('../views/champions/teams.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'icons',
          component: () => import('../views/champions/icons.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: 'records',
          component: () => import('../views/champions/records.vue'),
          meta: { requiresAuth: true },
          children: [
            {
              path: 'teams',
              component: () => import('../views/champions/records/teams.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'players',
              component: () => import('../views/champions/records/players.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'goals',
              component: () => import('../views/champions/records/goals.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'keepers',
              component: () => import('../views/champions/records/keepers.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'motm',
              component: () => import('../views/champions/records/motm.vue'),
              meta: { requiresAuth: true },
            },
            {
              path: 'shots',
              component: () => import('../views/champions/records/shots.vue'),
              meta: { requiresAuth: true },
            },
          ],
        },
      ],
    },
    {
      path: '/europa',
      name: 'europa',
      component: () => import('../views/europa.vue'),
      children: [
        {
          path: 'schema',
          component: () => import('../views/champions copy/schema.vue'),
        },
        {
          path: 'players',
          component: () => import('../views/champions copy/players.vue'),
        },
        {
          path: 'teams',
          component: () => import('../views/champions copy/teams.vue'),
        },
        {
          path: 'icons',
          component: () => import('../views/champions copy/icons.vue'),
        },
      //   {
      //     path: 'records',
      //     component: () => import('../views/europa/records.vue'),
      //     children: [
      //       {
      //         path: 'teams',
      //         component: () => import('../views/europa/records/teams.vue'),
      //       },
      //       {
      //         path: 'players',
      //         component: () => import('../views/europa/records/players.vue'),
      //       },
      //       {
      //         path: 'goals',
      //         component: () => import('../views/europa/records/goals.vue'),
      //       },
      //       {
      //         path: 'keepers',
      //         component: () => import('../views/europa/records/keepers.vue'),
      //       },
      //       {
      //         path: 'motm',
      //         component: () => import('../views/europa/records/motm.vue'),
      //       },
      //       {
      //         path: 'shots',
      //         component: () => import('../views/europa/records/shots.vue'),
      //       },
      //     ]
      //   },
     ]
    },
    // {
    //   path: '/conference',
    //   name: 'conference',
    //   component: () => import('../views/conference.vue'),
    //   children: [
    //     {
    //       path: 'schema',
    //       component: () => import('../views/conference/schema.vue'),
    //     },
    //     {
    //       path: 'players',
    //       component: () => import('../views/conference/players.vue'),
    //     },
    //     {
    //       path: 'teams',
    //       component: () => import('../views/conference/teams.vue'),
    //     },
    //     {
    //       path: 'icons',
    //       component: () => import('../views/conference/icons.vue'),
    //     },
    //     {
    //       path: 'records',
    //       component: () => import('../views/conference/records.vue'),
    //       children: [
    //         {
    //           path: 'teams',
    //           component: () => import('../views/conference/records/teams.vue'),
    //         },
    //         {
    //           path: 'players',
    //           component: () => import('../views/conference/records/players.vue'),
    //         },
    //         {
    //           path: 'goals',
    //           component: () => import('../views/conference/records/goals.vue'),
    //         },
    //         {
    //           path: 'keepers',
    //           component: () => import('../views/conference/records/keepers.vue'),
    //         },
    //         {
    //           path: 'motm',
    //           component: () => import('../views/conference/records/motm.vue'),
    //         },
    //         {
    //           path: 'shots',
    //           component: () => import('../views/conference/records/shots.vue'),
    //         },
    //       ]
    //     },
    //   ]
    // },
  ],
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken'); // Check for token

  // If the route requires authentication and the user is not authenticated
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' }); // Redirect to login if not logged in
  } else {
    next(); // Allow access to the route
  }
});

export default router
