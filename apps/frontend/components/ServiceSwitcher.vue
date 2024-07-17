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
import type { Service } from "~/types/filters";

const open = ref(false);
const searchQuery = ref("");

const services = useState<Service[]>("services");

const selectedServiceUuids = useState<string[]>(
  "SelectedServiceUuids",
  () => []
);
const selectedServiceNames = useState<string[]>(
  "SelectedServiceName",
  () => []
);

const getSelectedServiceNames = () => {
  return selectedServiceNames.value.join(", ") || "Filtrer par services";
};

const isServiceSelected = (uuid: string) => {
  return selectedServiceUuids.value.some((service) => service === uuid);
};

const filter = computed(() => {
  if (!searchQuery.value) {
    return services.value;
  }

  console.log(searchQuery);

  return services.value.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleService = (service: Service) => {
  const index = selectedServiceNames.value.indexOf(service.name);
  if (index === -1) {
    selectedServiceNames.value.push(service.name);
    selectedServiceUuids.value.push(service.uuid);
  } else {
    selectedServiceNames.value.splice(index, 1);
    selectedServiceUuids.value.splice(index, 1);
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
        class="w-[416px] justify-between h-auto py-3 font-medium text-left"
        :class="selectedServiceUuids.length === 0 ? 'font-light' : ''"
        style="white-space: break-spaces"
      >
        {{ getSelectedServiceNames() }}
        <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[416px] p-0" style="z-index: 10000">
      <Command>
        <CommandInput class="h-9" placeholder="" />
        <CommandList>
          <CommandGroup v-if="filter">
            <CommandItem
              v-for="service in filter"
              :key="service.uuid"
              :value="service.name"
              multiple
              @select="
                () => {
                  toggleService(service);
                }
              "
            >
              <CheckIcon
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    isServiceSelected(service.uuid)
                      ? 'opacity-100'
                      : 'opacity-0'
                  )
                "
              />
              {{ service.name }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
