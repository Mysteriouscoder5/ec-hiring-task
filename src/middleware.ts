import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let token = request.cookies.get("token");
  if (!request.cookies.has("token"))
    return NextResponse.redirect(new URL("/registration", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
