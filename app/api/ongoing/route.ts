import { NextResponse } from "next/server";
const cheerio = require('cheerio')
import siteConfig from "@/lib/siteConfig";
const baseURL = siteConfig.scraptUrl

export const runtime = "edge";

export async function GET(req: Request) {
  const params = new URL(req.url)
  const order_by = params.searchParams.get('order_by')
  const page = params.searchParams.get('page')
  try {
    const rawResponse = await fetch(`${baseURL}/anime/ongoing?order_by=${order_by || "updated"}&page=${page || 1}`, { next: { revalidate: 60 * 60 } })
    const html = await rawResponse.text()
    const $ = cheerio.load(html);
    const element = $("#animeList > div > div");
    let datas: { title: any; animeId: any; image: any; episode: any; }[] = [];

    element.each((i: any, e: any) =>
      datas.push({
        title: $(e).find("div > h5 > a").text(),
        animeId: $(e).find("div > h5 > a").attr("href")
          ? $(e)
            .find("div > h5 > a")
            .attr("href")
            .replace(`${baseURL}`, "")
          : "",
        image: $(e).find("a > div").attr("data-setbg"),
        episode: $(e)
          .find(" a > div > div.ep > span")
          .text()
          .replace(/\s+/g, " ")
          .trim(),
      })
    );

    datas.pop()

    return NextResponse.json({
      status: "success",
      statusCode: 200,
      page: page || 1,
      order_by: order_by || "updated",
      data: datas,
    })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Terjadi kesalahan saat mengambil data." })
  }
}