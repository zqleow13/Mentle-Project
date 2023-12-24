<script setup>
import { ref } from 'vue';
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';
import { RouterLink } from "vue-router";

const searchResults = ref([]);
const term = ref('');
const props = defineProps(['term']);

const fetchSearchResults = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/search', {
      params: { term: term.value },
    }); 

    searchResults.value = response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

const handleSearch = (searchTerm) => {
  term.value = searchTerm;
  fetchSearchResults();
}

</script>

<template>
  <div>
    <div class="search-header">
      <h1>Mentle</h1>
      <h2>Search Results</h2>
      <h2>Results for: {{ term }}</h2>
    </div>

    <SearchBar @search="handleSearch"/>
    <br>

    <div class="results-container">
        <router-link 
        v-for="result in searchResults" 
        :key="result.ID" 
        :to="{ name: 'content', params: { resultName: result.Name } }">
         <div class="result">{{ result.Name }}</div>
          </router-link>  
    </div>
  </div>
</template>

<style scoped>
  h1, .result {
    font-weight: bold;
  }

  .results-container {
    display: flex;
    flex-wrap: wrap;
  }

  .result {
    width: 70em;
    height: 5em;
    background-color: rgb(162, 216, 255);
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .result:hover {
    cursor: pointer;
    background-color:rgb(123, 194, 245);
  }
</style>
