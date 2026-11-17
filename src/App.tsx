
import React, { useEffect, useRef, useState } from 'react';
import {
  Menu, X, ShoppingBag, Search, MessageCircle,
  Truck, Leaf, ShieldCheck, ArrowRight,
  Plus, Minus, Trash2, Image as ImageIcon
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Collection {
  id: string;
  name: string;
  image: string;
}

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

const formatINR = (amount: number): string =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);

const demoAction = () => {
  window.alert(
    'ARVÉ Maison is a fictional portfolio demonstration by TAVRENOR. No real orders or enquiries are sent.'
  );
};

function useElementOnScreen(): [
  React.RefObject<HTMLDivElement | null>,
  boolean
] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function FadeIn({
  children,
  delay = 0,
  className = ''
}: FadeInProps) {
  const [ref, visible] = useElementOnScreen();

  return (
    <div
      ref={ref}
      className={`w-full transition-all duration-700 ease-out ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function SafeImage({ src, alt, className = '' }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [src]);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-[#ECE9E4] text-[#A39B92] ${className}`}
      >
        <ImageIcon size={40} strokeWidth={1} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={alt === 'Luxury modern living room' ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  );
}

const COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    name: 'Sofas',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'c2',
    name: 'Dining',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1c12085c7?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'c3',
    name: 'Beds',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'c4',
    name: 'Chairs',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'c5',
    name: 'Decor',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85'
  }
];

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'The Cloud Sofa',
    price: 89999,
    category: 'Sofas',
    image: COLLECTIONS[0].image
  },
  {
    id: 'p2',
    name: 'Minimalist Oak Dining Table',
    price: 45500,
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'p3',
    name: 'Velvet Accent Chair',
    price: 22999,
    category: 'Chairs',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'p4',
    name: 'Walnut Platform Bed',
    price: 75000,
    category: 'Beds',
    image: COLLECTIONS[2].image
  },
  {
    id: 'p5',
    name: 'Bouclé Lounge Chair',
    price: 34999,
    category: 'Chairs',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'p6',
    name: 'Geometric Coffee Table',
    price: 18500,
    category: 'Tables',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'p7',
    name: 'Woven Rattan Cabinet',
    price: 42000,
    category: 'Storage',
    image: 'https://images.unsplash.com/photo-1595526114101-b55d9d701eec?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'p8',
    name: 'Ceramic Table Lamp',
    price: 8999,
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=85'
  }
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Uncompromising Quality',
    description: 'Considered materials and timeless craftsmanship.'
  },
  {
    icon: Leaf,
    title: 'Conscious Design',
    description: 'Beautiful pieces inspired by responsible living.'
  },
  {
    icon: Truck,
    title: 'Thoughtful Delivery',
    description: 'A seamless experience from selection to your space.'
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  const addToCart = (product: Product) => {
    setCart(previous => {
      const existing = previous.find(item => item.id === product.id);

      if (existing) {
        return previous.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const updateQuantity = (id: string, change: number) => {
    setCart(previous =>
      previous.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCart(previous => previous.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredProducts = PRODUCTS.filter(product =>
    `${product.name} ${product.category}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const handleContactSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    demoAction();
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#F9F8F6] text-[#222222] font-sans selection:bg-[#D5CFC7]">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');

        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans { font-family: 'Inter', Arial, sans-serif; }
        section[id] { scroll-margin-top: 90px; }

        @keyframes arveSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>

      {/* NAVIGATION */}
      <nav
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F9F8F6]/95 backdrop-blur-lg shadow-sm py-4'
            : 'bg-[#F9F8F6]/90 backdrop-blur-sm py-6'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center px-6 md:px-12">

          <div className="hidden flex-1 items-center gap-7 md:flex">
            <a href="#products" className="text-xs uppercase tracking-widest hover:text-[#8B7355]">
              Shop
            </a>
            <a href="#collections" className="text-xs uppercase tracking-widest hover:text-[#8B7355]">
              Collections
            </a>
            <a href="#about" className="text-xs uppercase tracking-widest hover:text-[#8B7355]">
              Atelier
            </a>
            <a href="#contact" className="text-xs uppercase tracking-widest hover:text-[#8B7355]">
              Contact
            </a>
          </div>

          <div className="flex flex-1 md:hidden">
            <button
              aria-label="Open navigation"
              onClick={() => setMobileMenu(true)}
            >
              <Menu size={23} />
            </button>
          </div>

          <a
            href="#home"
            className="flex-1 whitespace-nowrap text-center font-serif text-2xl tracking-wide md:text-3xl"
          >
            ARVÉ<span className="ml-1 italic text-[#8B7355]">Maison</span>
          </a>

          <div className="flex flex-1 items-center justify-end gap-5">
            <button
              aria-label="Search products"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={21} strokeWidth={1.5} />
            </button>

            <button
              aria-label="Open shopping bag"
              className="relative"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={21} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#8B7355] px-1 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F9F8F6]">
          <div className="flex justify-end p-7">
            <button
              aria-label="Close navigation"
              onClick={() => setMobileMenu(false)}
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center gap-10 font-serif text-3xl">
            {[
              ['Shop', '#products'],
              ['Collections', '#collections'],
              ['Our Atelier', '#about'],
              ['Contact', '#contact']
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenu(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* HERO */}
      <section
        id="home"
        className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-28 sm:px-6 md:px-12 md:pb-24 md:pt-36"
      >
        <FadeIn>
          <div className="relative mx-auto h-[65vh] min-h-[480px] w-full overflow-hidden bg-[#E7E0D7] md:h-[78vh]">

            {/* Absolute positioning keeps image perfectly centred */}
            <SafeImage
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85"
              alt="Luxury modern living room"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-black/30" />

            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-5 text-center text-white">
              <span className="mb-7 text-[11px] uppercase tracking-[0.35em] md:text-sm">
                The Art of Living
              </span>

              <h1 className="mb-8 font-serif text-5xl leading-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Artistry in
                <span className="block italic text-[#E5D9C5]">
                  Living
                </span>
              </h1>

              <p className="mb-10 max-w-xl text-sm font-light leading-relaxed text-white/90 md:text-base">
                Thoughtfully curated furniture for spaces that feel extraordinary.
              </p>

              <a
                href="#products"
                className="inline-flex items-center gap-4 bg-white px-8 py-5 text-xs font-medium uppercase tracking-[0.18em] text-[#222222] transition-colors hover:bg-[#E5D9C5]"
              >
                Explore Collection
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="absolute bottom-6 left-6 z-10 text-[10px] uppercase tracking-[0.2em] text-white/80">
              ARVÉ MAISON / 2026
            </div>
          </div>
        </FadeIn>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-[1100px] px-6 py-16 text-center md:py-24">
        <FadeIn>
          <span className="mb-6 block text-xs uppercase tracking-[0.3em] text-[#8B7355]">
            A Different Perspective
          </span>
          <h2 className="mx-auto max-w-4xl font-serif text-3xl leading-relaxed md:text-5xl">
            A home is more than a place.
            <span className="italic text-[#8B7355]">
              {' '}It is a feeling.
            </span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-sm font-light leading-8 text-[#6B5D50] md:text-base">
            Discover furniture where timeless silhouettes,
            natural textures and considered details come together.
          </p>
        </FadeIn>
      </section>

      {/* COLLECTIONS */}
      <section
        id="collections"
        className="mx-auto max-w-[1400px] border-t border-[#E8E2DA] px-6 py-24 md:px-12"
      >
        <FadeIn>
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="mb-4 block text-xs uppercase tracking-[0.25em] text-[#8B7355]">
                Discover
              </span>
              <h2 className="font-serif text-4xl md:text-5xl">
                Curated Environments
              </h2>
            </div>

            <a
              href="#products"
              className="inline-flex items-center gap-3 self-start border-b border-[#222222] pb-2 text-xs uppercase tracking-widest"
            >
              View All <ArrowRight size={16} />
            </a>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:h-[700px] md:grid-cols-4">
          {COLLECTIONS.map((collection, index) => (
            <a
              key={collection.id}
              href="#products"
              className={`group relative block overflow-hidden bg-[#E7E0D7] ${
                index === 0
                  ? 'h-[450px] md:col-span-2 md:row-span-2 md:h-auto'
                  : 'h-[270px] md:h-auto'
              }`}
            >
              <SafeImage
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              <div className="absolute bottom-8 left-8 text-white">
                <h3 className={`font-serif ${
                  index === 0 ? 'text-4xl' : 'text-2xl'
                }`}>
                  {collection.name}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-widest opacity-80">
                  Explore <ArrowRight size={13} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-[1400px] border-t border-[#E8E2DA] px-6 py-24 md:px-12 md:py-32"
      >
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 lg:gap-24">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden bg-[#E7E0D7]">
              <SafeImage
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=85"
                alt="Warm minimalist interior"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <span className="mb-6 block text-xs uppercase tracking-[0.25em] text-[#8B7355]">
              Our Atelier
            </span>

            <h2 className="mb-9 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
              Crafting your
              <span className="block italic text-[#8B7355]">
                sanctuary.
              </span>
            </h2>

            <div className="space-y-6 text-base font-light leading-9 text-[#6B5D50]">
              <p>
                ARVÉ Maison explores the relationship between
                beautiful design and everyday living.
              </p>
              <p>
                Inspired by natural materials, sculptural forms
                and quiet elegance, each piece is selected to
                bring a sense of warmth and intention to a space.
              </p>
            </div>

            <a
              href="#contact"
              className="mt-10 inline-flex items-center gap-3 border-b border-[#8B7355] pb-3 text-xs uppercase tracking-[0.2em]"
            >
              Discover Our Story
              <ArrowRight size={16} />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="products"
        className="mx-auto max-w-[1400px] border-t border-[#E8E2DA] px-6 py-24 md:px-12 md:py-32"
      >
        <FadeIn>
          <div className="mb-20 text-center">
            <span className="mb-5 block text-xs uppercase tracking-[0.25em] text-[#8B7355]">
              Signature Pieces
            </span>
            <h2 className="font-serif text-4xl md:text-6xl">
              The Collection
            </h2>
            <p className="mt-6 text-sm font-light text-[#6B5D50]">
              Timeless design for considered spaces.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-x-7 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product, index) => (
            <FadeIn key={product.id} delay={(index % 4) * 75}>
              <div className="group">
                <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-[#EEEAE4]">
                  <SafeImage
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-[#F9F8F6] via-[#F9F8F6]/95 to-transparent p-4 pt-12 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#222222] py-3 text-xs uppercase tracking-widest text-white transition-colors hover:bg-[#8B7355]"
                    >
                      Add to Bag
                    </button>

                    <button
                      onClick={demoAction}
                      className="border border-[#222222] bg-[#F9F8F6] py-3 text-xs uppercase tracking-widest"
                    >
                      Enquire — Demo
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-[#8B7355]">
                    {product.category}
                  </p>
                  <h3 className="mb-3 font-serif text-xl">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#6B5D50]">
                    {formatINR(product.price)}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-[#242321] px-6 py-24 text-white md:px-12 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <FadeIn>
            <div className="mb-20 text-center">
              <span className="mb-5 block text-xs uppercase tracking-[0.25em] text-[#C2A98B]">
                Our Philosophy
              </span>
              <h2 className="font-serif text-4xl md:text-5xl">
                The ARVÉ Standard
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <FadeIn key={benefit.title} delay={index * 100}>
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#5B5045]">
                      <Icon
                        size={30}
                        strokeWidth={1.3}
                        className="text-[#C2A98B]"
                      />
                    </div>

                    <h3 className="mb-4 font-serif text-2xl">
                      {benefit.title}
                    </h3>

                    <p className="max-w-xs text-sm font-light leading-8 text-[#C6BFB6]">
                      {benefit.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <p className="mt-20 text-center text-xs text-[#A39B92]">
            Brand values shown for portfolio demonstration only.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-[1400px] px-6 py-24 md:px-12 md:py-32"
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeIn>
            <span className="mb-6 block text-xs uppercase tracking-[0.25em] text-[#8B7355]">
              Consultation
            </span>

            <h2 className="mb-10 font-serif text-5xl leading-tight md:text-6xl">
              Design your
              <span className="block italic text-[#8B7355]">
                space.
              </span>
            </h2>

            <p className="max-w-md text-base font-light leading-9 text-[#6B5D50]">
              Explore how a thoughtful furniture collection
              can transform the way a room feels.
            </p>

            <div className="mt-14 border-l-2 border-[#8B7355] pl-6">
              <h3 className="mb-3 font-serif text-2xl">
                Mumbai Studio
              </h3>
              <p className="text-sm leading-8 text-[#6B5D50]">
                Fictional showroom concept
                <br />
                Mumbai, India
              </p>
            </div>

            <p className="mt-10 text-xs uppercase tracking-widest text-[#8B7355]">
              Fictional brand — portfolio demonstration
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="border border-[#E8E2DA] bg-white p-7 shadow-sm sm:p-10 md:p-14">
              <h3 className="mb-10 font-serif text-3xl">
                Send an Enquiry
              </h3>

              <form
                onSubmit={handleContactSubmit}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-3 block text-xs uppercase tracking-widest text-[#8B7355]">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full border-b border-[#D1C9C0] bg-transparent py-3 outline-none focus:border-[#8B7355]"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mb-3 block text-xs uppercase tracking-widest text-[#8B7355]">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full border-b border-[#D1C9C0] bg-transparent py-3 outline-none focus:border-[#8B7355]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-3 block text-xs uppercase tracking-widest text-[#8B7355]">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full border-b border-[#D1C9C0] bg-transparent py-3 outline-none focus:border-[#8B7355]"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-3 block text-xs uppercase tracking-widest text-[#8B7355]">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full resize-none border-b border-[#D1C9C0] bg-transparent py-3 outline-none focus:border-[#8B7355]"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-3 bg-[#222222] py-5 text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#8B7355]"
                >
                  Preview Enquiry
                  <MessageCircle size={17} />
                </button>

                <p className="text-center text-xs leading-6 text-[#8B7355]">
                  Demo only. No information is submitted or stored.
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] px-6 pb-12 pt-24 text-white md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-20 grid grid-cols-1 gap-14 md:grid-cols-3">
            <div>
              <a href="#home" className="font-serif text-3xl">
                ARVÉ<span className="ml-1 italic text-[#C2A98B]">Maison</span>
              </a>
              <p className="mt-7 max-w-sm text-sm font-light leading-8 text-[#A39B92]">
                A study in modern luxury, thoughtful living
                and timeless interior design.
              </p>
            </div>

            <div>
              <h4 className="mb-7 text-xs uppercase tracking-[0.2em] text-[#C2A98B]">
                Explore
              </h4>
              <div className="flex flex-col gap-5 text-sm text-[#C6BFB6]">
                <a href="#collections">Collections</a>
                <a href="#products">Signature Pieces</a>
                <a href="#about">Our Atelier</a>
              </div>
            </div>

            <div>
              <h4 className="mb-7 text-xs uppercase tracking-[0.2em] text-[#C2A98B]">
                Connect
              </h4>
              <div className="flex flex-col gap-5 text-sm text-[#C6BFB6]">
                <a href="#contact">Contact</a>
                <button
                  onClick={demoAction}
                  className="self-start text-left"
                >
                  WhatsApp Enquiry (Demo)
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-5 border-t border-white/15 pt-10 text-xs text-[#A39B92] md:flex-row">
            <p>© 2026 ARVÉ Maison. Fictional Brand Demo.</p>
            <p className="uppercase tracking-[0.15em]">
              Portfolio Demonstration by
              <span className="ml-2 font-semibold text-white">
                TAVRENOR
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* CART SIDEBAR */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            aria-label="Close shopping bag"
            className="absolute inset-0 bg-black/40"
            onClick={() => setCartOpen(false)}
          />

          <div
            className="relative flex h-full w-full max-w-md flex-col bg-[#F9F8F6] shadow-2xl"
            style={{ animation: 'arveSlideIn 0.3s ease-out' }}
          >
            <div className="flex items-center justify-between border-b border-[#E8E2DA] p-7">
              <h2 className="font-serif text-3xl">Your Bag</h2>
              <button
                aria-label="Close bag"
                onClick={() => setCartOpen(false)}
              >
                <X size={25} />
              </button>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto p-7">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-[#8B7355]">
                  <ShoppingBag size={45} strokeWidth={1} />
                  <p className="mt-6 font-serif text-xl">
                    Your bag is empty.
                  </p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-5">
                    <div className="h-28 w-24 shrink-0 overflow-hidden bg-[#E8E2DA]">
                      <SafeImage
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-serif text-lg">
                        {item.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#8B7355]">
                        {formatINR(item.price)}
                      </p>

                      <div className="mt-4 flex w-fit items-center border border-[#D1C9C0]">
                        <button
                          aria-label="Decrease quantity"
                          className="p-2"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus size={15} />
                        </button>
                        <span className="px-3 text-sm">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          className="p-2"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus size={15} />
                        </button>
                      </div>
                    </div>

                    <button
                      aria-label={`Remove ${item.name}`}
                      className="self-start text-[#8B7355]"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#E8E2DA] bg-white p-7">
                <div className="mb-6 flex justify-between">
                  <span className="font-serif text-xl">Subtotal</span>
                  <span>{formatINR(cartTotal)}</span>
                </div>

                <button
                  onClick={demoAction}
                  className="w-full bg-[#222222] py-5 text-xs uppercase tracking-widest text-white"
                >
                  Checkout Preview
                </button>

                <p className="mt-4 text-center text-xs text-[#8B7355]">
                  Demo only — no real purchase.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEARCH */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F9F8F6]">
          <div className="mx-auto max-w-[1200px] px-6 py-10">
            <div className="mb-14 flex justify-end">
              <button
                aria-label="Close search"
                onClick={() => setSearchOpen(false)}
              >
                <X size={30} />
              </button>
            </div>

            <h2 className="mb-10 text-center font-serif text-4xl">
              What are you looking for?
            </h2>

            <div className="mx-auto mb-14 flex max-w-3xl items-center gap-5 border-b border-[#222222] pb-4">
              <Search size={25} />
              <input
                autoFocus
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Search furniture..."
                className="w-full bg-transparent text-xl outline-none md:text-3xl"
              />
            </div>

            {searchQuery.trim() && (
              filteredProducts.length === 0 ? (
                <p className="text-center text-[#8B7355]">
                  No matching products found.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                  {filteredProducts.map(product => (
                    <button
                      key={product.id}
                      className="text-left"
                      onClick={() => {
                        setSearchOpen(false);
                        document.getElementById('products')?.scrollIntoView();
                      }}
                    >
                      <div className="mb-4 aspect-[4/5] overflow-hidden bg-[#E8E2DA]">
                        <SafeImage
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h3 className="font-serif text-lg">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm text-[#8B7355]">
                        {formatINR(product.price)}
                      </p>
                    </button>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* FLOATING DEMO CONTACT */}
      <button
        onClick={demoAction}
        aria-label="WhatsApp demo contact"
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#222222] text-white shadow-xl transition-transform hover:scale-105 hover:bg-[#8B7355]"
      >
        <MessageCircle size={27} strokeWidth={1.5} />
      </button>
    </div>
  );
}
