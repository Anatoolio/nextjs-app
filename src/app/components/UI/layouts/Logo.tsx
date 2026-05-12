import Image from "next/image";
import Link from "next/link";

export const LogoBox = () => {
  return (
    <>
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/globe.svg"
          alt="Logo"
          width={26}
          height={26}
          className="h-8 w-8"
          sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
          priority
        />
      </Link>
      <p className="font-bold">NextJs</p>
    </>
  );
};
