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
import type { Region } from "~/types/filters";

const open = ref(false);

const regions = await handleGetRegions();

const selectedRegionUuids = useState<string[]>("SelectedRegionUuids", () => []);
const selectedRegionNames = useState<string[]>("SelectedRegionName", () => []);

const getSelectedRegionNames = () => {
  return selectedRegionNames.value.join(", ") || "";
};

const isRegionSelected = (uuid: string) => {
  return selectedRegionUuids.value.some((region) => region === uuid);
};

const toggleRegion = (region: Region) => {
  const index = selectedRegionNames.value.indexOf(region.name);
  if (index === -1) {
    selectedRegionNames.value.push(region.name);
    selectedRegionUuids.value.push(region.uuid);
  } else {
    selectedRegionNames.value.splice(index, 1);
    selectedRegionUuids.value.splice(index, 1);
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
        {{ getSelectedRegionNames() }}
        <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 oparegion-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0" style="z-index: 10000">
      <Command>
        <CommandInput class="h-9" placeholder="" />
        <CommandList>
          <CommandGroup v-if="regions.data?.value">
            <CommandItem
              v-for="region in regions.data.value"
              :key="region.uuid"
              :value="region.uuid"
              multiple
              @select="
                () => {
                  toggleRegion(region);
                }
              "
            >
              <CheckIcon
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    isRegionSelected(region.uuid) ? 'opacity-100' : 'opacity-0'
                  )
                "
              />
              {{ region.name }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
