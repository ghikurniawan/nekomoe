import { NextResponse } from "next/server";
const cheerio = require('cheerio')
const baseURL = "https://kuramanime.xyz"

export const runtime = "edge";

export async function GET(req: Request, { params }: { params: { anime: string[] } }) {
  const animeId = `${params.anime[0]}/${params.anime[1]}/${params.anime[2]}/${params.anime[3]}/${params.anime[4]}`
  try {
    const rawResponse = await fetch(`${baseURL}/${animeId}?activate_stream=1`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept-Language": "en-US,en;q=0.9",
      }
    })
    const html = await rawResponse.text()
    const $ = cheerio.load(html);
    let datas: { episodeText: any; episodeId: any; }[] = [];
    let videoSource: { episode: any; type: any; size: any; }[] = []; // Undefined or empty

    if (params.anime[2] === "one-piece") {
      $("#player")
        .find("source")
        .each((i: any, el: any) => {
          videoSource.push({
            episode: $(el).attr("src"),
            type: $(el).attr("type"),
            size: $(el).attr("size"),
          });
        });

      $("#animeEpisodes > a").each((i: any, el: any) => {
        datas.push({
          episodeText: $(el).text().replace(/\s+/g, " ").trim(),
          episodeId: $(el).attr("href")
            ? $(el)
              .attr("href")
              .replace(`${baseURL}`, "")
            : "",
        });
      });
      return NextResponse.json({
        status: "success",
        data: datas,
        episode: params.anime[4],
        episodeUrl: videoSource,
      })
    }

    $("#player")
      .find("source")
      .each((i: any, el: any) => {
        videoSource.push({
          episode: $(el).attr("src"),
          type: $(el).attr("type"),
          size: $(el).attr("size"),
        });
      });

    $("#animeEpisodes > a").each((i: any, el: any) => {
      datas.push({
        episodeText: $(el).text().replace(/\s+/g, " ").trim(),
        episodeId: $(el).attr("href")
          ? $(el)
            .attr("href")
            .replace(`${baseURL}`, "")
          : "",
      });
    });

    return NextResponse.json({
      status: "success",
      data: datas,
      episode: params.anime[4],
      episodeUrl: videoSource,
    });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Terjadi kesalahan saat mengambil data." })
  }
}