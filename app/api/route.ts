import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { city } = await request.json();

  const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(
    city
  )}&days=0`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPID_API_KEY as string,
      "x-rapidapi-host": process.env.RAPID_API_HOST as string,
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      return new NextResponse(JSON.stringify({ error: "City not found" }), {
        status: 404,
      });
    }

    const data = await response.json();

    return new NextResponse(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Something went wrong, please try again later" }),
      { status: 500 }
    );
  }
}
