<template>
  <div>
    <!-- Header -->
    <div class="search-header">
      <h1>Mentle</h1>
      <h2>Search Results</h2>
      <h2>Results for: {{ resultSearchTerm }}</h2>
    </div>

    <!-- Search bar -->
    <SearchBar :onSearch="handleSearch"/>
    <br>

    <!-- Search results -->
    <div class="results-container">
        <div class="result" v-for="result in searchResults" :key="result.ID">
          {{ result.Name }}
        </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import SearchBar from '@/components/SearchBar.vue';

const searchResults = ref([]);
const resultSearchTerm = ref('');
const router = useRouter();

const fetchSearchResults = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/search', {
      params: { term: resultSearchTerm.value },
    });

    searchResults.value = response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
  }
};

// Use onMounted for lifecycle hook
// onMounted(fetchSearchResults);

// Use watch to reactively call fetchSearchResults when search term changes
watch(() => router.currentRoute.value.query.term, (newTerm, oldTerm) => {
  if (newTerm !== oldTerm) {
    resultSearchTerm.value = newTerm;
    fetchSearchResults();
  }
});

const handleSearch = (searchTerm) => {
  resultSearchTerm.value = searchTerm;
  fetchSearchResults();
};
</script>

<style scoped>
  body {
    background-color: aliceblue;
    font-family: Arial, Helvetica, sans-serif;
  }
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
