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
   // Emit the onSearch event with the current searchTerm
   onSearch(localSearchTerm.value);
 };
 </script>
  
  <style scoped>
  /* Add your styling here */
  </style>