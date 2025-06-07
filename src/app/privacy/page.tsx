import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col items-center w-full max-w-[1400px] mx-auto overflow-x-hidden bg-[#f2f2f2]">
      <Header />

      <main className="flex-1 w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="py-8 w-full" style={{ background: "#f2f2f2" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-[50px] leading-[50px] font-semibold text-[#ff2d2d] m-0 font-['Poppins'] mb-6">
              Privacy <span className="text-[#3f779d]">Policy</span>
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto font-['Poppins'] font-light">
              Last updated June 8, 2025
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-5 w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
                <p className="text-gray-700 mb-0 font-['Poppins']">
                  This Privacy Notice for{" "}
                  <strong>LausanneGo Association</strong> ("we," "us," or "our")
                  describes how and why we might access, collect, store, use,
                  and/or share ("process") your personal information when you
                  use our services ("Services"), including when you:
                </p>
                <ul className="mt-4 mb-0 text-gray-700 font-['Poppins']">
                  <li>
                    Download and use our mobile application (LausanneGo) or any
                    other application that links to this Privacy Notice
                  </li>
                  <li>
                    Use LausanneGo - An application that provides a playful
                    experience to visit the city of Lausanne and put forward the
                    local shops
                  </li>
                  <li>
                    Engage with us in other related ways, including any sales,
                    marketing, or events
                  </li>
                </ul>
                <p className="text-gray-700 mt-4 mb-0 font-['Poppins']">
                  <strong>Questions or concerns?</strong> Reading this Privacy
                  Notice will help you understand your privacy rights and
                  choices. If you do not agree with our policies and practices,
                  please do not use our Services. If you still have any
                  questions or concerns, please contact us at
                  contact@lausannego.ch.
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-['Poppins']">
                Summary of Key Points
              </h2>

              <p className="text-gray-700 mb-6 font-['Poppins'] italic">
                This summary provides key points from our Privacy Notice, but
                you can find out more details about any of these topics by using
                our table of contents below.
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                    What personal information do we process?
                  </h3>
                  <p className="text-gray-700 font-['Poppins']">
                    When you visit, use, or navigate our Services, we may
                    process personal information depending on how you interact
                    with us and the Services, the choices you make, and the
                    products and features you use.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                    Do we process any sensitive personal information?
                  </h3>
                  <p className="text-gray-700 font-['Poppins']">
                    We do not process sensitive personal information.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                    Do we collect any information from third parties?
                  </h3>
                  <p className="text-gray-700 font-['Poppins']">
                    We do not collect any information from third parties.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                    How do we process your information?
                  </h3>
                  <p className="text-gray-700 font-['Poppins']">
                    We process your information to provide, improve, and
                    administer our Services, communicate with you, for security
                    and fraud prevention, and to comply with law. We may also
                    process your information for other purposes with your
                    consent.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                    In what situations and with which parties do we share
                    personal information?
                  </h3>
                  <p className="text-gray-700 font-['Poppins']">
                    We may share information in specific situations and with
                    specific third parties.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                    How do we keep your information safe?
                  </h3>
                  <p className="text-gray-700 font-['Poppins']">
                    We have adequate organizational and technical processes and
                    procedures in place to protect your personal information.
                    However, no electronic transmission over the internet or
                    information storage technology can be guaranteed to be 100%
                    secure.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                    What are your rights?
                  </h3>
                  <p className="text-gray-700 font-['Poppins']">
                    Depending on where you are located geographically, the
                    applicable privacy law may mean you have certain rights
                    regarding your personal information.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                    How do you exercise your rights?
                  </h3>
                  <p className="text-gray-700 font-['Poppins']">
                    The easiest way to exercise your rights is by visiting
                    https://lausannego.ch/contact, or by contacting us. We will
                    consider and act upon any request in accordance with
                    applicable data protection laws.
                  </p>
                </div>
              </div>

              {/* Table of Contents */}
              <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                Table of Contents
              </h2>

              <div className="bg-blue-50 rounded-lg p-6 mb-8">
                <ol className="list-decimal list-inside text-blue-700 space-y-2 font-['Poppins']">
                  <li>
                    <a href="#infocollect" className="hover:underline">
                      What Information Do We Collect?
                    </a>
                  </li>
                  <li>
                    <a href="#infouse" className="hover:underline">
                      How Do We Process Your Information?
                    </a>
                  </li>
                  <li>
                    <a href="#legalbases" className="hover:underline">
                      What Legal Bases Do We Rely On To Process Your Personal
                      Information?
                    </a>
                  </li>
                  <li>
                    <a href="#whoshare" className="hover:underline">
                      When And With Whom Do We Share Your Personal Information?
                    </a>
                  </li>
                  <li>
                    <a href="#3pwebsites" className="hover:underline">
                      What Is Our Stance On Third-Party Websites?
                    </a>
                  </li>
                  <li>
                    <a href="#cookies" className="hover:underline">
                      Do We Use Cookies And Other Tracking Technologies?
                    </a>
                  </li>
                  <li>
                    <a href="#ai" className="hover:underline">
                      Do We Offer Artificial Intelligence-Based Products?
                    </a>
                  </li>
                  <li>
                    <a href="#sociallogins" className="hover:underline">
                      How Do We Handle Your Social Logins?
                    </a>
                  </li>
                  <li>
                    <a href="#inforetain" className="hover:underline">
                      How Long Do We Keep Your Information?
                    </a>
                  </li>
                  <li>
                    <a href="#infosafe" className="hover:underline">
                      How Do We Keep Your Information Safe?
                    </a>
                  </li>
                  <li>
                    <a href="#infominors" className="hover:underline">
                      Do We Collect Information From Minors?
                    </a>
                  </li>
                  <li>
                    <a href="#privacyrights" className="hover:underline">
                      What Are Your Privacy Rights?
                    </a>
                  </li>
                  <li>
                    <a href="#DNT" className="hover:underline">
                      Controls For Do-Not-Track Features
                    </a>
                  </li>
                  <li>
                    <a href="#policyupdates" className="hover:underline">
                      Do We Make Updates To This Notice?
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:underline">
                      How Can You Contact Us About This Notice?
                    </a>
                  </li>
                  <li>
                    <a href="#request" className="hover:underline">
                      How Can You Review, Update, Or Delete The Data We Collect
                      From You?
                    </a>
                  </li>
                </ol>
              </div>

              {/* Detailed Sections */}
              <div id="infocollect">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  1. What Information Do We Collect?
                </h2>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-['Poppins']">
                  Personal Information Provided by You
                </h3>
                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    We collect personal information that you provide to us.
                  </em>
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  We collect personal information that you voluntarily provide
                  to us when you register on the Services, express an interest
                  in obtaining information about us or our products and
                  Services, when you participate in activities on the Services,
                  or otherwise when you contact us.
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>Personal Information Provided by You.</strong> The
                  personal information that we collect depends on the context of
                  your interactions with us and the Services, the choices you
                  make, and the products and features you use. The personal
                  information we collect may include the following:
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 font-['Poppins']">
                  <li>Names</li>
                  <li>Email addresses</li>
                  <li>Usernames</li>
                  <li>Passwords</li>
                </ul>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>Sensitive Information.</strong> We do not process
                  sensitive information.
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>Social Media Login Data.</strong> We may provide you
                  with the option to register with us using your existing social
                  media account details, like your Facebook, X, or other social
                  media account. If you choose to register in this way, we will
                  collect certain profile information about you from the social
                  media provider.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-['Poppins']">
                  Application Data
                </h3>
                <p className="text-gray-700 mb-4 font-['Poppins']">
                  If you use our application(s), we also may collect the
                  following information if you choose to provide us with access
                  or permission:
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 font-['Poppins']">
                  <li>
                    <strong>Geolocation Information:</strong> We may request
                    access or permission to track location-based information
                    from your mobile device, either continuously or while you
                    are using our mobile application(s), to provide certain
                    location-based services.
                  </li>
                  <li>
                    <strong>Mobile Device Access:</strong> We may request access
                    or permission to certain features from your mobile device,
                    including your mobile device's camera, sensors, storage, and
                    other features.
                  </li>
                  <li>
                    <strong>Mobile Device Data:</strong> We automatically
                    collect device information (such as your mobile device ID,
                    model, and manufacturer), operating system, version
                    information and system configuration information, device and
                    application identification numbers, browser type and
                    version, hardware model Internet service provider and/or
                    mobile carrier, and Internet Protocol (IP) address.
                  </li>
                  <li>
                    <strong>Push Notifications:</strong> We may request to send
                    you push notifications regarding your account or certain
                    features of the application(s).
                  </li>
                </ul>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  This information is primarily needed to maintain the security
                  and operation of our application(s), for troubleshooting, and
                  for our internal analytics and reporting purposes.
                </p>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4 font-['Poppins']">
                  Google API
                </h3>
                <p className="text-gray-700 mb-6 font-['Poppins']">
                  Our use of information received from Google APIs will adhere
                  to{" "}
                  <a
                    href="https://developers.google.com/terms/api-services-user-data-policy"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google API Services User Data Policy
                  </a>
                  , including the{" "}
                  <a
                    href="https://developers.google.com/terms/api-services-user-data-policy#limited-use"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Limited Use requirements
                  </a>
                  .
                </p>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  All personal information that you provide to us must be true,
                  complete, and accurate, and you must notify us of any changes
                  to such personal information.
                </p>
              </div>

              <div id="infouse">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  2. How Do We Process Your Information?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    We process your information to provide, improve, and
                    administer our Services, communicate with you, for security
                    and fraud prevention, and to comply with law. We may also
                    process your information for other purposes with your
                    consent.
                  </em>
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    We process your personal information for a variety of
                    reasons, depending on how you interact with our Services,
                    including:
                  </strong>
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 font-['Poppins']">
                  <li>
                    <strong>
                      To facilitate account creation and authentication and
                      otherwise manage user accounts.
                    </strong>{" "}
                    We may process your information so you can create and log in
                    to your account, as well as keep your account in working
                    order.
                  </li>
                  <li>
                    <strong>To protect our Services.</strong> We may process
                    your information as part of our efforts to keep our Services
                    safe and secure, including fraud monitoring and prevention.
                  </li>
                  <li>
                    <strong>To identify usage trends.</strong> We may process
                    information about how you use our Services to better
                    understand how they are being used so we can improve them.
                  </li>
                  <li>
                    <strong>
                      To save or protect an individual's vital interest.
                    </strong>{" "}
                    We may process your information when necessary to save or
                    protect an individual's vital interest, such as to prevent
                    harm.
                  </li>
                </ul>
              </div>

              <div id="legalbases">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  3. What Legal Bases Do We Rely On To Process Your Information?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    We only process your personal information when we believe it
                    is necessary and we have a valid legal reason (i.e., legal
                    basis) to do so under applicable law, like with your
                    consent, to comply with laws, to provide you with services
                    to enter into or fulfill our contractual obligations, to
                    protect your rights, or to fulfill our legitimate business
                    interests.
                  </em>
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  The General Data Protection Regulation (GDPR) and UK GDPR
                  require us to explain the valid legal bases we rely on in
                  order to process your personal information. As such, we may
                  rely on the following legal bases to process your personal
                  information:
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 font-['Poppins']">
                  <li>
                    <strong>Consent.</strong> We may process your information if
                    you have given us permission (i.e., consent) to use your
                    personal information for a specific purpose. You can
                    withdraw your consent at any time.
                  </li>
                  <li>
                    <strong>Legitimate Interests.</strong> We may process your
                    information when we believe it is reasonably necessary to
                    achieve our legitimate business interests and those
                    interests do not outweigh your interests and fundamental
                    rights and freedoms. For example, we may process your
                    personal information for some of the purposes described in
                    order to:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li>
                        Analyze how our Services are used so we can improve them
                        to engage and retain users
                      </li>
                      <li>
                        Diagnose problems and/or prevent fraudulent activities
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Legal Obligations.</strong> We may process your
                    information where we believe it is necessary for compliance
                    with our legal obligations, such as to cooperate with a law
                    enforcement body or regulatory agency, exercise or defend
                    our legal rights, or disclose your information as evidence
                    in litigation in which we are involved.
                  </li>
                  <li>
                    <strong>Vital Interests.</strong> We may process your
                    information where we believe it is necessary to protect your
                    vital interests or the vital interests of a third party,
                    such as situations involving potential threats to the safety
                    of any person.
                  </li>
                </ul>
              </div>

              <div id="whoshare">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  4. When And With Whom Do We Share Your Personal Information?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    We may share information in specific situations described in
                    this section and/or with the following third parties.
                  </em>
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  We may need to share your personal information in the
                  following situations:
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2 font-['Poppins']">
                  <li>
                    <strong>Business Transfers.</strong> We may share or
                    transfer your information in connection with, or during
                    negotiations of, any merger, sale of company assets,
                    financing, or acquisition of all or a portion of our
                    business to another company.
                  </li>
                  <li>
                    <strong>When we use Google Maps Platform APIs.</strong> We
                    may share your information with certain Google Maps Platform
                    APIs (e.g., Google Maps API, Places API). Google Maps uses
                    GPS, Wi-Fi, and cell towers to estimate your location. GPS
                    is accurate to about 20 meters, while Wi-Fi and cell towers
                    help improve accuracy when GPS signals are weak, like
                    indoors. We obtain and store on your device ("cache") your
                    location. You may revoke your consent anytime by contacting
                    us at the contact details provided at the end of this
                    document.
                  </li>
                </ul>
              </div>

              <div id="3pwebsites">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  5. What Is Our Stance On Third-Party Websites?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    We are not responsible for the safety of any information
                    that you share with third parties that we may link to or who
                    advertise on our Services, but are not affiliated with, our
                    Services.
                  </em>
                </p>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  The Services may link to third-party websites, online
                  services, or mobile applications and/or contain advertisements
                  from third parties that are not affiliated with us and which
                  may link to other websites, services, or applications.
                  Accordingly, we do not make any guarantee regarding any such
                  third parties, and we will not be liable for any loss or
                  damage caused by the use of such third-party websites,
                  services, or applications. The inclusion of a link towards a
                  third-party website, service, or application does not imply an
                  endorsement by us. We cannot guarantee the safety and privacy
                  of data you provide to any third parties. Any data collected
                  by third parties is not covered by this Privacy Notice. We are
                  not responsible for the content or privacy and security
                  practices and policies of any third parties, including other
                  websites, services, or applications that may be linked to or
                  from the Services. You should review the policies of such
                  third parties and contact them directly to respond to your
                  questions.
                </p>
              </div>

              <div id="cookies">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  6. Do We Use Cookies And Other Tracking Technologies?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    We may use cookies and other tracking technologies to
                    collect and store your information.
                  </em>
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  We may use cookies and similar tracking technologies (like web
                  beacons and pixels) to gather information when you interact
                  with our Services. Some online tracking technologies help us
                  maintain the security of our Services and your account,
                  prevent crashes, fix bugs, save your preferences, and assist
                  with basic site functions.
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  We also permit third parties and service providers to use
                  online tracking technologies on our Services for analytics and
                  advertising, including to help manage and display
                  advertisements, to tailor advertisements to your interests, or
                  to send abandoned shopping cart reminders (depending on your
                  communication preferences). The third parties and service
                  providers use their technology to provide advertising about
                  products and services tailored to your interests which may
                  appear either on our Services or on other websites.
                </p>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  Specific information about how we use such technologies and
                  how you can refuse certain cookies is set out in our Cookie
                  Notice.
                </p>
              </div>

              <div id="ai">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  7. Do We Offer Artificial Intelligence-Based Products?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    We offer products, features, or tools powered by artificial
                    intelligence, machine learning, or similar technologies.
                  </em>
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  As part of our Services, we offer products, features, or tools
                  powered by artificial intelligence, machine learning, or
                  similar technologies (collectively, "AI Products"). These
                  tools are designed to enhance your experience and provide you
                  with innovative solutions. The terms in this Privacy Notice
                  govern your use of the AI Products within our Services.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                  Use of AI Technologies
                </h3>
                <p className="text-gray-700 mb-4 font-['Poppins']">
                  We provide the AI Products through third-party service
                  providers ("AI Service Providers"), including OpenAI. As
                  outlined in this Privacy Notice, your input, output, and
                  personal information will be shared with and processed by
                  these AI Service Providers to enable your use of our AI
                  Products for purposes outlined in this notice. You must not
                  use the AI Products in any way that violates the terms or
                  policies of any AI Service Provider.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                  Our AI Products
                </h3>
                <p className="text-gray-700 mb-2 font-['Poppins']">
                  Our AI Products are designed for the following functions:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1 font-['Poppins']">
                  <li>Image analysis</li>
                  <li>Natural language processing</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                  How We Process Your Data Using AI
                </h3>
                <p className="text-gray-700 mb-6 font-['Poppins']">
                  All personal information processed using our AI Products is
                  handled in line with our Privacy Notice and our agreement with
                  third parties. This ensures high security and safeguards your
                  personal information throughout the process, giving you peace
                  of mind about your data's safety.
                </p>
              </div>

              <div id="sociallogins">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  8. How Do We Handle Your Social Logins?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    If you choose to register or log in to our Services using a
                    social media account, we may have access to certain
                    information about you.
                  </em>
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  Our Services offer you the ability to register and log in
                  using your third-party social media account details (like your
                  Facebook or X logins). Where you choose to do this, we will
                  receive certain profile information about you from your social
                  media provider. The profile information we receive may vary
                  depending on the social media provider concerned, but will
                  often include your name, email address, friends list, and
                  profile picture, as well as other information you choose to
                  make public on such a social media platform.
                </p>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  We will use the information we receive only for the purposes
                  that are described in this Privacy Notice or that are
                  otherwise made clear to you on the relevant Services. Please
                  note that we do not control, and are not responsible for,
                  other uses of your personal information by your third-party
                  social media provider. We recommend that you review their
                  privacy notice to understand how they collect, use, and share
                  your personal information, and how you can set your privacy
                  preferences on their sites and apps.
                </p>
              </div>

              <div id="inforetain">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  9. How Long Do We Keep Your Information?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    We keep your information for as long as necessary to fulfill
                    the purposes outlined in this Privacy Notice unless
                    otherwise required by law.
                  </em>
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  We will only keep your personal information for as long as it
                  is necessary for the purposes set out in this Privacy Notice,
                  unless a longer retention period is required or permitted by
                  law (such as tax, accounting, or other legal requirements). No
                  purpose in this notice will require us keeping your personal
                  information for longer than the period of time in which users
                  have an account with us.
                </p>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  When we have no ongoing legitimate business need to process
                  your personal information, we will either delete or anonymize
                  such information, or, if this is not possible (for example,
                  because your personal information has been stored in backup
                  archives), then we will securely store your personal
                  information and isolate it from any further processing until
                  deletion is possible.
                </p>
              </div>

              <div id="infosafe">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  10. How Do We Keep Your Information Safe?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    We aim to protect your personal information through a system
                    of organizational and technical security measures.
                  </em>
                </p>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  We have implemented appropriate and reasonable technical and
                  organizational security measures designed to protect the
                  security of any personal information we process. However,
                  despite our safeguards and efforts to secure your information,
                  no electronic transmission over the Internet or information
                  storage technology can be guaranteed to be 100% secure, so we
                  cannot promise or guarantee that hackers, cybercriminals, or
                  other unauthorized third parties will not be able to defeat
                  our security and improperly collect, access, steal, or modify
                  your information. Although we will do our best to protect your
                  personal information, transmission of personal information to
                  and from our Services is at your own risk. You should only
                  access the Services within a secure environment.
                </p>
              </div>

              <div id="infominors">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  11. Do We Collect Information From Minors?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    We do not knowingly collect data from or market to children
                    under 18 years of age.
                  </em>
                </p>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  We do not knowingly collect, solicit data from, or market to
                  children under 18 years of age, nor do we knowingly sell such
                  personal information. By using the Services, you represent
                  that you are at least 18 or that you are the parent or
                  guardian of such a minor and consent to such minor dependent's
                  use of the Services. If we learn that personal information
                  from users less than 18 years of age has been collected, we
                  will deactivate the account and take reasonable measures to
                  promptly delete such data from our records. If you become
                  aware of any data we may have collected from children under
                  age 18, please contact us at contact@lausannego.ch.
                </p>
              </div>

              <div id="privacyrights">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  12. What Are Your Privacy Rights?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    In some regions, such as the European Economic Area (EEA),
                    United Kingdom (UK), and Switzerland, you have rights that
                    allow you greater access to and control over your personal
                    information. You may review, change, or terminate your
                    account at any time, depending on your country, province, or
                    state of residence.
                  </em>
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  In some regions (like the EEA, UK, and Switzerland), you have
                  certain rights under applicable data protection laws. These
                  may include the right (i) to request access and obtain a copy
                  of your personal information, (ii) to request rectification or
                  erasure; (iii) to restrict the processing of your personal
                  information; (iv) if applicable, to data portability; and (v)
                  not to be subject to automated decision-making. In certain
                  circumstances, you may also have the right to object to the
                  processing of your personal information.
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  We will consider and act upon any request in accordance with
                  applicable data protection laws.
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  If you are located in the EEA or UK and you believe we are
                  unlawfully processing your personal information, you also have
                  the right to complain to your{" "}
                  <a
                    href="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Member State data protection authority
                  </a>{" "}
                  or{" "}
                  <a
                    href="https://ico.org.uk/make-a-complaint/data-protection-complaints/data-protection-complaints/"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    UK data protection authority
                  </a>
                  .
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  If you are located in Switzerland, you may contact the{" "}
                  <a
                    href="https://www.edoeb.admin.ch/edoeb/en/home.html"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Federal Data Protection and Information Commissioner
                  </a>
                  .
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                  Withdrawing your consent
                </h3>
                <p className="text-gray-700 mb-4 font-['Poppins']">
                  If we are relying on your consent to process your personal
                  information, you have the right to withdraw your consent at
                  any time. You can withdraw your consent at any time by
                  contacting us using the contact details provided below or
                  updating your preferences.
                </p>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  However, please note that this will not affect the lawfulness
                  of the processing before its withdrawal nor will it affect the
                  processing of your personal information conducted in reliance
                  on lawful processing grounds other than consent.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                  Account Information
                </h3>
                <p className="text-gray-700 mb-2 font-['Poppins']">
                  If you would at any time like to review or change the
                  information in your account or terminate your account, you
                  can:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 font-['Poppins']">
                  <li>
                    Log in to your account settings and update your user
                    account.
                  </li>
                </ul>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  Upon your request to terminate your account, we will
                  deactivate or delete your account and information from our
                  active databases. However, we may retain some information in
                  our files to prevent fraud, troubleshoot problems, assist with
                  any investigations, enforce our legal terms and/or comply with
                  applicable legal requirements.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 font-['Poppins']">
                  Cookies and similar technologies
                </h3>
                <p className="text-gray-700 mb-4 font-['Poppins']">
                  Most Web browsers are set to accept cookies by default. If you
                  prefer, you can usually choose to set your browser to remove
                  cookies and to reject cookies. If you choose to remove cookies
                  or reject cookies, this could affect certain features or
                  services of our Services. You may also{" "}
                  <a
                    href="http://www.aboutads.info/choices/"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    opt out of interest-based advertising by advertisers
                  </a>{" "}
                  on our Services.
                </p>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  If you have questions or comments about your privacy rights,
                  you may email us at contact@lausannego.ch.
                </p>
              </div>

              <div id="DNT">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  13. Controls For Do-Not-Track Features
                </h2>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  Most web browsers and some mobile operating systems and mobile
                  applications include a Do-Not-Track ("DNT") feature or setting
                  you can activate to signal your privacy preference not to have
                  data about your online browsing activities monitored and
                  collected. At this stage, no uniform technology standard for
                  recognizing and implementing DNT signals has been finalized.
                  As such, we do not currently respond to DNT browser signals or
                  any other mechanism that automatically communicates your
                  choice not to be tracked online. If a standard for online
                  tracking is adopted that we must follow in the future, we will
                  inform you about that practice in a revised version of this
                  Privacy Notice.
                </p>
              </div>

              <div id="policyupdates">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  14. Do We Make Updates To This Notice?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  <strong>
                    <em>In Short:</em>
                  </strong>{" "}
                  <em>
                    Yes, we will update this notice as necessary to stay
                    compliant with relevant laws.
                  </em>
                </p>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  We may update this Privacy Notice from time to time. The
                  updated version will be indicated by an updated "Revised" date
                  at the top of this Privacy Notice. If we make material changes
                  to this Privacy Notice, we may notify you either by
                  prominently posting a notice of such changes or by directly
                  sending you a notification. We encourage you to review this
                  Privacy Notice frequently to be informed of how we are
                  protecting your information.
                </p>
              </div>

              <div id="contact">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  15. How Can You Contact Us About This Notice?
                </h2>

                <p className="text-gray-700 mb-4 font-['Poppins']">
                  If you have questions or comments about this notice, you may
                  email us at contact@lausannego.ch or contact us by post at:
                </p>

                <div className="bg-blue-50 rounded-lg p-6 mb-6">
                  <p className="text-gray-900 font-semibold mb-2 font-['Poppins']">
                    LausanneGo Association
                  </p>
                  <p className="text-gray-700 font-['Poppins']">
                    Chemin des Triaudes 4B/322
                    <br />
                    Ecublens, Vaud 1024
                    <br />
                    Switzerland
                  </p>
                </div>
              </div>

              <div id="request">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12 font-['Poppins']">
                  16. How Can You Review, Update, Or Delete The Data We Collect
                  From You?
                </h2>

                <p className="text-gray-700 mb-6 font-['Poppins']">
                  You have the right to request access to the personal
                  information we collect from you, details about how we have
                  processed it, correct inaccuracies, or delete your personal
                  information. You may also have the right to withdraw your
                  consent to our processing of your personal information. These
                  rights may be limited in some circumstances by applicable law.
                  To request to review, update, or delete your personal
                  information, please visit:{" "}
                  <a
                    href="https://lausannego.ch/contact"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://lausannego.ch/contact
                  </a>
                  .
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
