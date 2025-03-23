import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ category: string; lang: string }> }
) {
  try {
    const category = (await params).category;
    const lang = (await params).lang;

    const page = req.nextUrl.searchParams.get("page");
    const type = req.nextUrl.searchParams.get("type");

    const url = `https://inshorts.com/api/${lang}/search/trending_topics/${category}?page=${page}&type=${type}`;

    const resp = await fetch(url);
    const data = await resp.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("error in getting news");
    throw err;
  }
}
