<script setup lang="ts">
import type { LatLng } from "leaflet";
import type { Tile } from "~/types/tiles";

const map = useState<any | null>();
const zoom = useState("zoom", () => 11);
const tiles = useState<Tile[]>(GetTiles);
const selectedTile = useState<Tile>(GetTile);

let stations = await handleGetStationsMap(48.8534951, 2.3483915, zoom.value);

const onMapReady = async () => {
  stations = await handleGetStationsMap(48.8534951, 2.3483915, zoom.value);
  console.log(map.value);

  if (map.value.leafletObject) {
    map.value.leafletObject.on("moveend", async () => {
      const center: LatLng = map.value.leafletObject.getCenter();
      stations = await handleGetStationsMap(center.lat, center.lng, zoom.value);
    });
  }
};
</script>

<template>
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
      <LLayerGroup v-if="stations.data">
        <LMarker
          v-for="station in stations.data.value"
          :key="station.uuid"
          :lat-lng="[station.address.latitude, station.address.longitude]"
        >
          <LPopup>{{ station.address.vicinity }}</LPopup>
        </LMarker>
      </LLayerGroup>
    </LMap>
  </div>
</template>

<style></style>
