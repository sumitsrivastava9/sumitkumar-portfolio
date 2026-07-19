import { NextResponse, type NextRequest } from "next/server";
import { gateProfiles } from "@/data/content";

// Returning visitors chose a profile before (cookie set by the gate
// overlay / nav switcher). Route them server-side so they never see the
// gate again and there is no client-redirect flash. First-time visitors
// and crawlers fall through to "/", which carries the full manager view
// behind the gate overlay.
//
// The cookie value is validated against the known profile keys so it
// can never steer the redirect anywhere else.
const profiles = new Set<string>(gateProfiles.map((p) => p.key));

export function middleware(request: NextRequest) {
  const profile = request.cookies.get("profile")?.value;
  if (profile && profiles.has(profile)) {
    return NextResponse.redirect(new URL(`/${profile}`, request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: "/" };
