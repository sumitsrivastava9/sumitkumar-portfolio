import GateOverlay from "@/components/GateOverlay";
import ManagerView from "@/components/ManagerView";

// "/" used to be only the gate, so the site's most-linked URL had no
// indexable work content (its h1 was "who's visiting?"). It now serves
// the full manager view — crawlers, link previews and no-JS visitors
// read the real thing — with the gate as a full-screen overlay for
// first-time visitors. Returning visitors never land here: middleware
// redirects them to their remembered profile.
export default function HomePage() {
  return (
    <>
      {/* Without JS the overlay could never be dismissed; hide it so a
          no-JS visitor reads the manager view directly. */}
      <noscript>
        <style>{`#gate-overlay { display: none; }`}</style>
      </noscript>
      <GateOverlay />
      <ManagerView />
    </>
  );
}
