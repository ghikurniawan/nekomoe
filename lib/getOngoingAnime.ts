import { getBaseUrl } from "./getBaseUrl";

export const getOngoingAnime = async (page: string | number = 1) => {
  const populars = await fetch(`${getBaseUrl()}/api/ongoing?page=${page}`, {
    headers: { "content-type": "aplication/json" },
  });
  const json = populars.json();
  return json;
};