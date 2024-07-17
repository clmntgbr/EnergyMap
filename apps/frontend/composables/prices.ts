import type { IPrice } from "@energy_map/models/IPrice";

export const handleGetPrices = async (
  uuid: string,
  year: string
): Promise<{
  status: boolean;
  message: string | null;
  data: globalThis.Ref<IPrice[] | null> | null;
}> => {
  const runtimeConfig = useRuntimeConfig();

  const { data, status } = await useAsyncData<IPrice[]>("GetPrices", () =>
    $fetch(`${runtimeConfig.public.api_url}/api/prices/${uuid}/${year}`)
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
