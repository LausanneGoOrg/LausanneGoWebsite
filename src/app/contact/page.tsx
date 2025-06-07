import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center w-full max-w-[1400px] mx-auto overflow-x-hidden bg-[#f2f2f2]">
      <Header />

      <main className="flex-1 w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="py-8 w-full" style={{ background: "#f2f2f2" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-[50px] leading-[50px] font-semibold text-[#ff2d2d] m-0 font-['Poppins'] mb-6">
              Contact <span className="text-[#3f779d]">Us</span>
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto font-['Poppins'] font-light">
              Have questions about LausanneGo? We'd love to hear from you. Send
              us a message and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-5">
          <div className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-white w-full border border-gray-200 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-semibold text-[#ff2d2d] mb-6 font-['Poppins']">
                    Get in Touch
                  </h2>
                  <p className="text-lg text-black mb-8 font-['Poppins'] font-light">
                    We're here to help and answer any question you might have.
                    We look forward to hearing from you.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-orange-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black font-['Poppins']">
                        Email
                      </h3>
                      <p className="text-[#666] font-['Poppins']">
                        contact@lausannego.ch
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black font-['Poppins']">
                        Address
                      </h3>
                      <p className="text-[#666] font-['Poppins']">
                        Chemin des Triaudes 4B/322
                        <br />
                        Ecublens, Vaud 1024
                        <br />
                        Switzerland
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black font-['Poppins']">
                        University
                      </h3>
                      <p className="text-[#666] font-['Poppins']">
                        EPFL - École Polytechnique Fédérale de Lausanne
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-[#f2f2f2] rounded-xl p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-black mb-2 font-['Poppins']"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff2d2d] focus:border-transparent font-['Poppins']"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-black mb-2 font-['Poppins']"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff2d2d] focus:border-transparent font-['Poppins']"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black mb-2 font-['Poppins']"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff2d2d] focus:border-transparent font-['Poppins']"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-black mb-2 font-['Poppins']"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff2d2d] focus:border-transparent font-['Poppins']"
                      placeholder="What is this about?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-black mb-2 font-['Poppins']"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff2d2d] focus:border-transparent font-['Poppins']"
                      placeholder="Tell us more about your question or feedback..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#ff2d2d] text-white px-6 py-3 rounded-lg hover:bg-[#e02525] transition-colors font-medium font-['Poppins']"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 w-full" style={{ background: "#f2f2f2" }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-semibold text-[#ff2d2d] mb-6 font-['Poppins']">
              Ready to Explore Lausanne?
            </h2>
            <p className="text-lg text-black mb-8 font-['Poppins'] font-light">
              Join our community and start discovering the cultural treasures of
              Lausanne.
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfrBl7AieZnL4TXiqIBGT_R2KBbjw-8bdt9aKqJCD2b76GZzg/viewform?usp=dialog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#ff2d2d] text-white px-8 py-3 rounded-lg hover:bg-[#e02525] transition-colors font-medium font-['Poppins']"
            >
              Register for Early Access
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
