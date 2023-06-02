<template>
  <div>
    {{ datePlan }}
  </div>

</template>

<script setup>
const { datePlan } = defineProps({
  datePlan: {
    required: true,
    type: String
  }
})
</script>