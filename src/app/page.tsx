"use client";
import Image from "next/image";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { useState, useCallback, useEffect, Fragment } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const GALLERY_IMAGES = [
  {
    src: "/gallery/Building.jpg",
    alt: "Building exterior",
    title: "Davu Blue Building",
    description: "Modern architecture with ocean-view balconies."
  },
  {
    src: "/gallery/swimmingPool.jpg",
    alt: "Swimming pool",
    title: "Infinity Pool",
    description: "Relax in our luxury pool overlooking the ocean."
  },
  {
    src: "/gallery/Bedroom1.jpg",
    alt: "Bedroom 1",
    title: "Master Bedroom",
    description: "Cozy, modern, and filled with natural light."
  },
  {
    src: "/gallery/bedroom2.jpg",
    alt: "Bedroom 2",
    title: "Guest Bedroom",
    description: "Elegant guest room with premium bedding."
  },
  {
    src: "/gallery/kitchenArea.jpg",
    alt: "Kitchen area",
    title: "Gourmet Kitchen",
    description: "Fully equipped kitchenette for your culinary needs."
  },
  {
    src: "/gallery/kitchenArea2.jpg",
    alt: "Kitchen area 2",
    title: "Dining Area",
    description: "Spacious dining with a view."
  },
  {
    src: "/gallery/bathroom.jpg",
    alt: "Bathroom",
    title: "Luxury Bathroom",
    description: "Spa-inspired bathroom with premium amenities."
  },
];

