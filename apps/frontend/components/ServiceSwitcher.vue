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

const services = await handleGetServices();

const selectedServiceUuids = useState<string[]>(
  "SelectedServiceUuids",
  () => []
);
const selectedServiceNames = useState<string[]>(
  "SelectedServiceName",
  () => []
);

const getSelectedServiceNames = () => {
  return selectedServiceNames.value.join(", ") || "";
};

const isServiceSelected = (uuid: string) => {
  return selectedServiceUuids.value.some((service) => service === uuid);
};

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
        class="w-[416px] justify-between h-auto"
        style="white-space: break-spaces"
      >
        {{ getSelectedServiceNames() }}
        <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0" style="z-index: 10000">
      <Command>
        <CommandInput class="h-9" placeholder="" />
        <CommandList>
          <CommandGroup v-if="services.data?.value">
            <CommandItem
              v-for="service in services.data.value"
              :key="service.uuid"
              :value="service.uuid"
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
