import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

const cache = new LRUCache({
  ttl: 3600000, // 1 hour in milliseconds
  ttlAutopurge: true,
});

export async function GET() {
  // req: NextRequest,
  // { params }: { params: Promise<{ lang: string }> }
  try {
    // const lang = (await params).lang;
    const cacheKey = "audio-response";
    if (cache.has(cacheKey)) {
      console.log("Returning from cache");
      const cachedAudio = cache.get(cacheKey);
      return new NextResponse(cachedAudio as BodyInit, {
        status: 200,
        headers: { "Content-Type": "audio/mpeg" },
      });
    }

    const url =
      "https://inshorts.com/api/en/news?category=top_stories&max_limit=10&include_card_data=true";
    const resp = await fetch(url);
    const apiData = await resp.json();
    const newsContentArr = apiData.data.news_list.map(
      (item: { news_obj: { content: string } }) => item.news_obj.content
    );
    const newsContent = newsContentArr.join("\n");

    const summarizedNews = await summarizeNews(newsContent);

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        input: summarizedNews,
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        instructions: "Speak in a cheerful and positive tone.",
      }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      return NextResponse.json(
        { error: errorResponse },
        { status: response.status }
      );
    }

    // Assuming the API returns the audio as binary data (e.g. MP3).
    const audioBuffer = await response.arrayBuffer();
    cache.set(cacheKey, Buffer.from(audioBuffer));

    return new NextResponse(Buffer.from(audioBuffer), {
      status: 200,
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (err) {
    console.error("error in getting news");
    throw err;
  }
}

async function summarizeNews(content: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  const payload = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Summarize following news. Keep in mind that output will be used as it is for TTS , so don't include any such elements that are not convertible. Start and end conversation with greeting",
      },
      {
        role: "user",
        content: content,
      },
    ],
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error ${response.status}: ${response.statusText}\n${errorText}`
      );
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Failed to fetch chat completion:", error);
    throw error;
  }
}
