import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src="/N.svg"
        height="40"
        width="40"
        alt="Logo"
        className="dark:hidden" // Menyembunyikan logo terang saat tema gelap
      />
      <Image
        src="/N-dark.svg"
        height="40"
        width="40"
        alt="Logo"
        className="hidden dark:block" // Menampilkan logo gelap hanya saat tema gelap
      />
      <p className={cn("font-semibold")}>Nexion</p>
    </div>
  );
};
