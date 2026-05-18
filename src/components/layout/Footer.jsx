import React from "react";

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 bg-neutral text-neutral-content px-4 py-3">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">

        {/* Left: Copyright */}
        <aside>
          <p className="text-sm">
            © {new Date().getFullYear()} dumBle. All rights reserved.
          </p>
        </aside>

        {/* Center: Contact */}
        <div className="text-sm">
          <span className="opacity-70">Contact:</span>{" "}
          <a
            href="mailto:dumble.app@gmail.com"
            className="underline hover:text-primary"
          >
            dumble.app@gmail.com
          </a>
        </div>

        <div className="flex flex-wrap gap-3 text-sm justify-center">
  <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
  <a href="/terms-and-conditions" className="hover:underline">Terms</a>
  <a href="/refund-policy" className="hover:underline">Cancellation & Refund</a>
  <a href="/shipping-policy" className="hover:underline">Shipping</a>
</div>


        {/* Right: Social icons */}
        <nav className="flex gap-4">
          <a aria-label="Twitter">
            {/* Twitter SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775..." />
            </svg>
          </a>

          <a aria-label="YouTube">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246..." />
            </svg>
          </a>

          <a aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12..." />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
