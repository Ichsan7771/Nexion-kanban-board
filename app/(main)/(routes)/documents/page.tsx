"use client";

import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
    const router = useRouter();
    const { user } = useUser();
    const create = useMutation(api.documents.create);

    const onCreate = () => {
        const promise = create({ title: "Tak Berjudul"})
        .then((documentId) => router.push(`/documents/${documentId}`))

        toast.promise(promise, {
            loading: "Membuat catatan baru...",
            success: "Catatan baru telah dibuat!",
            error: "Gagal memmbuat catatan."
        });
    };

    return (
        <div className="h-full flex flex-col items-center justify-center
        space-y-4">
            <Image
            src="/peter (1).png"
            height="500"
            width="500"
            alt="Empty"
            className="dark:hidden"
            />
            <Image
            src="/peter (1).png"
            height="500"
            width="500"
            alt="Empty"
            className="hidden dark:block"
            />
            <h2 className="text-2xl font-medium">
                Selamat Datang di Nexion
            </h2>
            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2"/>
                Buat Catatan
            </Button>
        </div>
    );
}

export default DocumentsPage;


