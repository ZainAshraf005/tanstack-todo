// lib/errorHandler.ts
import { NextResponse } from "next/server";

export function handleError(error: unknown, status = 500) {
  console.error("❌ API Error:", error);

  return NextResponse.json(
    {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
    },
    { status }
  );
}
