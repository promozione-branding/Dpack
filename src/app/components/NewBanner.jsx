import Image from "next/image";

export default function Newbanner() {
  return (
    <section className="w-full bg-white">
      <div className="relative w-full overflow-hidden">
        <Image
          src="/AirBag.webp"
          alt="Upgrade Your Packaging Now"
          width={1920}
          height={500}
          priority
          className="
            w-full
            h-auto
            block
            object-contain
          "
          sizes="100vw"
        />
      </div>
    </section>
  );
}