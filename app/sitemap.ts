import { getOngoingAnime } from "@/lib/getOngoingAnime";

export default async function sitemap() {

  const ongoing = [1, 2, 3, 4, 5, 6, 7].map((page) => ({
    url: process.env.BASE_URL + '/ongoing?pages=' + page,
    lastModified: new Date().toISOString().split('T')[0],
  }));


  let o: any[] = [];
  async function fetchData() {
    await Promise.all(
      [1, 2, 3, 4, 5, 6, 7].map(async (p) => {
        const a = await getOngoingAnime(p);
        a?.data?.map((d: { animeId: string }) => {
          o.push({
            url: new URL(process.env.BASE_URL + "/watch" + d.animeId).href,
            lastModified: new Date().toISOString().split("T")[0],
          });
        });
      })
    );
    return o;
  }

  const watchs = await fetchData();

  let f: any[] = [];
  async function fetchFinished() {
    await Promise.all(
      [1, 2, 3, 4, 5, 6, 7].map(async (p) => {
        const a = await getOngoingAnime(p);
        a?.data?.map((d: { animeId: string }) => {
          f.push({
            url: new URL(process.env.BASE_URL + "/details" + d.animeId).href,
            lastModified: new Date().toISOString().split("T")[0],
          });
        });
      })
    );
    return f;
  }

  const finished = await fetchFinished();

  const routes = ['', '/ongoing', '/properties', '/finished'].map(
    (route) => ({
      url: process.env.BASE_URL + route,
      lastModified: new Date().toISOString().split('T')[0],
    })
  );

  return [...routes, ...ongoing, ...watchs, ...finished];
}