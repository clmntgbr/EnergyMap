export function GetTiles() {
  return [
    {
      name: "OpenStreetMap",
      url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    },
    {
      name: "Alidade Smooth",
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
    },
    {
      name: "Outdoors",
      url: "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png",
    },
  ];
}

export function GetTile() {
  return GetTiles()[2];
}