const WHATSAPP_NUMBER = "2348012345678"; // Example WhatsApp number, replace with your real number if needed
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=I%20want%20to%20book%20this%20apartment`;

function HeroSlideshow() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto-play effect
  useEffect(() => {
    if (!emblaApi) return;
    let raf: NodeJS.Timeout;
    const autoplay = () => {
      emblaApi.scrollNext();
      raf = setTimeout(autoplay, 4000);
    };
    raf = setTimeout(autoplay, 4000);
    return () => { if (raf) clearTimeout(raf); };
  }, [emblaApi]);

  // Update selected index for dot indicators
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="home" className="relative w-full min-h-[60vh] h-[60vw] max-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-200/60 to-white">
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={img.src} className="flex-[0_0_100%] h-full relative transition-transform duration-700 ease-in-out">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                style={{ objectFit: "cover" }}
                className="w-full h-full"
                priority={i === 0}
              />
              <div className="absolute bottom-4 left-4 bg-white/70 text-blue-900 px-4 py-2 rounded shadow text-sm font-semibold max-w-xs hidden md:block">
                {img.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-50 mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.7)]">Welcome to Davu Blue BnB</h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-blue-100 mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">Experience luxury, comfort, and breathtaking ocean views in our modern, cozy apartment. Your perfect getaway awaits.</p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg hover:bg-blue-800 transition drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">Book Now on WhatsApp</a>
        {/* Dot indicators */}
        <div className="flex gap-2 justify-center mt-6">
          {GALLERY_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full border-2 border-white transition-all duration-300 ${selectedIndex === i ? "bg-blue-700 scale-125" : "bg-white/60"}`}
              onClick={() => emblaApi && emblaApi.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Stronger Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-black/40 to-white/90 pointer-events-none" />
    </section>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#gallery", label: "Gallery" },
    { href: "#amenities", label: "Amenities" },
    { href: "#book", label: "Book Now" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="font-sans bg-gradient-to-b from-blue-50 via-white to-blue-100 min-h-screen text-gray-900">
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-blue-100 flex items-center justify-between px-4 sm:px-6 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <Image src="/logo/logo.png" alt="Daru Blue BnB Logo" width={120} height={40} className="h-10 w-auto" />
          <span className="font-bold text-lg sm:text-xl tracking-tight text-blue-900">Davu Blue BnB</span>
        </div>
        <ul className="hidden md:flex gap-6 sm:gap-8 font-medium text-blue-900">
          {navLinks.map(link => (
            <li key={link.href}><a href={link.href} className="hover:text-blue-600 transition-colors duration-200">{link.label}</a></li>
          ))}
        </ul>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden sm:inline-block ml-2 px-4 sm:px-5 py-2 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition text-sm sm:text-base">Book Now on WhatsApp</a>
        {/* Hamburger for mobile */}
        <button className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
          <Bars3Icon className="h-7 w-7 text-blue-900" />
        </button>
        {/* Mobile menu */}
        <Transition show={mobileMenuOpen} as={Fragment}>
          {/* @ts-expect-error Headless UI Dialog type issue */}
          <Dialog as="div" onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
              <Dialog.Panel className="fixed inset-y-0 right-0 w-4/5 max-w-xs bg-white shadow-lg p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between mb-4">
                  <Image src="/logo/logo.png" alt="Davu Blue BnB Logo" width={100} height={32} className="h-8 w-auto" />
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Close menu">
                    <XMarkIcon className="h-7 w-7 text-blue-900" />
                  </button>
                </div>
                <ul className="flex flex-col gap-4 text-blue-900 font-semibold text-lg">
                  {navLinks.map(link => (
                    <li key={link.href}><a href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2">{link.label}</a></li>
                  ))}
                </ul>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-4 px-4 py-2 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition text-base text-center">Book Now on WhatsApp</a>
              </Dialog.Panel>
            </div>
          </Dialog>
        </Transition>
      </nav>

      {/* Hero Section as Slideshow */}
      <HeroSlideshow />

      {/* Gallery Section */}
      <section id="gallery" className="py-6 sm:py-8 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-4 sm:mb-6">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 max-w-6xl mx-auto px-1 sm:px-2">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={img.src} className="relative group cursor-pointer" onClick={() => { setOpen(true); setIndex(i); }}>
              <Image src={img.src} alt={img.alt} width={400} height={267} className="rounded-xl shadow-lg object-cover w-full h-[140px] xs:h-[180px] sm:h-[220px] md:h-[240px] lg:h-[300px] group-hover:scale-105 transition" />
              <div className="absolute bottom-2 left-2 bg-white/80 text-blue-900 px-2 sm:px-3 py-1 rounded text-xs font-semibold shadow">{img.title}</div>
            </div>
          ))}
        </div>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={GALLERY_IMAGES.map(img => ({ src: img.src, title: img.title, description: img.description }))}
          index={index}
          plugins={[Thumbnails, Captions]}
        />
      </section>

      {/* About Section */}
      <section id="about" className="py-8 sm:py-12 bg-blue-50">
        <div className="max-w-3xl mx-auto text-center px-3 sm:px-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3 sm:mb-4">About Davu Blue BnB</h2>
          <p className="text-base sm:text-lg text-blue-800 mb-2">Nestled on the serene coastline, Davu Blue BnB offers a unique blend of modern luxury and cozy comfort. Enjoy panoramic ocean views, contemporary interiors, and personalized service in the heart of paradise.</p>
          <p className="text-sm sm:text-md text-blue-700">Located just minutes from the city center, our apartment is perfect for couples, families, and business travelers seeking a memorable stay.</p>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="py-8 sm:py-12 bg-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-900 mb-4 sm:mb-10">Amenities</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 text-blue-800 text-base sm:text-lg font-medium">
            <li>Wi-Fi</li>
            <li>Kitchenette</li>
            <li>Air Conditioning</li>
            <li>Infinity Pool</li>
            <li>Smart TV</li>
            <li>Parking</li>
            <li>Ocean View</li>
            <li>24/7 Security</li>
            <li>Concierge Service</li>
          </ul>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-8 sm:py-12 bg-blue-50 text-center px-3 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3 sm:mb-4">Ready to stay with us?</h2>
        <p className="text-base sm:text-lg text-blue-800 mb-4 sm:mb-6">Book your luxury escape today. We can&apos;t wait to welcome you!</p>
        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-blue-700 text-white rounded-full font-bold text-base sm:text-lg shadow-lg hover:bg-blue-800 transition">Book Now on WhatsApp</a>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 sm:py-12 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-10 items-center px-3 sm:px-0">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3 sm:mb-4">Contact & Location</h2>
            <p className="text-blue-800 mb-2">requirement</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-block px-5 sm:px-6 py-2 bg-blue-700 text-white rounded-full font-semibold shadow hover:bg-blue-800 transition mb-4 text-sm sm:text-base">WhatsApp Us</a>
            {/* Optional contact form for future email support */}
            <form className="mt-4 space-y-3" onSubmit={e => e.preventDefault()}>
              <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded text-sm sm:text-base" disabled />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded text-sm sm:text-base" disabled />
              <textarea placeholder="Your Message" className="w-full px-4 py-2 border rounded text-sm sm:text-base" rows={3} disabled />
              <button className="w-full px-4 py-2 bg-blue-300 text-white rounded font-semibold cursor-not-allowed text-sm sm:text-base" disabled>Send (Coming Soon)</button>
            </form>
          </div>
          <div className="w-full h-48 xs:h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps?q=QQVH%2BMR%20Ruaka&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Davu Blue Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 mt-8 gap-4 md:gap-0 text-center md:text-left">
        <div className="flex items-center gap-3 mb-2 md:mb-0 justify-center md:justify-start">
          <Image src="/logo/logo.png" alt="Daru Blue BnB Logo" width={100} height={32} className="h-8 w-auto" />
          <span className="font-semibold text-base sm:text-lg tracking-tight">Davu Blue BnB</span>
        </div>
        <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm justify-center md:justify-start">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} className="hover:underline">{link.label}</a>
          ))}
        </div>
        <div className="text-xs mt-2 md:mt-0">&copy; {new Date().getFullYear()} Davu Blue BnB. All rights reserved.</div>
      </footer>
    </div>
  );
}
// ---
// For future scalability: extract each section into its own component in src/components
// Add i18n (next-intl) for multilingual support
// Add blog section as needed
