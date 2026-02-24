import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

export interface IProductOwnerCard {
  src: StaticImport;
  alt: string;
  href: string;
}

const ProductOwnerCard = ({ src, alt, href }: IProductOwnerCard) => {
  return (
    <div className="flex-1">
      <div className="relative aspect-3/4 max-xl:w-2/5 max-sm:w-full">
        <Image
          alt={alt}
          src={src}
          // quality={100}
          fill
          className="object-contain"
          placeholder="blur"
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
