<template>
    <!-- Project name and slogan -->
    <div class="header">
        <h1>Mentle</h1>
        <p>Find your mental health resources all in one place</p>
    </div>
    <br/>
    <!-- Search bar -->
    <div class="search-bar">
        <SearchBar :onSearch="handleSearch" :searchTerm="searchTerm"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';

const router = useRouter();
const searchTerm = ref('');

const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm.value);
    router.push({ name: 'search-results', query: { term: searchTerm.value }});
};
</script>

<style scoped>
h1 {
    font-weight: bold;
}
</style>

