import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Team() {
  const teamMembers = [
    {
      name: "Ugo Balducci",
      role: "President",
      image: "/people/ugo.png",
    },
    {
      name: "Valentin Belardi",
      role: "Vice-President",
      image:
        "https://media.licdn.com/dms/image/v2/D5603AQFdJVI5jJJ2yg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1713896926261?e=2147483647&v=beta&t=cRZSRQpRjaywX8MLCW7sor8UnY8mGzs54wxe-y5a08k",
    },
    {
      name: "Yasmin Ben Rahhal",
      role: "Chief Financial Officer",
      image: "/people/yasmin.png",
    },
    {
      name: "Joelle Ayoub",
      role: "Communication Lead",
      image: "/people/joelle.png",
    },
    {
      name: "Rim Majzoub",
      role: "Marketing Lead",
      image: "/people/rim.png",
    },
    {
      name: "Youssef Amine",
      role: "Developer Lead",
      image: "/people/youssef.png",
    },
    {
      name: "Jean Rauber",
      role: "Infrastructure Lead",
      image:
        "https://adamedsmartup.pl/wp-content/uploads/2018/09/jean-rauber.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center w-full max-w-[1400px] mx-auto overflow-x-hidden bg-[#f2f2f2]">
      <Header />

      <main className="flex-1 w-full flex flex-col items-center">
        {/* Title Section */}
        <div className="w-full flex justify-center mt-12">
          <h1 className="text-[50px] leading-[50px] font-semibold text-[#ff2d2d] m-0 font-['Poppins']">
            Our Incredible Team
          </h1>
        </div>

        {/* Team Members Section */}
        <div className="flex flex-wrap justify-center mx-8 mt-8 mb-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white border border-[#ddd] rounded-[10px] m-[10px] p-5 w-[250px] text-center"
              style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] rounded-full object-cover mx-auto"
                />
              </div>
              <h2 className="text-[1.2em] font-['Poppins'] my-[10px] mx-0 mb-[5px] text-black">
                {member.name}
              </h2>
              <p className="m-0 text-[#666] font-['Poppins']">{member.role}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
