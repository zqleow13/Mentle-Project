<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';

const router = useRouter();

const handleSearch = (term) => {
    console.log('Searching for:', term);
    router.push({ name: 'search-results', query: { term: term.value }});
};

</script>

<template>
    <div class="header">
        <h1>Mentle</h1>
        <p>Find your mental health resources all in one place</p>
    </div>
    <br/>
    <div class="search-bar">
        <SearchBar @search="handleSearch"/>
    </div>
</template>

<style scoped>
  body {
    background-color: aliceblue;
    font-family: Arial, Helvetica, sans-serif;
  }
  h1 {
    font-weight: bold;
  }
</style>




