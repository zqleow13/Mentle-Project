<script>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const useSearchResults = () => {
  const searchResults = ref([]);
  const searchTerm = ref('');
  const router = useRouter();

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get('/api/search', {
        params: { term: searchTerm.value },
      });

      searchResults.value = response.data;
    } catch (error) {
      console.error('Error fetching search results:', error);
    }

    };

  // Use onMounted for lifecycle hook equivalent to created
  onMounted(fetchSearchResults);

  // Use watch to reactively call fetchSearchResults when $route.query.term changes
  watch(() => router.currentRoute.value.query.term, fetchSearchResults);

  return {
    searchResults,
    searchTerm,
    fetchSearchResults,
  };
};

export default {
  setup() {
    // Call the useSearchResults function to get the reactive state and methods
    const { searchResults, searchTerm, fetchSearchResults } = useSearchResults();

    return {
      searchResults,
      searchTerm,
      fetchSearchResults,
    };
  },
};
</script>

<template>
    <!-- Header -->
    <div class="search-header">
        <h1>Mentle</h1>
        <h2>Search Results</h2>
        <h2>Results for: {{ searchTerm }}</h2>
    </div>

    <!-- Search bar -->
    <div class="search-bar">
        <input>
        <button @click='fetchSearchResults' id="search" type="button">Search</button>
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
    </div>

    <!-- Search results -->
    <div class="results-container">
        <ul>
            <li v-for='result in searchResults' :key='result.id'>
                {{ result.name }}
            </li>
        </ul>
    </div>
</template>