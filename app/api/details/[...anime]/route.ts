import { NextResponse } from "next/server";
const cheerio = require('cheerio')
import siteConfig from "@/lib/siteConfig";
const baseURL = siteConfig.scraptUrl

export const runtime = "edge";

export async function GET(req: Request, { params }: { params: { anime: string[] } }) {
  const animeId = `${params.anime[0]}/${params.anime[1]}/${params.anime[2]}`
  try {
    const rawResponse = await fetch(`${baseURL}/${animeId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 60 * 60 }
    })
    const html = await rawResponse.text()
    const $ = cheerio.load(html);

    const element = $(
      "body > section > div > div.anime__details__content > div"
    );
    let datas: {
      type: any; title: any; englishTitle: any; synopsis: any; status: any; image: any; ratings: any; animeQuality: any;
      // comment: $(e)
      //   .find(
      //     "div.col-lg-3 > div > div.view-end > ul > li:nth-child(1) > span"
      //   )
      //   .text(),
      // viewed: viewer,
      totalEps: any; aired: any; season: any; duration: any; country: any; adaptation: any; genres: any; explisit: any; demografis: any; theme: any; skors: any; studio: any; peminat: any; ratingText: any; credit: any; episode: { episodeId: any; epsTitle: any; }[];
    }[] = [];

    let episode = $("#episodeLists").attr("data-content");
    const $$ = cheerio.load(episode);

    let episodeArray: { episodeId: any; epsTitle: any; }[] = [];
    $$("a").each((i: any, e: any) => {
      const eps = $(e)
        .attr("href")
        .trim()
        .replace(`${baseURL}`, "");
      const epsTitle = $(e).text().replace(/\s+/g, " ");
      episodeArray.push({
        episodeId: eps,
        epsTitle: epsTitle,
      });
    });

    element.each((i: any, e: any) =>
      datas.push({
        type: $(e)
          .find(
            " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(1) > a"
          )
          .text(),
        title: $(e)
          .find(" div.col-lg-9 > div > div.anime__details__title > h3")
          .text(),
        englishTitle: $(e)
          .find("div.col-lg-9 > div > div.anime__details__title > span")
          .text(),
        synopsis: $(e).find("#synopsisField").text(),
        status: $(e)
          .find(
            " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(3) > a"
          )
          .text(),
        image: $(e).find(" div.col-lg-3 > div").attr("data-setbg"),
        ratings: $(e)
          .find(" div.col-lg-3 > div > div.ep")
          .text()
          .replace(/\s+/g, " "),
        animeQuality: $(e).find(" div.col-lg-3 > div > div.ep-v2").text(),
        // comment: $(e)
        //   .find(
        //     "div.col-lg-3 > div > div.view-end > ul > li:nth-child(1) > span"
        //   )
        //   .text(),
        // viewed: viewer,

        totalEps: $(e)
          .find(
            "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(2) > a"
          )
          .text(),
        aired: $(e)
          .find(
            "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul"
          )
          .text()
          .match(/\d{1,2}\s+\w+\s+\d{4}\s+s\/d\s+/)
          ? $(e)
            .find(
              "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul"
            )
            .text()
            .match(/\d{1,2}\s+\w+\s+\d{4}\s+s\/d\s+/)[0]
            .trim()
          : "?",
        season: $(e)
          .find(
            " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(5) > a"
          )
          .text(),
        duration: $(e)
          .find(
            " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(6) > a"
          )
          .text(),
        country: $(e)
          .find(
            " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(8) > a"
          )
          .text(),
        adaptation: $(e)
          .find(
            " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(9) > a"
          )
          .text(),
        genres: $(e)
          .find(
            "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(1) > a"
          )
          .text()
          .split(",\n")
          .map((genre: string) => genre.trim()),
        explisit: $(e)
          .find(
            " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(2) > a"
          )
          .text(),
        demografis: $(e)
          .find(
            "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(3) > a"
          )
          .text()
          // eslint-disable-next-line no-constant-condition
          .replace(/\s+/g, "" ? "?" : ""),
        theme: $(e)
          .find(
            " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(4) > a"
          )
          .text()
          .replace(/\s+/g, " "),
        skors: $(e)
          .find(
            " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(6) > a"
          )
          .text(),
        studio: $(e)
          .find(
            "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(5) > a"
          )
          .text()
          .replace(/\s+/g, " "),
        peminat: $(e)
          .find(
            "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(7) > a"
          )
          .text()
          .replace(/\s+/g, " "),
        ratingText: $(e)
          .find(
            "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(8) > a"
          )
          .text()
          .replace(/\s+/g, " "),
        credit: $(e)
          .find(
            "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(9) > a"
          )
          .text()
          .replace(/\s+/g, " "),
        episode: episodeArray,
        // ratings: $(e).find(" a > div > div.ep > span").text(),
      })
    );

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      data: datas,
    })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Terjadi kesalahan saat mengambil data." })
  }
}