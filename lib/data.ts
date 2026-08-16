import { Brand, CompatibilityEntry, Product, ProductOptionGroup } from "./types";

export const brands: Brand[] = [
  {
    slug: "audi",
    name: "Audi",
    tagline: "RS / S / Sport",
    description:
      "Precision-matched for the Audi cabin — from RS3 to RS6, flat-bottom and round profiles engineered to OEM tolerances.",
    heroImage: "/images/audi-wheel.webp",
    cardImage: "/images/audi-wheel.webp",
  },
  {
    slug: "bmw",
    name: "BMW",
    tagline: "M / Performance",
    description:
      "Built for the M cockpit. Thicker grip sections, M-stripe stitching options, and paddle geometry matched to F and G chassis codes.",
    heroImage: "/images/bmw-wheel.webp",
    cardImage: "/images/bmw-wheel.webp",
  },
  {
    slug: "mercedes",
    name: "Mercedes-Benz",
    tagline: "AMG / Sport",
    description:
      "AMG-spec carbon and Alcantara, finished to match Nappa leather interiors across the C, E, and G-Class range.",
    heroImage: "/images/mercedes-wheel.webp",
    cardImage: "/images/mercedes-wheel.webp",
  },
  {
    slug: "porsche",
    name: "Porsche",
    tagline: "GT / Sport",
    description:
      "GT-spec carbon rims with motorsport-derived paddle shifters, sized for 911, Cayman, and Panamera platforms.",
    heroImage: "/images/porsche-wheel.webp",
    cardImage: "/images/porsche-wheel.webp",
  },
];

export const compatibility: CompatibilityEntry[] = [
  { brand: "audi", model: "RS3", generations: ["8Y (2021–Present)", "8V (2017–2020)"] },
  { brand: "audi", model: "RS6 / RS7", generations: ["C8 (2019–Present)", "C7 (2013–2018)"] },
  { brand: "audi", model: "S3 / S4 / S5", generations: ["B9 (2016–Present)", "8V (2013–2016)"] },
  { brand: "bmw", model: "M3 / M4", generations: ["G80/G82 (2020–Present)", "F80/F82 (2014–2020)"] },
  { brand: "bmw", model: "M5", generations: ["F90 (2017–Present)", "F10 (2011–2016)"] },
  { brand: "bmw", model: "3 Series / 4 Series", generations: ["G20/G22 (2018–Present)", "F30/F32 (2011–2018)"] },
  { brand: "mercedes", model: "C63 AMG", generations: ["W206 (2021–Present)", "W205 (2014–2021)"] },
  { brand: "mercedes", model: "E63 AMG", generations: ["W213 (2016–Present)", "W212 (2009–2016)"] },
  { brand: "mercedes", model: "A45 / CLA45 AMG", generations: ["W177 (2019–Present)", "W176 (2013–2018)"] },
  { brand: "porsche", model: "911", generations: ["992 (2018–Present)", "991 (2011–2019)"] },
  { brand: "porsche", model: "Cayman / Boxster", generations: ["982 (2016–Present)", "981 (2012–2016)"] },
  { brand: "porsche", model: "Panamera", generations: ["G2 (2016–Present)", "G1 (2009–2016)"] },
];

const carbonFinish: ProductOptionGroup = {
  id: "carbon-finish",
  label: "Carbon Fiber Weave",
  type: "swatch",
  options: [
    { id: "gloss-2x2", label: "Gloss 2x2 Twill", priceDelta: 0, swatch: "#141416" },
    { id: "matte-2x2", label: "Matte 2x2 Twill", priceDelta: 0, swatch: "#1a1a1c" },
    { id: "forged", label: "Forged Carbon", priceDelta: 180, swatch: "#232326" },
  ],
};

