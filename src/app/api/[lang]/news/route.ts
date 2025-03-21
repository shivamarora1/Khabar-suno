import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ lang: string }> }
) {
  const lang = (await params).lang;

  const category = req.nextUrl.searchParams.get("category");
  const maxLimit = req.nextUrl.searchParams.get("max_limit");
  const includeCardData = req.nextUrl.searchParams.get("include_card_data");
  const newsOffset = req.nextUrl.searchParams.get("news_offset");
  
  const url = `https://inshorts.com/api/${lang}/news?category=${category}&max_limit=${maxLimit}&include_card_data=${includeCardData}&news_offset=${newsOffset}`;
  
  const resp = await fetch(url);
  const data = await resp.json();
  console.log(data);
  
  return NextResponse.json(data);
}
