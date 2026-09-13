import Image from "next/image";
import styles from "./BrandLogo.module.css";

export default function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`${styles.frame} ${inverse ? styles.inverse : ""}`}>
      <Image src="/images/hk-logo.jpeg" alt="HK Fitness" width={1254} height={1254} sizes="180px" loading="eager" />
    </span>
  );
}
