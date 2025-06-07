import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f2f2f2] font-['Poppins'] max-w-[1400px] mx-auto">
      <Header />

      <main className="flex-1">
        {/* Landing Section */}
        <section className="mt-[100px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center gap-5 lg:flex-nowrap">
            {/* Landing Text */}
            <div className="flex-1 min-w-[300px] text-left space-y-6">
              <h1 className="text-[50px] leading-[50px] font-semibold text-[#ff2d2d] m-0">
                Discover <span className="text-[#3f779d]">Lausanne</span> like
                never before.
              </h1>

              <div className="flex items-center gap-4">
                <Image
                  src="/mouse.svg"
                  alt="Mouse icon"
                  width={20}
                  height={20}
                />
                <p className="text-xl font-light m-0">
                  Scroll to see more sections
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfrBl7AieZnL4TXiqIBGT_R2KBbjw-8bdt9aKqJCD2b76GZzg/viewform?usp=dialog"
                  className="bg-[#ff2d2d] text-white px-[15px] py-[6px] rounded-lg hover:bg-[#e02525] transition-colors text-2xl font-light cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register Now
                </Link>
                <Link
                  href="#concept"
                  className="bg-[#3f779d] text-white px-[15px] py-[6px] rounded-lg hover:bg-[#356a87] transition-colors text-2xl font-light cursor-pointer"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Landing Image */}
            <div className="flex-1 min-w-[300px] flex justify-center">
              <Image
                src="/app.png"
                alt="CultureQuest App"
                width={400}
                height={600}
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Concept Section */}
        <section
          id="concept"
          className="mt-[100px] w-full px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col items-center">
            {/* Concept Title */}
            <div className="mb-[60px] flex justify-center">
              <Image
                src="/Title Concept.svg"
                alt="The Concept"
                width={400}
                height={100}
                className="select-none"
              />
            </div>

            {/* Concept Features - Utiliser flex-wrap pour un meilleur layout */}
            <div className="w-full flex flex-wrap justify-center gap-10">
              {/* Feature 1 - Activities */}
              <div className="w-[370px] h-[459px] bg-white shadow-[5px_5px_16px_rgba(0,0,0,0.15)] rounded-[25px] flex flex-col justify-center items-center py-5 px-2 gap-3">
                <div className="flex-[3] flex justify-center items-center mt-2.5 mb-2.5">
                  <Image
                    src="/Activities.png"
                    alt="Activities"
                    width={120}
                    height={90}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="flex-1 w-[80%] flex flex-col justify-start items-center text-center">
                  <h5 className="font-semibold text-[28px] text-center mb-5 m-0 leading-tight">
                    Discover fun activities
                  </h5>
                  <p className="text-xl font-light text-justify m-0"></p>
                </div>
              </div>

              {/* Feature 2 - Events */}
              <div className="w-[370px] h-[459px] bg-white shadow-[5px_5px_16px_rgba(0,0,0,0.15)] rounded-[25px] flex flex-col justify-center items-center py-5 px-2 gap-3">
                <div className="flex-[3] flex justify-center items-center mt-2.5 mb-2.5">
                  <Image
                    src="/Events.png"
                    alt="Events"
                    width={120}
                    height={90}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="flex-1 w-[80%] flex flex-col justify-start items-center text-center">
                  <h5 className="font-semibold text-[28px] text-center mb-5 m-0 leading-tight">
                    Know all the upcoming events
                  </h5>
                  <p className="text-xl font-light text-justify m-0"></p>
                </div>
              </div>

              {/* Feature 3 - Offers */}
              <div className="w-[370px] h-[459px] bg-white shadow-[5px_5px_16px_rgba(0,0,0,0.15)] rounded-[25px] flex flex-col justify-center items-center py-5 px-2 gap-3">
                <div className="flex-[3] flex justify-center items-center mt-2.5 mb-2.5">
                  <Image
                    src="/Offers.png"
                    alt="Offers"
                    width={120}
                    height={90}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="flex-1 w-[80%] flex flex-col justify-start items-center text-center">
                  <h5 className="font-semibold text-[28px] text-center mb-5 m-0 leading-tight">
                    Benefit from exclusive offers
                  </h5>
                  <p className="text-xl font-light text-justify m-0"></p>
                </div>
              </div>

              {/* Feature 4 - Collection */}
              <div className="w-[370px] h-[459px] bg-white shadow-[5px_5px_16px_rgba(0,0,0,0.15)] rounded-[25px] flex flex-col justify-center items-center py-5 px-2 gap-3">
                <div className="flex-[3] flex justify-center items-center mt-2.5 mb-2.5">
                  <Image
                    src="/Collection.png"
                    alt="Collection"
                    width={120}
                    height={90}
                    className="h-full w-auto object-contain"
                  />
                </div>
                <div className="flex-1 w-[80%] flex flex-col justify-start items-center text-center">
                  <h5 className="font-semibold text-[28px] text-center mb-5 m-0 leading-tight">
                    Collect the landmarks you visit
                  </h5>
                  <p className="text-xl font-light text-justify m-0"></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section
          id="download"
          className="mt-[100px] w-full flex flex-col items-center px-4 sm:px-6 lg:px-8"
        >
          {/* Download Header */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-center mb-[200px]">
            <div className="flex flex-col justify-center items-start">
              <h1 className="text-[50px] leading-[50px] font-semibold text-[#ff2d2d] m-0 mb-2.5">
                Start your journey now
              </h1>
              <h5 className="text-2xl font-light m-0">
                Download our app through those options:
              </h5>
            </div>
            <Image
              src="/logo.png"
              alt="LausanneGo Logo"
              width={119}
              height={119}
              className="w-[119px] h-[119px]"
            />
          </div>

          {/* Download Options */}
          <div className="w-[90%] flex flex-col sm:flex-row justify-between items-center gap-6 mb-[200px]">
            <div className="w-[252px] h-[75px] bg-[#ff2d2d] text-white rounded-[15px] text-[27px] font-medium flex justify-center items-center opacity-30 cursor-not-allowed">
              APK Download
            </div>
            <div className="opacity-30">
              <Image
                src="/v522_1433.png"
                alt="Google Play Store"
                width={252}
                height={75}
                className="w-[252px] h-[75px] object-cover"
              />
            </div>
            <div className="opacity-30">
              <Image
                src="/v522_1431.png"
                alt="App Store"
                width={252}
                height={75}
                className="w-[252px] h-[75px] object-cover"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
