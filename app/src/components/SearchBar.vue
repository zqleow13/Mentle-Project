<template>
    <div class="search-bar">
      <form @submit.prevent="search">
        <input v-model="localSearchTerm" type="text" placeholder="Search...">
        <button type="submit">Search</button>
      </form>
    </div>
 </template>
  
 <script setup>
 import { ref } from 'vue';
 
 const { onSearch, searchTerm } = defineProps(['onSearch', 'searchTerm']);
 const localSearchTerm = ref('');
 
 const search = () => {
  // Trim any whitespace from the search term
  const trimmedSearchTerm = localSearchTerm.value.trim();

  // Check if the search term is not empty
  if (trimmedSearchTerm !== '') {
    // Emit the onSearch event with the current localSearchTerm value
    onSearch(trimmedSearchTerm);
  } else {
    // Optionally, you can provide feedback to the user that the search term is required
    alert('Search term is empty. Please enter a search term.');
  }
};
 </script>
  
  <style scoped>

  </style>