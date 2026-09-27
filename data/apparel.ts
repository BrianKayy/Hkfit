import imageFiles from "./product-images.json";

export type ProductColor = { label: string; value: string; image?: string };
export type ApparelProduct = {
  slug: string;
  name: string;
  price: string;
  category: string;
  label: string;
  description: string;
  includes: string;
  colors: ProductColor[];
  sizes: string[];
  images: string[];
};

export const STORAGE_BASE = "https://pwipbjkeudawdteblpbt.supabase.co/storage/v1/object/public/store%20images";
type Folder = keyof typeof imageFiles;
export function imageUrl(folder: Folder, file: string) {
  return `${STORAGE_BASE}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

const palette: Record<string, string> = {
  Black: "#171817", White: "#f7f7f2", Cream: "#e7e0ce", Grey: "#8c8c88",
  Charcoal: "#4c4e4c", Burgundy: "#682f40", Pink: "#d994aa", Purple: "#a394b6",
  "Deep purple": "#574463", "Sky blue": "#b7d7de", Green: "#707e65", Navy: "#263747", Sand: "#c5b499", Teal: "#356473", Brown: "#685047",
};
type ColorSpec = [label: string, filenameMatch: string];

function product(folder: Folder, slug: string, name: string, price: number, category: string,
  description: string, includes: string, colorSpecs: ColorSpec[], cover?: string): ApparelProduct {
  const files = [...imageFiles[folder]];
  // Prefer the named front view; preserve every verified upload in the gallery.
  if (cover && files.includes(cover)) {
    files.splice(files.indexOf(cover), 1);
    files.unshift(cover);
  }
  return {
    slug, name, price: `AED ${price}`, category, label: "The new collection", description, includes,
    sizes: ["S", "M", "L", "XL"],
    images: files.map(file => imageUrl(folder, file)),
    colors: colorSpecs.map(([label, match]) => ({
      label, value: palette[label] ?? "#888",
      image: files.find(file => file.includes(match)) ? imageUrl(folder, files.find(file => file.includes(match))!) : undefined,
    })),
  };
}
const womenColors: ColorSpec[] = [["Black", "BLACK"], ["Burgundy", "BURG"], ["Charcoal", "DEEP GREY"], ["Grey", "GREY SET"], ["Pink", "PINK"]];

export const apparelProducts: ApparelProduct[] = [
  product("Leggings-normal", "womens-essential-leggings", "Essential Leggings", 119, "Women / Bottoms",
    "A clean, close-fitting silhouette for an effortless everyday wardrobe. Pair with the Seamless Jacket to complete the look.",
    "One pair of leggings. Other pieces shown are styled separately.", womenColors, "BLACK SET WITH LOGOjpg (AI Fashion Models).png"),
  product("Leggings-flarred", "womens-flared-leggings", "Flared Leggings", 149, "Women / Bottoms",
    "A fitted leg with a flared finish. A considered foundation for your everyday rotation, styled your way.",
    "One pair of flared leggings. Tops and jackets shown are sold separately.",
    [["Black","FLARED BLACK"],["Deep purple","DEEP PURPLE"],["Pink","PINK"],["Purple","FLARED PURPLE"],["Sky blue","SKY BLUE"]], "FLARED BLACK SET (AI Fashion Models).jpg"),
  product("leggings-flared-high-waist", "womens-high-waisted-v-flare-leggings", "High-Waist Flared Leggings", 149, "Women / Bottoms",
    "A high-rise silhouette with a flared leg. Wear with your favourite essentials for a balanced, understated look.",
    "One pair of high-waist flared leggings.",
    [["Black","BLACK"],["Green","GREEN"],["Sky blue","SKY BLUE"],["White","WHITE"]], "FLARRED BLACK (AI Fashion Models).jpg"),
  product("Vital-sports-bra", "womens-vital-sports-bra", "Vital Sports Bra", 99, "Women / Tops",
    "The newest addition to the women’s collection. Product photography and colour details will be available soon.",
    "One sports bra.", []),
  product("Seamless-jacket", "womens-seamless-jacket", "Seamless Jacket", 149, "Women / Layers",
    "A streamlined layer to finish the look. Style with coordinating leggings or mix into your everyday wardrobe.",
    "One seamless jacket. Leggings and other pieces shown are sold separately.", womenColors, "BLACK SET WITH LOGOjpg (AI Fashion Models).png"),
  product("Men-longsleeve-shirt", "mens-physique-zip-long-sleeve-tshirt", "Long-Sleeve Shirt", 99, "Men / Tops",
    "Clean lines and long sleeves. An understated essential to pair with shorts, trousers, or your everyday layers.",
    "One long-sleeve shirt. Bottoms shown are sold separately.",
    [["Cream","image-0"],["Sky blue","image-1"],["Charcoal","image-2"],["Black","Men Long Sleeve Black"]], "image-0 (AI Fashion Models) 2.jpg"),
  product("Men-shorts", "mens-athletic-training-shorts", "Essential Shorts", 49, "Men / Bottoms",
    "A simple, versatile short to keep in regular rotation. Pair with a long-sleeve shirt or an everyday tee.",
    "One pair of shorts.", [["Black","SHORT 2"],["White","Recolor-46"],["Brown","Recolor-cf"],["Grey","SHORTS LOGO"]], "SHORT 2 (Recolor).jpg"),
  product("Men-pants", "flex-mens-dry-fit-fitness-trousers", "Everyday Pants", 119, "Men / Bottoms",
    "An easy foundation for a considered wardrobe. A clean silhouette that pairs effortlessly with the collection.",
    "One pair of pants.", [["Black","04.39.00.jpeg"],["Charcoal","04.39.00 (1)"],["Grey","04.39.00 (2)"]], "WhatsApp Image 2026-09-27 at 04.39.00.jpeg"),
  product("Men-set-zipper", "mens-lightweight-two-piece-athletic-set", "Zip-Up Set", 249, "Men / Sets",
    "A coordinated look with a zip-up top and matching bottoms. Wear together for a complete silhouette, or style each piece separately.",
    "One matching set: zip-up top and bottoms.",
    [["Black","BLACK"],["Grey","GREY"],["Navy","NAVY"],["Sand","SAND"]], "MEN SET BLACK LOGO  (AI Fashion Models).jpg"),
  product("Men-short-sleeve-shirt", "mens-short-sleeve-seamless-dry-fit-tshirt", "Short-Sleeve Shirt", 59, "Men / Tops",
    "The everyday short-sleeve essential. A pared-back piece that works with the rest of your wardrobe.",
    "One short-sleeve shirt.", [["Black","04.39.01 (2)"],["Grey","04.39.01 (1)"],["Teal","04.39.01.jpeg"]], "WhatsApp Image 2026-09-27 at 04.39.01 (2).jpeg"),
];
export function getApparelProduct(slug: string) { return apparelProducts.find(product => product.slug === slug); }

