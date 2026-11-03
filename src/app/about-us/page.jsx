import AboutUs from "./AboutUs";

export const metadata = {
  title: "About Us | DPACK Packaging Solutions",
  description:
    "Learn about DPACK Packaging Solutions, our company, expertise, and commitment to delivering quality packaging products and solutions.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F6F7F9] text-[#123B5D]">
      <AboutUs />
    </main>
  );
}