import { accents, gateProfiles, moreWork, profile } from "@/data/content";

// Data-integrity guards for the single source of truth. These catch the
// class of bug where a profile is added to one structure but not the
// others, or a roster entry ships without the fields the UI reads.
describe("content data model", () => {
  it("has an accent colour for every gate profile", () => {
    for (const p of gateProfiles) {
      expect(accents[p.key]).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  });

  it("has unique profile keys", () => {
    const keys = gateProfiles.map((p) => p.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("exposes real contact + code links", () => {
    expect(profile.email).toContain("@");
    expect(profile.linkedin).toMatch(/^https:\/\//);
    expect(profile.github).toMatch(/^https:\/\/github\.com\//);
  });

  it("gives every roster entry the fields the UI renders", () => {
    for (const item of moreWork) {
      expect(item.title).toBeTruthy();
      expect(item.role).toBeTruthy();
      expect(item.status).toBeTruthy();
      expect(item.descriptor).toBeTruthy();
    }
  });
});
