import Image from "next/image";
import Link from "next/link";

export interface IProductOwnerCard {
  src: string;
  alt: string;
  href: string;
}

const ProductOwnerCard = ({ src, alt, href }: IProductOwnerCard) => {
  return (
    <div className="flex-1">
      <div className="relative aspect-3/4">
        <Image
          alt={alt}
          src={src}
          quality={100}
          fill
          className="object-contain"
        />
        <div className="absolute">
          <Link href={href}>
            <Image
              alt="LinkedIn logo"
              src={"/logo/other/linkedIn.png"}
              height={50}
              width={50}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductOwnerCard;
