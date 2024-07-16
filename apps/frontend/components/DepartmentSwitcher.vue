<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-icons/vue";
import { ref } from "vue";
import type { Department } from "~/types/filters";

const open = ref(false);

const departments = useState<Department[]>("departments");

const selectedDepartmentUuids = useState<string[]>(
  "SelectedDepartmentUuids",
  () => []
);
const selectedDepartmentNames = useState<string[]>(
  "SelectedDepartmentName",
  () => []
);

const getSelectedDepartmentNames = () => {
  return selectedDepartmentNames.value.join(", ") || "";
};

const isDepartmentSelected = (uuid: string) => {
  return selectedDepartmentUuids.value.some(
    (department) => department === uuid
  );
};

const toggleDepartment = (department: Department) => {
  const index = selectedDepartmentNames.value.indexOf(department.name);
  if (index === -1) {
    selectedDepartmentNames.value.push(department.name);
    selectedDepartmentUuids.value.push(department.uuid);
  } else {
    selectedDepartmentNames.value.splice(index, 1);
    selectedDepartmentUuids.value.splice(index, 1);
  }
};
</script>

<template>
  <Popover v-model:open="open" class="here" style="z-index: 10000">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[416px] justify-between h-auto"
        style="white-space: break-spaces"
      >
        {{ getSelectedDepartmentNames() }}
        <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opadepartment-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0" style="z-index: 10000">
      <Command>
        <CommandInput class="h-9" placeholder="" />
        <CommandList>
          <CommandGroup v-if="departments">
            <CommandItem
              v-for="department in departments"
              :key="department.uuid"
              :value="department.uuid"
              multiple
              @select="
                () => {
                  toggleDepartment(department);
                }
              "
            >
              <CheckIcon
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    isDepartmentSelected(department.uuid)
                      ? 'opacity-100'
                      : 'opacity-0'
                  )
                "
              />
              {{ department.name }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
