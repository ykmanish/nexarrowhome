import Footer from "./Footer";
import Header from "./Header";
import MotionRoot from "./MotionRoot";

/**
 * One full-width paper surface holding the header, the page and the footer.
 * Bands run edge to edge; the `gutter` utility keeps their content centred.
 */
export default function SiteShell({ children }) {
  return (
    <div id="top" className="w-full">
      <div className="relative overflow-clip bg-paper">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <MotionRoot />
    </div>
  );
}
