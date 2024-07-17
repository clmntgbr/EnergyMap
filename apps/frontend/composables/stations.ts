import type { IStation } from "@energy_map/models/IStation.js";

export const handleGetStationsMap = async (
  latitude: number | null = null,
  longitude: number | null = null,
  radius: number | null = null,
  type: string | null = null,
  serviceUuids: string[] = [],
  departmentUuids: string[] = []
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
        getUrl(latitude, longitude, radius, type, serviceUuids, departmentUuids)
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

export const handleGetStationByUuid = async (
  uuid: string
): Promise<{
  status: boolean;
  message: string | null;
  data: globalThis.Ref<IStation | null> | null;
}> => {
  const runtimeConfig = useRuntimeConfig();

  const { data, status } = await useAsyncData<IStation>(
    "GetStationByUuid",
    () => $fetch(`${runtimeConfig.public.api_url}/api/station/${uuid}`)
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

const getUrl = (
  latitude: number | null = null,
  longitude: number | null = null,
  radius: number | null = null,
  type: string | null = null,
  serviceUuids: string[] = [],
  departmentUuids: string[] = []
) => {
  const runtimeConfig = useRuntimeConfig();
  let url = `${runtimeConfig.public.api_url}/api/stations/map?latitude=${latitude}&longitude=${longitude}&radius=${radius}&type=${type}`;

  if (serviceUuids.length > 0) {
    if (serviceUuids.length === 1) {
      url += `&service[]=${serviceUuids[0]}`;
    } else {
      url += `&service=${serviceUuids.join(",")}`;
    }
  }

  if (departmentUuids.length > 0) {
    if (departmentUuids.length === 1) {
      url += `&department[]=${departmentUuids[0]}`;
    } else {
      url += `&department=${departmentUuids.join(",")}`;
    }
  }

  return url;
};
