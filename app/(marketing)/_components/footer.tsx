import { Button } from "@/components/ui/button";
import Link from "next/link"; // Import Link dari Next.js
import { Logo } from "./logo";

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1F1F1F]">
            <Link href="/"> {/* Menggunakan Link untuk navigasi ke halaman utama */}
                <Logo />
            </Link>
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
                <Button variant="ghost" size="sm">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                    Terms & Conditions
                </Button>
            </div>
        </div>
    );
}
