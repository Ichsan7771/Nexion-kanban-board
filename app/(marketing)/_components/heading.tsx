"use client";

import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-w-6xl space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                Buat Catatan yang Menarik Untuk Mengelola Tugas Dengan Mudah. Selamat Datang di Nexion
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Geser, atur, dan lihat kemajuan proyek dalam sekejap!
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg" />
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild className="font-bold"> 
                    <Link href="/documents">
                        Mulai
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                        <Button size="lg" className="font-bold">
                            <p className="text-base sm:text-xl md:text-2xl w-full flex items-center justify-center font-bold">Login</p>
                        </Button>
                    </SignInButton>
            )}
        </div>
    );
};
