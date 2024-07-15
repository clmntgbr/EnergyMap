<script setup lang="ts">
const isFilterOpen = useState<boolean>("isFilterOpen", () => false);
</script>

<template>
  <div>
    <UButton label="Open" @click="isFilterOpen = true" class="buttonFilter" />

    <USlideover v-model="isFilterOpen" style="z-index: 1000">
      <div class="p-4 flex-1">
        <TypeSwitcher />
        <ServiceSwitcher />
        <RegionSwitcher />
      </div>
    </USlideover>
  </div>
</template>
