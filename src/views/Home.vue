<template>
  
  <form @submit.prevent="handleSubmit" class="m-5">
    <div>
      <h1 class="my-3">Generate Your Dating Plans</h1>
      <hr/>
      <div class="my-5 flex justify-start gap-5">
        <label for="location">Location</label>
        <input v-model="location" type="text" name="location" class="bg-gray-200" required/>
      </div>
    </div>
    <hr/>
    <div class="border-b border-gray-900/10 pb-12">   
        <div class="mt-10 space-y-10">
          <fieldset>
            <legend class="text-sm font-semibold leading-6 text-gray-900">Interests</legend>
            <div class="mt-6 space-y-6">
              <!-- INDOOR -->
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="indoor" name="indoor" value="Indoor" type="checkbox" v-model="selectedInterests" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                </div>
                <div class="text-sm leading-6">
                  <label for="indoor" class="font-medium text-gray-900">Indoor</label>
                </div>
              </div>
              <!-- OUTDOOR -->
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="outdoor" name="outdoor" value="Outdoor" type="checkbox" v-model="selectedInterests" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                </div>
                <div class="text-sm leading-6">
                  <label for="outdoor" class="font-medium text-gray-900">Outdoor</label>
                </div>
              </div>
              <!-- ART -->
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input id="art" name="art" value="Art" type="checkbox" v-model="selectedInterests" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                </div>
                <div class="text-sm leading-6">
                  <label for="art" class="font-medium text-gray-900">Art</label>
                </div>
              </div>
            </div>
          </fieldset>
        <hr/>
          <fieldset>
            <legend class="text-sm font-semibold leading-6 text-gray-900">Time</legend>
            <p class="mt-1 text-sm leading-6 text-gray-600">Which time of the day are you going out?</p>
            <div class="mt-6 space-y-6">
              <div class="flex items-center gap-x-3">
                <input id="morning" value="morning" name="time" v-model="time" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                <label for="morning" class="block text-sm font-medium leading-6 text-gray-900">Morning</label>
              </div>
              <div class="flex items-center gap-x-3">
                <input id="afternoon" value="afternoon" name="time" v-model="time" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                <label for="afternoon" class="block text-sm font-medium leading-6 text-gray-900">Afternoon</label>
              </div>
              <div class="flex items-center gap-x-3">
                <input id="evening" value="evening" name="time" v-model="time" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                <label for="evening" class="block text-sm font-medium leading-6 text-gray-900">Evening</label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      
      <div class="mt-6 flex items-center justify-center gap-x-6">
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Generate</button>
      </div>
  </form>
  <!-- Display date plans -->
  <div v-if="datePlans == 'LOADING'" class="flex flex-col gap-2 justify-center items-center">
    <p>LOADING</p>
    <img src="../assets/loading.gif" alt="loading" />
  </div>
  <div v-else class="flex flex-col gap-2 justify-center items-center">
    <DatePlan v-for="datePlan of datePlansArray" :datePlan="datePlan" />
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, toRaw } from 'vue';
import DatePlan from '../components/DatePlan.vue';

const location = ref('');
const selectedInterests = ref([]);
const time = ref('');

const datePlans= ref('');
const datePlansArray= ref([]);

// Handle form submission
async function handleSubmit() {
  datePlans.value = 'LOADING';
  
  const interests = toRaw(selectedInterests.value).join(', ')
 

  let input = `Generate 10 date plans in ${location.value} area.`

  if (interests.length > 0 ) {
    input+= `My interests includes ${interests}.`
  }
  if (time.value) {
    input+= `Also this plan is for ${time.value}`
  }

  const params = {
    input
  }

  try {
    datePlans.value = (await axios.get('http://localhost:4000/generate', {params})).data.generated_text;
    console.log(datePlans.value)

    datePlansArray.value = datePlans.value.split('\n')
    

  } catch (error) {
    console.log(error)
  }
 
  // Reset the form
  location.value = '';
  selectedInterests.value = [];
  time.value = '';
}
</script>