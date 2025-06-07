import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Privacy <span className="text-orange-500">Policy</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Last updated March 26, 2025
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
                <p className="text-gray-700 mb-0">
                  This Privacy Notice for{" "}
                  <strong>LausanneGo Association</strong> describes how and why
                  we might access, collect, store, use, and/or share your
                  personal information when you use our services, including when
                  you download and use our mobile application (LausanneGo), or
                  engage with us in other related ways.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Summary of Key Points
              </h2>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    What personal information do we process?
                  </h3>
                  <p className="text-gray-700">
                    When you visit, use, or navigate our Services, we may
                    process personal information depending on how you interact
                    with us and the Services, the choices you make, and the
                    products and features you use.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Do we process any sensitive personal information?
                  </h3>
                  <p className="text-gray-700">
                    We do not process sensitive personal information.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Do we collect any information from third parties?
                  </h3>
                  <p className="text-gray-700">
                    We do not collect any information from third parties.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    How do we process your information?
                  </h3>
                  <p className="text-gray-700">
                    We process your information to provide, improve, and
                    administer our Services, communicate with you, for security
                    and fraud prevention, and to comply with law.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                What Information Do We Collect?
              </h2>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Personal Information Provided by You
              </h3>
              <p className="text-gray-700 mb-4">
                We collect personal information that you voluntarily provide to
                us when you register on the Services, express an interest in
                obtaining information about us or our products and Services,
                when you participate in activities on the Services, or otherwise
                when you contact us.
              </p>

              <p className="text-gray-700 mb-4">
                The personal information that we collect depends on the context
                of your interactions with us and the Services, the choices you
                make, and the products and features you use. The personal
                information we collect may include the following:
              </p>

              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Names</li>
                <li>Email addresses</li>
                <li>Usernames</li>
                <li>Passwords</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Application Data
              </h3>
              <p className="text-gray-700 mb-4">
                If you use our application(s), we also may collect the following
                information if you choose to provide us with access or
                permission:
              </p>

              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>
                  <strong>Geolocation Information:</strong> We may request
                  access or permission to track location-based information from
                  your mobile device to provide certain location-based services.
                </li>
                <li>
                  <strong>Mobile Device Access:</strong> We may request access
                  or permission to certain features from your mobile device,
                  including your camera, sensors, and storage.
                </li>
                <li>
                  <strong>Mobile Device Data:</strong> We automatically collect
                  device information such as your mobile device ID, model,
                  manufacturer, operating system, and IP address.
                </li>
                <li>
                  <strong>Push Notifications:</strong> We may request to send
                  you push notifications regarding your account or certain
                  features of the application(s).
                </li>
              </ul>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                How Do We Keep Your Information Safe?
              </h2>
              <p className="text-gray-700 mb-6">
                We aim to protect your personal information through a system of
                organizational and technical security measures. However, despite
                our safeguards and efforts to secure your information, no
                electronic transmission over the Internet or information storage
                technology can be guaranteed to be 100% secure.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                What Are Your Privacy Rights?
              </h2>
              <p className="text-gray-700 mb-6">
                In some regions, such as the European Economic Area (EEA),
                United Kingdom (UK), and Switzerland, you have rights that allow
                you greater access to and control over your personal
                information. You may review, change, or terminate your account
                at any time.
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">
                Contact Us
              </h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have questions or comments about this notice, you may
                  email us at:
                </p>
                <p className="text-gray-900 font-semibold mb-2">
                  contact@lausannego.ch
                </p>
                <p className="text-gray-700">
                  Or contact us by post at:
                  <br />
                  LausanneGo Association
                  <br />
                  Chemin des Triaudes 4B/322
                  <br />
                  Ecublens, Vaud 1024
                  <br />
                  Switzerland
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
