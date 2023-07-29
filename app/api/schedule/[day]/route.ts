import { NextResponse } from "next/server";
const cheerio = require('cheerio')
import siteConfig from "@/lib/siteConfig";
const baseURL = siteConfig.scraptUrl

export const runtime = "edge";

export async function GET(req: Request, { params }: { params: { day: string } }) {
  const scheduled_day = params.day
  const url = new URL(req.url)
  const page = url.searchParams.get('page')
  try {
    const rawResponse = await fetch(`${baseURL}/schedule?scheduled_day=${scheduled_day || "all"}&page=${page || 1}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept-Language": "en-US,en;q=0.9",
      },
      next: { revalidate: 60 }
    })
    const html = await rawResponse.text()
    const $ = cheerio.load(html);

    const element = $("#animeList > div > div");
    let datas: { title: any; image: any; animeId: any; days: any; timeRelease: any; episode: any; typeList: { type1: any; type2: any; }; }[] = [];

    element.each((i: any, e: any) =>
      datas.push({
        title: $(e).find("div > h5 > a").text(),
        image: $(e).find(" a > div").attr("data-setbg"),

        animeId: $(e).find("div > h5 > a").attr("href")
          ? $(e)
            .find("div > h5 > a")
            .attr("href")
            .replace(`${baseURL}`, "")
          : "",
        days: $(e)
          .find("a > div > div.view-end > ul > li:nth-child(1) > span")
          .text()
          .replace(/\s+/g, " "),
        timeRelease: $(e)
          .find("a > div > div.view-end > ul > li:nth-child(2) > span")
          .text()
          .replace(/\s+/g, " "),
        episode: $(e)
          .find("  a > div > div.ep > span:nth-child(2)")
          .text()
          .replace(/Ep\s*\n\s*/, "Ep ")
          .trim(),
        typeList: {
          type1: $(e).find(" div > div > ul > a:first-child").text(),
          type2: $(e).find(" div > div > ul > a:last-child").text(),
        },
      })
    );

    datas.pop()

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      page: page || "1",
      scheduled_day: scheduled_day || "all",
      data: datas,
    })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Terjadi kesalahan saat mengambil data." })
  }
}