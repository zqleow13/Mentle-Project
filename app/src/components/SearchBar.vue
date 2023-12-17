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
   console.alert('Search term is empty. Please enter a search term.');
 }
};
</script>

<template>
    <div class="search-bar">
      <form id="bar" @submit.prevent="search">
        <input id="input" v-model="localSearchTerm" type="text" placeholder="Search...">
        <button id="search-button" type="submit">Search</button>
      </form>
    </div>
 </template>

 <style scoped>
  #bar {
    margin: 0 auto;
    width: 575px;
    border-radius:30px;
    border: 2px solid #dcdcdc;
    overflow: hidden;
  }

  #input {
    height:45px;
    padding-left: 10px;
    border:none;
    width:500px;
    outline: none;
  }

  #search-button {
    background-color: #f5f5f5;
    border:none;
    color:#707070;
    padding: 5px;
    margin: 5px;
    border-radius:4px;
    outline:none;
  }

  #search-button:hover {
    background-color: #eceaea;
    cursor: pointer;
  }

</style>