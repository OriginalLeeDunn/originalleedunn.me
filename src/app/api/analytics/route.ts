import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // In a real app, you would send this to your analytics service
    console.log("Analytics event:", body);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error handling analytics event:", error);
    return NextResponse.json(
      { error: "Error processing analytics event" },
      { status: 500 },
    );
  }
}
