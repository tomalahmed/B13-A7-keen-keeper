import { NextResponse } from "next/server";

import friends from "@/Data/friends.json";

export async function GET() {
  return NextResponse.json(friends, {
    headers: { "Cache-Control": "no-store" },
  });
}
