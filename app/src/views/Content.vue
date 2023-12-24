<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps(['resultName']);

const resultData = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/search/${props.resultName}`);
    resultData.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

</script>

<template>
    <div class="heading">
        <h1>{{ props.resultName }}</h1>
        <p v-if="resultData">{{ resultData }}</p>
    </div>
</template>

<style scoped>
  h1 {
    font-weight: bold;
  }
</style>