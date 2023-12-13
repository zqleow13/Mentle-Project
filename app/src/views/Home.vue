<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();

        // Initialise searchTerm - value of search input field 
        const homeSearchTerm = ref('');

        // 'search' function - to be called when user submit the search form. It will navigate to search-results page with their search term value as query parameter
        const search = () => {
            console.log('Searching for:', homeSearchTerm.value);
            router.push({ name: 'search-results', query: { term: homeSearchTerm.value }});
        };

        return {
            homeSearchTerm,
            search,
        };
    },
};
</script>

<template>
    <!-- Project name and slogan -->
    <div class="header">
        <h1>Mentle</h1>
        <p>Find your mental health resources all in one place</p>
    </div>

    <!-- Search bar -->
    <div class="search-bar">
        <form @submit.prevent='search'>
            <input v-model='homeSearchTerm' type='text' placeholder='E.g. Counselling'>
            <button id="search" type='submit'>Search</button>
        </form>
    </div>
</template>