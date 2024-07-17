<script setup lang="ts">
const route = useRoute();
const station = await handleGetStationByUuid(route.params.uuid.toString());
</script>

<template>
  <pre v-if="station.data?.value">{{ station.data.value }}</pre>
</template>
