<script>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const useSearchResults = () => {
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
   onMounted(fetchSearchResults);

  // Use watch to reactively call fetchSearchResults when search term changes
  watch(() => router.currentRoute.value.query.term, (newTerm, oldTerm) => {
      if (newTerm !== oldTerm) {
        resultSearchTerm.value = newTerm;
        fetchSearchResults();
      }
    });

  return {
    searchResults,
    resultSearchTerm,
    fetchSearchResults,
  };
};

export default {
  setup() {
    // Call the useSearchResults function to get the reactive state and methods
    const { searchResults, resultSearchTerm, fetchSearchResults } = useSearchResults();

    return {
      searchResults,
      resultSearchTerm,
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
        <h2>Results for: {{ resultSearchTerm.value }}</h2>
    </div>

    <!-- Search bar -->
    <div class="search-bar">
        <input v-model="resultSearchTerm">
        <button @click='fetchSearchResults' id="search" type="button">Search</button>
    </div>

    <!-- Search results -->
    <div class="results-container">
        <ul>
            <li v-for='result in searchResults' :key='result.ID'>
                {{ result.Name }}
            </li>
        </ul>
    </div>
</template>