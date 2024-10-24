"use client"

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const Error = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
            src="/peter_dead.png"
            height="500"
            width="500"
            alt="Error"
            className="dark:hidden"
            />
            <Image
            src="/peter_dead.png"
            height="500"
            width="500"
            alt="Error"
            className="hidden dark:block"
            />
            <h1>
                Sepertinya terjadi kesalahan!
            </h1>
            <Button asChild>
                <Link href={"/documents"}>
                Kembali
                </Link>
            </Button>
        </div>
    )
}

export default Error