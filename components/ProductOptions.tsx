"use client";
import { useState } from "react";
import type { ApparelProduct } from "@/data/apparel";
import AddToCartButton from "./AddToCartButton";
export default function ProductOptions({product}:{product:ApparelProduct}){const [color,setColor]=useState(product.colors[0].label);const [size,setSize]=useState("");return <div><div className="form-field"><label htmlFor="color">Colour</label><select id="color" value={color} onChange={e=>setColor(e.target.value)}>{product.colors.map(c=><option key={c.label}>{c.label}</option>)}</select></div><div className="form-field"><label htmlFor="size">Size</label><select id="size" value={size} onChange={e=>setSize(e.target.value)}><option value="">Select your size</option>{product.sizes.map(s=><option key={s}>{s}</option>)}</select></div>{size?<AddToCartButton item={{slug:product.slug,name:product.name,price:product.price,image:product.images[0],color,size}}/>:<p className="form-status">Select a size to add this piece to your bag.</p>}</div>}
