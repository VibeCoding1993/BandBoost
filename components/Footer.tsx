import Link from "next/link";
import { disclaimer, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="logo">
              <span className="logo-mark" aria-hidden>
                B
              </span>
              <span>
                Band<b>Boost</b>
              </span>
            </p>
            <p className="muted">{site.tagline}. Free for every learner, everywhere.</p>
          </div>
          <div>
            <h4>Learn</h4>
            <ul>
              <li><Link href="/lessons/">All lessons</Link></li>
              <li><Link href="/lessons/#writing">Writing</Link></li>
              <li><Link href="/lessons/#speaking">Speaking</Link></li>
              <li><Link href="/practice/">Practice tests</Link></li>
            </ul>
          </div>
          <div>
            <h4>Tools</h4>
            <ul>
              <li><Link href="/tools/band-score-calculator/">Band score calculator</Link></li>
              <li><Link href="/tools/writing-practice/">Writing timer</Link></li>
              <li><Link href="/tools/vocabulary/">Vocabulary flashcards</Link></li>
              <li><Link href="/ai-feedback/">AI feedback</Link></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><Link href="/about/">About us</Link></li>
              <li><Link href="/contact/">Contact</Link></li>
              <li><Link href="/privacy/">Privacy policy</Link></li>
              <li><Link href="/terms/">Terms of use</Link></li>
            </ul>
          </div>
        </div>
        <p className="disclaimer">
          {disclaimer} © {new Date().getFullYear()} {site.name}.
        </p>
      </div>
    </footer>
  );
}
