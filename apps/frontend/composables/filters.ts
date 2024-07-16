import type { IType } from "@energy_map/models/IType";
import type { Department, Service } from "~/types/filters";

export const handleGetTypes = async (): Promise<{
  status: boolean;
  message: string | null;
  data: globalThis.Ref<IType[] | null> | null;
}> => {
  const runtimeConfig = useRuntimeConfig();

  const { data, status } = await useAsyncData<IType[]>("GetTypes", () =>
    $fetch(`${runtimeConfig.public.api_url}/api/types`)
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

export const handleGetServices = async (): Promise<{
  status: boolean;
  message: string | null;
  data: globalThis.Ref<Service[] | null> | null;
}> => {
  const runtimeConfig = useRuntimeConfig();

  const { data, status } = await useAsyncData<Service[]>("GetServices", () =>
    $fetch(`${runtimeConfig.public.api_url}/api/services`)
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

export const handleGetDepartments = async (): Promise<{
  status: boolean;
  message: string | null;
  data: globalThis.Ref<Department[] | null> | null;
}> => {
  const runtimeConfig = useRuntimeConfig();

  const { data, status } = await useAsyncData<Department[]>(
    "GetDepartments",
    () => $fetch(`${runtimeConfig.public.api_url}/api/departments`)
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
