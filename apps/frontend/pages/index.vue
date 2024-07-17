<script setup lang="ts">
import type { LatLng } from "leaflet";
import type { Tile } from "~/types/tiles";

const map = ref<any | null>(null);
const userLocation = ref({ longitude: null, latitude: null });
const zoom = ref(13);
const tiles = ref<Tile[]>(GetTiles());
const selectedTile = ref<Tile>(GetTile());

const typeCookieUuid = useCookie<string>("typeUuid");

if (!typeCookieUuid.value) {
  typeCookieUuid.value = "ebc50145-911a-46ea-beb3-b952af6ce3f4";
}

const isFilterOpen = useState<boolean>("isFilterOpen", () => false);
const typeUuid = useState<string>(
  "SelectedTypeUuid",
  () => typeCookieUuid.value
);

const selectedServiceUuids = useState<string[]>(
  "SelectedServiceUuids",
  () => []
);

const selectedDepartmentUuids = useState<string[]>(
  "SelectedDepartmentUuids",
  () => []
);

let stations = await handleGetStationsMap();

const fetchStationsMap = async () => {
  if (map.value.leafletObject) {
    const center: LatLng = map.value.leafletObject.getCenter();
    stations = await handleGetStationsMap(
      center.lat,
      center.lng,
      calculateRadius(map.value.leafletObject),
      typeUuid.value,
      selectedServiceUuids.value,
      selectedDepartmentUuids.value
    );
  }
};

const setUserPosition = async (position: any) => {
  map.value.leafletObject.setView(
    [position.coords.latitude, position.coords.longitude],
    zoom.value
  );
  userLocation.value = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
};

const setPositionRefused = async () => {
  fetchStationsMap();
};

const onMapReady = async () => {
  if (map.value.leafletObject) {
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        setUserPosition,
        setPositionRefused
      );
    }

    map.value.leafletObject.on("moveend", async () => {
      fetchStationsMap();
    });
  }
};

const calculateRadius = (map: any) => {
  const center = map.getCenter();
  const bounds = map.getBounds();
  return center.distanceTo(bounds.getNorthWest());
};

watch(isFilterOpen, () => {
  if (!isFilterOpen.value) {
    fetchStationsMap();
  }
});

const types = await handleGetTypes();
useState("types", () => types.data?.value);

const departments = await handleGetDepartments();
useState("departments", () => departments.data?.value);

const services = await handleGetServices();
useState("services", () => services.data?.value);
</script>

<template>
  <FilterSheet />
  <div style="height: 100vh; width: 100vw">
    <LMap
      ref="map"
      :zoom="zoom"
      :use-global-leaflet="false"
      :max-zoom="18"
      :center="[48.8534951, 2.3483915]"
      @ready="onMapReady"
    >
      <LTileLayer :url="selectedTile.url" />
      <LLayerGroup v-if="userLocation.latitude && userLocation.longitude">
        <LMarker :lat-lng="[userLocation.latitude, userLocation.longitude]">
          <LIcon
            icon-url="icon_user.png"
            :icon-size="[40, 60]"
            className="zIndex"
          />
        </LMarker>
      </LLayerGroup>
      <LLayerGroup v-if="stations && stations.data?.value">
        <LMarker
          v-for="station in stations.data.value"
          :key="station.uuid"
          :lat-lng="[station.address.latitude, station.address.longitude]"
        >
          <LIcon
            :className="station.hasLowPrices ? 'zIndex' : ''"
            :icon-url="station.hasLowPrices ? 'icon_low.png' : 'icon.png'"
            :icon-size="[40, 60]"
          />
          <LPopup>
            <UButton
              label="GoTo"
              @click="
                navigateTo(`/stations/${station.uuid}`, {
                  open: {
                    target: '_blank',
                  },
                })
              "
            />
          </LPopup>
        </LMarker>
      </LLayerGroup>
    </LMap>
  </div>
</template>

<style>
.buttonFilter {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
.zIndex {
  z-index: 20000 !important;
}
</style>
