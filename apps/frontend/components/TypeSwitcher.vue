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

const open = ref(false);

const types = await handleGetTypes();
const typeCookieUuid = useCookie<string>("typeUuid");
const typeCookieName = useCookie<string>("typeName");

if (!typeCookieUuid.value) {
  typeCookieUuid.value = "ebc50145-911a-46ea-beb3-b952af6ce3f4";
}

if (!typeCookieName.value) {
  typeCookieName.value = "SP98";
}

const selectedTypeUuid = useState<string>(
  "SelectedTypeUuid",
  () => typeCookieUuid.value
);

const selectedTypeName = useState<string>(
  "SelectedTypeName",
  () => typeCookieName.value
);
</script>

<template>
  <Popover v-model:open="open" class="here" style="z-index: 10000">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between"
      >
        {{ selectedTypeName }}
        <CaretSortIcon class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0" style="z-index: 10000">
      <Command>
        <CommandInput class="h-9" placeholder="" />
        <CommandList>
          <CommandGroup v-if="types.data?.value">
            <CommandItem
              v-for="type in types.data.value"
              :key="type.uuid"
              :value="type.uuid"
              @select="
                () => {
                  typeCookieUuid = type.uuid;
                  typeCookieName = type.name;
                  selectedTypeUuid = type.uuid;
                  selectedTypeName = type.name;
                  open = false;
                }
              "
            >
              <CheckIcon
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    selectedTypeUuid === type.uuid ? 'opacity-100' : 'opacity-0'
                  )
                "
              />
              {{ type.name }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
