<script setup lang="ts">
import type { Tile } from "~/types/tiles";
const map = useState();
const zoom = useState("zoom", () => 13);
const tiles = useState<Tile[]>(GetTiles);
const selectedTile = useState<Tile>(GetTile);

const onMapReady = () => {};
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
      <LLayerGroup> </LLayerGroup>
      <LMarker :lat-lng="[48.7653376, 2.3691264]">
        <LPopup> Hi! You can call me Circle Marker! </LPopup>
      </LMarker>
    </LMap>
  </div>
</template>

<style></style>
