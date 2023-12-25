<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const props = defineProps(['resultName']);
// console.log('props.resultName:', props.resultName); // ok so props.resultName is undefined. WHY

const resultData = ref(null);

const fetchData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/resources/${props.resultName}`);
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
        <p v-if="resultData">Organisation: {{ resultData[0].Organisation }}</p>
        <p v-if="resultData">Type: {{ resultData[0].Type }}</p>
    </div><br>

    <div class="audience">
        <h2>Who should apply?</h2>
        <p v-if="resultData">{{ resultData[0].Audience }}</p>
    </div><br>

    <div class="location">
        <h2>Where is it held?</h2>
        <ul>
            <li v-if="resultData">{{ resultData[0].Location }}</li>
        </ul>
    </div><br>

    <div class="free">
        <h2>Is the resource free?</h2>
        <p v-if="resultData">{{ resultData[0].Free }}</p><br>

        <h2>Do I need a referral?</h2>
        <ul>
            <li v-if="resultData">{{ resultData[0].Referral }}</li>
        </ul>
        
    </div>
</template>

<style scoped>
  h1, h2 {
    font-weight: bold;
  }
</style>