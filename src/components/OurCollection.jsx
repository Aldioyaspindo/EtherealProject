"use client";

import Image from "next/image";

export default function OurCollections() {
  const collections = [
    { src: "/assetgambar/BlackDenim.webp", alt: "Black Denim", title: "Black Denim" },
    { src: "/assetgambar/JeansDenim.webp", alt: "Jeans Denim", title: "Jeans Denim" },
    { src: "/assetgambar/premium.webp", alt: "Premium", title: "Premium" },
    { src: "/assetgambar/HeavyWheight.webp", alt: "Heavy Weight", title: "Heavy Weight" },
    { src: "/assetgambar/LongHeavyWheight.webp", alt: "Long Heavy Weight", title: "Long Heavy Weight" },
    { src: "/assetgambar/Youth.webp", alt: "Youth", title: "Youth" },
    { src: "/assetgambar/Ringer.webp", alt: "Ringer", title: "Ringer" },
    { src: "/assetgambar/Raglan.webp", alt: "Raglan", title: "Raglan" },
    { src: "/assetgambar/Polo.webp", alt: "Polo", title: "Polo" },
    { src: "/assetgambar/Crewneck.webp", alt: "Crewneck", title: "Crewneck" },
    { src: "/assetgambar/Pullover.webp", alt: "Pullover", title: "Pullover" },
    { src: "/assetgambar/Bomber.webp", alt: "Bomber", title: "Bomber" },
    { src: "/assetgambar/Windbreaker.webp", alt: "Windbreaker", title: "Windbreaker" },
    { src: "/assetgambar/Coachjaket.webp", alt: "Coachjacket", title: "Coachjacket" },
  ];

  return (
    // Menggunakan padding vertikal yang adaptif
    <section className="w-full bg-white py-12 md:py-20">
      
      {/* Judul: Ukuran font responsif dan margin bawah adaptif */}
      <div className="text-center mb-8 md:mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium font-['Poppins'] text-black">
          Our Collections
        </h2>
      </div>

      {/* Container Grid: Dibuat 3 kolom kaku di SEMUA ukuran (grid-cols-3) */}
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 lg:gap-12 px-2 sm:px-4 md:px-8">
        
        {collections.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center"
          >
            {/* Image Container: Menggunakan rasio aspek 3:4 (Portrait) dan w-full */}
            <div className="w-full relative aspect-[3/4] mb-2 sm:mb-4">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover rounded-lg shadow-md hover:scale-[1.03] transition-transform duration-300"
                sizes="(max-width: 640px) 30vw, (max-width: 1024px) 30vw, 300px"
                priority={index < 3} // Prioritaskan 3 gambar pertama
              />
            </div>
            {/* Title: Ukuran font sangat kecil di mobile, membesar di desktop */}
            <h3 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-medium text-black font-['Poppins'] mt-1 sm:mt-4 text-center truncate w-full px-1">
              {item.title}
            </h3>
            {/* Placeholder untuk menjaga jarak bottom (dihapus mb-[60px]) */}
            <div className="h-4 md:h-8"></div> 
          </div>
        ))}
      </div>
    </section>
  );
}