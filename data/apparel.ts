export type ProductColor = {
  label: string;
  value: string;
};

export type ApparelProduct = {
  slug: string;
  name: string;
  price: string;
  category: string;
  label: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
};
 
const SUPABASE_STORAGE_URL =
  "https://pwipbjkeudawdteblpbt.supabase.co/storage/v1/object/public/hkfitness-images";

function gallery(
  folder: string,
  imageCount: number,
): string[] {
  return Array.from(
    { length: imageCount },
    (_, index) => {
      const fileName = String(index + 1).padStart(2, "0");

      return `${SUPABASE_STORAGE_URL}/${folder}/${fileName}.jpeg`;
    },
  );
}

export const apparelProducts: ApparelProduct[] = [
  {
    slug: "womens-high-waisted-v-flare-leggings",
    name: "Women's High-Waisted V-Flare Leggings",
    price: "00.00",
    category: "Women / Bottoms",
    label: "New arrival",
    colors: [
      { label: "Black", value: "#0c0c0c" },
      { label: "Blue", value: "#1557ff" },
      { label: "Grey", value: "#9b9b9b" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["/images/f3.jpeg", ...gallery("womens-high-waisted-v-flare-leggings",4)],
  },
  {
    slug: "womens-seamless-wide-leg-set",
    name: "Women's Seamless Two-Piece Wide-Leg Activewear Set",
    price: "00.00",
    category: "Women / Sets",
    label: "Best seller",
    colors: [
      { label: "Black", value: "#0c0c0c" },
      { label: "Bone", value: "#ede9df" },
      { label: "Blue", value: "#1557ff" },
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: ["/images/f2.jpeg", ...gallery("womens-seamless-wide-leg-set",5)],
  },
  {
    slug: "womens-seamless-three-piece-set",
    name: "Women's Seamless Three-Piece Activewear Set",
    price: "00.00",
    category: "Women / Sets",
    label: "Complete set",
    colors: [
      { label: "Black", value: "#0c0c0c" },
      { label: "Blue", value: "#1557ff" },
      { label: "Stone", value: "#aaa79e" },
    ],
    sizes: ["XS", "S", "M", "L"],
    images: ["/images/s1.jpeg", ...gallery("womens-seamless-three-piece-set",14)],
  },
  {
    slug: "mens-lightweight-two-piece-athletic-set",
    name: "Men's Lightweight Two-Piece Athletic Set",
    price: "00.00",
    category: "Men / Sets",
    label: "Performance",
    colors: [
      { label: "Black", value: "#0c0c0c" },
      { label: "Blue", value: "#1557ff" },
      { label: "Grey", value: "#777a7d" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/f9.jpeg", ...gallery("mens-lightweight-two-piece-athletic-set",7)],
  },
  {
    slug: "mens-short-sleeve-seamless-dry-fit-tshirt",
    name: "Men's Short-Sleeve Seamless Dry-Fit Athletic T-Shirt",
    price: "00.00",
    category: "Men / Tops",
    label: "Everyday essential",
    colors: [
      { label: "Black", value: "#0c0c0c" },
      { label: "White", value: "#f7f7f7" },
      { label: "Blue", value: "#1557ff" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/f10.jpeg", ...gallery("mens-short-sleeve-seamless-dry-fit-tshirt",6)],
  },
  {
    slug: "mens-athletic-training-shorts",
    name: "Men's Athletic Shorts",
    price: "00.00",
    category: "Men / Bottoms",
    label: "Built to move",
    colors: [
      { label: "Black", value: "#0c0c0c" },
      { label: "Blue", value: "#1557ff" },
      { label: "Grey", value: "#767676" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/f7.jpeg", ...gallery("mens-athletic-training-shorts",3)],
  },
  {
    slug: "flex-mens-dry-fit-fitness-trousers",
    name: "Flex Men's Dry-Fit Fitness Trousers",
    price: "00.00",
    category: "Men / Bottoms",
    label: "Flex collection",
    colors: [
      { label: "Black", value: "#0c0c0c" },
      { label: "Grey", value: "#67696b" },
      { label: "Navy", value: "#18243d" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/f5.jpeg", ...gallery("flex-mens-dry-fit-fitness-trousers",6)],
  },
  {
    slug: "mens-physique-zip-long-sleeve-tshirt",
    name: "Men's Physique Slim-Fit Zip Long-Sleeve T-Shirt",
    price: "00.00",
    category: "Men / Tops",
    label: "Physique collection",
    colors: [
      { label: "Black", value: "#0c0c0c" },
      { label: "White", value: "#f7f7f7" },
      { label: "Blue", value: "#1557ff" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: ["/images/s3.jpeg", ...gallery("mens-physique-zip-long-sleeve-tshirt",10)],
  },
];

export function getApparelProduct(slug: string) {
  return apparelProducts.find((product) => product.slug === slug);
}