const gripMaterial: ProductOptionGroup = {
  id: "grip-material",
  label: "Grip Material",
  type: "select",
  options: [
    { id: "alcantara", label: "Full Alcantara", priceDelta: 0 },
    { id: "leather", label: "Perforated Leather", priceDelta: 40 },
    { id: "alcantara-leather", label: "Alcantara / Leather Split", priceDelta: 60 },
  ],
};

const stitching: ProductOptionGroup = {
  id: "stitching",
  label: "Stitching Colour",
  type: "swatch",
  options: [
    { id: "red", label: "Signal Red", priceDelta: 0, swatch: "#C41E2E" },
    { id: "white", label: "Off-White", priceDelta: 0, swatch: "#F2F1EE" },
    { id: "grey", label: "Steel Grey", priceDelta: 0, swatch: "#8A8B8D" },
    { id: "tricolor", label: "Motorsport Tri-Colour", priceDelta: 25, swatch: "#C41E2E" },
  ],
};

const paddles: ProductOptionGroup = {
  id: "paddles",
  label: "Paddle Shifters",
  type: "toggle",
  options: [
    { id: "none", label: "No Paddles / Fixed Wheel", priceDelta: 0 },
    { id: "aluminum", label: "Billet Aluminium Paddles", priceDelta: 220 },
    { id: "carbon", label: "Carbon Paddle Extensions", priceDelta: 260 },
  ],
};

const centerDisplay: ProductOptionGroup = {
  id: "center-display",
  label: "Center Display",
  type: "toggle",
  options: [
    { id: "none", label: "Standard (No Display)", priceDelta: 0 },
    { id: "led", label: "LED Performance Display", priceDelta: 340 },
  ],
};

