import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col justify-center items-center mt-[30px] pb-10">
      {/* Divider */}
      <div className="w-full h-[3px] bg-[#e3e3e3] rounded-[10px]"></div>

      {/* Footer Actions */}
      <div className="w-[80%] flex flex-row justify-between items-center mt-5">
        <h5 className="text-2xl font-light m-0">
          <Link href="/terms-conditions" className="text-inherit">
            Terms & Conditions
          </Link>
        </h5>
        <h5 className="text-2xl font-light m-0">
          <Link href="/privacy" className="text-inherit">
            Privacy Policy
          </Link>
        </h5>
        <h5 className="text-2xl font-light m-0 cursor-pointer">
          Cookie Settings
        </h5>
      </div>

      {/* Footer Text */}
      <p className="text-xl font-light mt-4">
        © 2025 LausanneGo. All rights reserved.
      </p>
    </footer>
  );
}
