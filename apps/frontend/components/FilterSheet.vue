<script setup lang="ts">
const isFilterOpen = useState<boolean>("isFilterOpen", () => false);

const selectedDepartmentUuids = useState<string[]>("SelectedDepartmentUuids");
const selectedDepartmentNames = useState<string[]>("SelectedDepartmentName");
const selectedServiceUuids = useState<string[]>("SelectedServiceUuids");
const selectedServiceNames = useState<string[]>("SelectedServiceName");
</script>

<template>
  <div>
    <UButton label="Open" @click="isFilterOpen = true" class="buttonFilter" />

    <USlideover v-model="isFilterOpen" style="z-index: 1000">
      <div class="flex flex-col p-4 flex-1 gap-3">
        <TypeSwitcher />
        <ServiceSwitcher />
        <DepartmentSwitcher />

        <UButton
          label="Reset"
          class="justify-center"
          @click="
            selectedDepartmentUuids = [];
            selectedDepartmentNames = [];
            selectedServiceUuids = [];
            selectedServiceNames = [];
          "
        />
      </div>
    </USlideover>
  </div>
</template>
