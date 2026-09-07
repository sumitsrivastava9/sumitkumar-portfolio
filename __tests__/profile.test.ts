import { readProfileCookie, PROFILE_COOKIE } from "@/lib/profile";

// readProfileCookie is the one piece of routing logic that runs on both
// the client and (via middleware's own copy of the rule) the server, so
// it is worth pinning down: it must only ever return a known profile key.
describe("readProfileCookie", () => {
  afterEach(() => {
    // Clear any cookie set during a test.
    document.cookie = `${PROFILE_COOKIE}=; path=/; max-age=0`;
  });

  it("returns null when no profile cookie is set", () => {
    expect(readProfileCookie()).toBeNull();
  });

  it("returns the stored key for a valid profile", () => {
    document.cookie = `${PROFILE_COOKIE}=recruiter; path=/`;
    expect(readProfileCookie()).toBe("recruiter");
  });

  it("rejects an unknown value rather than trusting the cookie", () => {
    document.cookie = `${PROFILE_COOKIE}=hacker; path=/`;
    expect(readProfileCookie()).toBeNull();
  });
});
