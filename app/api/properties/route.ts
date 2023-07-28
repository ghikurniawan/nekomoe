import { NextResponse } from "next/server";
const cheerio = require('cheerio')
import siteConfig from "@/lib/siteConfig";
const baseURL = siteConfig.scraptUrl

export const runtime = "edge";

export async function GET(req: Request) {
  const params = new URL(req.url)
  const genre_type = params.searchParams.get('genre_type')
  const page = params.searchParams.get('page')
  try {
    const rawResponse = await fetch(`${baseURL}/properties/genre?genre_type=${genre_type || "all"}&page=${page || 1}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept-Language": "en-US,en;q=0.9",
      }
    })
    const html = await rawResponse.text()
    const $ = cheerio.load(html);

    const element = $("#animeList > div > div > ul > li");
    let datas: { genreName: any; genreId: any; }[] = [];

    element.each((i: any, e: any) =>
      datas.push({
        genreName: $(e).find(" a > span").text(),
        genreId: $(e)
          .find(" a > span")
          .text()
          .toLowerCase()
          .replace(/\s+/g, "-"),
      })
    );

    datas.pop()

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      properties: genre_type || "All",
      data: datas,
    })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Terjadi kesalahan saat mengambil data." })
  }
}