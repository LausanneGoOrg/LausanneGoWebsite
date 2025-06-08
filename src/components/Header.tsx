import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full mt-[27px] px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-[15px]">
          <Image
            src="/logo.png"
            alt="LausanneGo Logo"
            width={58}
            height={58}
            className="w-[58px] h-[58px]"
          />
          <span className="text-[36px] font-semibold text-[#ff2d2d] tracking-[-0.05em]">
            Lausanne Go
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-[50px]">
          <Link
            href="/#concept"
            className="text-[#ff2d2d] text-2xl font-medium hover:opacity-80 transition-opacity"
          >
            Concept
          </Link>
          <Link
            href="/team"
            className="text-[#ff2d2d] text-2xl font-medium hover:opacity-80 transition-opacity"
          >
            The Team
          </Link>
          <Link
            href="/contact"
            className="text-[#ff2d2d] text-2xl font-medium hover:opacity-80 transition-opacity"
          >
            Contact
          </Link>
          <Link
            href="/business/login"
            className="text-[#3f779d] text-2xl font-medium hover:opacity-80 transition-opacity"
          >
            Entreprises
          </Link>
          <Link
            href="#download"
            className="bg-[#ff2d2d] text-white px-[15px] py-[6px] rounded-lg hover:bg-[#e02525] transition-colors text-2xl font-light cursor-pointer"
          >
            Download Now
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-[#ff2d2d] hover:opacity-80">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
