<script setup>
import { ref } from 'vue'
</script>

<template>
    <!-- Project name and slogan -->
    <div class="header">
        <h1>Mentle</h1>
        <p>Find your mental health resources all in one place</p>
    </div>

    <!-- Search bar -->
    <div class="search-bar">
        <input>
        <button id="search">Search</button>
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
    </div>
</template>