export const products: Product[] = [
  {
    slug: "audi-rs-carbon",
    name: "Audi RS Carbon Fiber Steering Wheel",
    brand: "audi",
    vehicleCompatibility: "RS3 / RS4 / RS6 (8Y / 8W / C8)",
    material: "Forged & Twill Carbon, Alcantara",
    basePrice: 1290,
    shortDescription: "Flat-bottom carbon wheel built to RS spec, OEM airbag compatible.",
    description:
      "Engineered around the factory RS hub, this wheel replaces bulk with a flat-bottom carbon rim shaped for close-quarters track inputs. The grip section is hand-wrapped in Alcantara over a reinforced core, with a rim profile 4mm thinner than stock for a more direct connection to the front axle.",
    materialsInfo:
      "2x2 twill carbon fiber shell (forged carbon optional) with a hand-laid Alcantara or leather grip. Internal structure is a reinforced magnesium-alloy skeleton matched to the OEM mounting pattern.",
    compatibilityInfo:
      "Direct-fit for Audi RS3 (8Y/8V), RS4/RS5 (B9), and RS6/RS7 (C8). Retains factory airbag, horn, and multifunction controls — no wiring modification required.",
    installationInfo:
      "Ships with OEM-spec mounting hardware and a torque-to-spec guide. Installation takes approximately 45–60 minutes with standard hand tools, or can be fitted by any qualified installer.",
    deliveryInfo:
      "Made to order. Production lead time 10–15 business days, tracked shipping included across the EU.",
    images: [
      "/images/audi-wheel.webp",
      "/images/carbon-fiber.webp",
      "/images/audi-interior.webp",
    ],
    optionGroups: [carbonFinish, gripMaterial, stitching, paddles, centerDisplay],
    featured: true,
  },
  {
    slug: "audi-s-line-carbon",
    name: "Audi S-Line Carbon Fiber Steering Wheel",
    brand: "audi",
    vehicleCompatibility: "S3 / S4 / S5 (B9 / 8V)",
    material: "Twill Carbon, Leather",
    basePrice: 990,
    shortDescription: "Round-profile carbon wheel for S-line interiors, factory fitment.",
    description:
      "A round-profile alternative for owners who want the carbon and stitching upgrade without the flat-bottom RS shape. Balanced weighting keeps daily driving comfortable while the carbon shell sheds mass from the wheel's outer edge.",
    materialsInfo: "2x2 twill carbon fiber shell with a leather or Alcantara grip and reinforced polymer core.",
    compatibilityInfo: "Direct-fit for Audi S3, S4, and S5 (B9 and 8V platforms). Retains all factory electronics.",
    installationInfo: "Standard 45–60 minute installation with included hardware and fitment guide.",
    deliveryInfo: "Production lead time 10–15 business days, tracked shipping included across the EU.",
    images: ["/images/audi-wheel.webp", "/images/carbon-fiber.webp"],
    optionGroups: [carbonFinish, gripMaterial, stitching],
  },
  {
    slug: "bmw-m-carbon",
    name: "BMW M Carbon Fiber Steering Wheel",
    brand: "bmw",
    vehicleCompatibility: "M3 / M4 / M5 (G8x / F8x / F90)",
    material: "Forged Carbon, Alcantara",
    basePrice: 1350,
    shortDescription: "M-spec flat-bottom carbon wheel with optional billet paddles.",
    description:
      "Shaped around the M division's own ergonomic study — a thicker 3-and-9 grip section, a flattened base for leg clearance, and a lowered center hub for a cleaner sightline to the cluster. Available with the same paddle geometry BMW uses on its Competition trims.",
    materialsInfo: "Forged or twill carbon fiber shell with full Alcantara grip and M-stripe stitching options.",
    compatibilityInfo: "Direct-fit for M3/M4 (G80/G82, F80/F82) and M5 (F90, F10). Retains factory iDrive controls.",
    installationInfo: "45–60 minute installation. Compatible with factory airbag and heating elements where equipped.",
    deliveryInfo: "Production lead time 10–15 business days, tracked shipping included across the EU.",
    images: ["/images/bmw-wheel.webp", "/images/carbon-fiber.webp", "/images/bmw-interior.webp"],
    optionGroups: [carbonFinish, gripMaterial, stitching, paddles, centerDisplay],
    featured: true,
  },
  {
    slug: "bmw-performance-carbon",
    name: "BMW Performance Carbon Fiber Steering Wheel",
    brand: "bmw",
    vehicleCompatibility: "3 Series / 4 Series (G20 / G22 / F30 / F32)",
    material: "Twill Carbon, Leather",
    basePrice: 890,
    shortDescription: "Entry carbon upgrade for 3 and 4 Series Sport and M Sport trims.",
    description:
      "A round-profile carbon wheel for Sport and M Sport trims that don't come with M division parts from the factory. Same shell construction as the M-spec wheel, in a shape suited to daily driving.",
    materialsInfo: "2x2 twill carbon fiber shell with leather or Alcantara grip.",
    compatibilityInfo: "Direct-fit for 3 Series (G20/F30) and 4 Series (G22/F32), Sport and M Sport trims.",
    installationInfo: "45–60 minute installation with included hardware.",
    deliveryInfo: "Production lead time 10–15 business days, tracked shipping included across the EU.",
    images: ["/images/bmw-wheel.webp", "/images/carbon-fiber.webp"],
    optionGroups: [carbonFinish, gripMaterial, stitching],
  },
  {
    slug: "mercedes-amg-carbon",
    name: "Mercedes AMG Carbon Fiber Steering Wheel",
    brand: "mercedes",
    vehicleCompatibility: "C63 / E63 / A45 AMG (W206 / W213 / W177)",
    material: "Forged Carbon, Nappa Leather",
    basePrice: 1420,
    shortDescription: "AMG-spec carbon wheel finished to match Nappa leather interiors.",
    description:
      "Built to sit alongside AMG's own Nappa leather trim without a visible seam in quality. The grip is finished by hand to match factory stitch density, while the carbon shell is available in the same forged finish AMG uses on Performance trims.",
    materialsInfo: "Forged or twill carbon fiber shell with Nappa leather or Alcantara grip.",
    compatibilityInfo: "Direct-fit for C63 (W205/W206), E63 (W212/W213), and A45/CLA45 (W176/W177).",
    installationInfo: "45–60 minute installation. Retains factory touch-control surfaces where equipped.",
    deliveryInfo: "Production lead time 10–15 business days, tracked shipping included across the EU.",
    images: ["/images/mercedes-wheel.webp", "/images/carbon-fiber.webp", "/images/mercedes-interior.webp"],
    optionGroups: [carbonFinish, gripMaterial, stitching, paddles, centerDisplay],
    featured: true,
  },
  {
    slug: "mercedes-sport-carbon",
    name: "Mercedes Sport Carbon Fiber Steering Wheel",
    brand: "mercedes",
    vehicleCompatibility: "C-Class / E-Class Sport (W205 / W212)",
    material: "Twill Carbon, Leather",
    basePrice: 950,
    shortDescription: "Carbon and leather upgrade for Sport trim C and E-Class.",
    description:
      "For Sport trims without AMG hardware — the same carbon shell construction in a round profile matched to standard C and E-Class hub geometry.",
    materialsInfo: "2x2 twill carbon fiber shell with leather grip.",
    compatibilityInfo: "Direct-fit for C-Class and E-Class Sport trims (W205/W212 and successors).",
    installationInfo: "45–60 minute installation with included hardware.",
    deliveryInfo: "Production lead time 10–15 business days, tracked shipping included across the EU.",
    images: ["/images/mercedes-wheel.webp", "/images/carbon-fiber.webp"],
    optionGroups: [carbonFinish, gripMaterial, stitching],
  },
  {
    slug: "porsche-gt-carbon",
    name: "Porsche GT Carbon Fiber Steering Wheel",
    brand: "porsche",
    vehicleCompatibility: "911 / Cayman / Panamera (992 / 982 / G2)",
    material: "Forged Carbon, Alcantara",
    basePrice: 1490,
    shortDescription: "GT-spec carbon wheel with motorsport-derived paddle geometry.",
    description:
      "Modelled on the rim thickness and hub offset Porsche uses on its GT department road cars. The paddle geometry is carried over from Porsche's own PDK motorsport parts bin, lengthened slightly for a more positive shift feel.",
    materialsInfo: "Forged or twill carbon fiber shell with full Alcantara grip and contrast stitching.",
    compatibilityInfo: "Direct-fit for 911 (991/992), Cayman/Boxster (981/982), and Panamera (G1/G2).",
    installationInfo: "45–60 minute installation. Compatible with PDK and manual variants.",
    deliveryInfo: "Production lead time 10–15 business days, tracked shipping included across the EU.",
    images: ["/images/porsche-wheel.webp", "/images/carbon-fiber.webp"],
    optionGroups: [carbonFinish, gripMaterial, stitching, paddles],
    featured: true,
  },
  {
    slug: "porsche-sport-carbon",
    name: "Porsche Sport Carbon Fiber Steering Wheel",
    brand: "porsche",
    vehicleCompatibility: "718 / Macan Sport (982 / 95B)",
    material: "Twill Carbon, Leather",
    basePrice: 1050,
    shortDescription: "Round-profile carbon wheel for 718 and Macan Sport trims.",
    description:
      "A round-profile carbon wheel for owners who want the material upgrade without the GT department's flat-bottom shape. Same shell construction, standard rim geometry.",
    materialsInfo: "2x2 twill carbon fiber shell with leather grip.",
    compatibilityInfo: "Direct-fit for 718 Cayman/Boxster and Macan Sport trims.",
    installationInfo: "45–60 minute installation with included hardware.",
    deliveryInfo: "Production lead time 10–15 business days, tracked shipping included across the EU.",
    images: ["/images/porsche-wheel.webp", "/images/carbon-fiber.webp"],
    optionGroups: [carbonFinish, gripMaterial, stitching],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand === brand);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
