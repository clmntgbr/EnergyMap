import type { IStation } from "@energy_map/models/IStation.js";

export const handleGetStationsMap = async (
  latitude: number,
  longitude: number,
  zoom: number
): Promise<{
  status: boolean;
  message: string | null;
  data: globalThis.Ref<IStation[] | null> | null;
}> => {
  const runtimeConfig = useRuntimeConfig();

  const { data, status } = await useAsyncData<IStation[]>(
    "GetStationsMap",
    () =>
      $fetch(
        `${runtimeConfig.public.api_url}/stations/map?latitude=${latitude}&longitude=${longitude}&zoom=${zoom}`
      )
  );

  if (status.value === "success") {
    return { status: true, message: null, data: data };
  }

  return {
    status: false,
    message: "Une erreur s'est produite. Veuillez réessayer plus tard.",
    data: null,
  };
};
