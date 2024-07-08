<script lang="ts" setup>
const router = useRouter();
</script>

<template>
  <div :class="router.currentRoute.value.name">
    <slot />
  </div>
</template>
