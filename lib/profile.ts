import { gateProfiles, ProfileKey } from "@/data/content";

// The chosen profile lives in a cookie so middleware can route
// returning visitors on the server (no gate flash, no client-side
// redirect). localStorage is kept in sync because WorkNav's back link
// and pre-cookie visitors still read it.
export const PROFILE_COOKIE = "profile";

const validKeys = new Set<string>(gateProfiles.map((p) => p.key));

export function readProfileCookie(): ProfileKey | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)profile=([^;]+)/);
  const value = match?.[1];
  return value && validKeys.has(value) ? (value as ProfileKey) : null;
}

export function rememberProfile(key: ProfileKey) {
  try {
    document.cookie = `${PROFILE_COOKIE}=${key}; path=/; max-age=31536000; samesite=lax`;
  } catch {}
  try {
    localStorage.setItem("profile", key);
  } catch {}
}

// Clears the stored profile and hard-navigates to "/", so the gate
// overlay reappears even when we're already on "/" (a client-side push
// to the same route would not remount it).
export function exitToGate() {
  try {
    document.cookie = `${PROFILE_COOKIE}=; path=/; max-age=0`;
  } catch {}
  try {
    localStorage.removeItem("profile");
  } catch {}
  window.location.assign("/");
}
