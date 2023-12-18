import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import SearchResults from "../views/SearchResults.vue"


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/search-results",
            name: "search-results",
            props: (route) => route.query,
            component: SearchResults
        }
    ]
})

export default router