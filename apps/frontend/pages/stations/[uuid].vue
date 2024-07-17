<script setup lang="ts">
const route = useRoute();
const station = await handleGetStationByUuid(route.params.uuid.toString());
let prices = await handleGetPrices(route.params.uuid.toString(), "2023");
</script>

<template>
  <pre v-if="station.data?.value">{{ station.data.value }}</pre>
  <pre v-if="prices.data?.value">{{ prices.data.value }}</pre>
</template>
