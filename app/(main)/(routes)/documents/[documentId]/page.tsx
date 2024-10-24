"use client"

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";

interface DocumentIdPageProps {
    params: {
        documentId: string; // Gunakan string dulu, lalu olah jadi Id<"documents">
    };
};

const DocumentIdPage = ({
    params
}: DocumentIdPageProps) => {
    const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }) ,[])

    // Pisahkan ID dan Nama jika documentId mengandung nama
    const cleanedDocumentId = params.documentId.split('-')[0]; // Ambil hanya ID sebelum tanda "-"

    const document = useQuery(api.documents.getById, {
        documentId: cleanedDocumentId as Id<"documents"> // Gunakan ID yang valid
    });

    const update = useMutation(api.documents.update);

    const onChange = (content: string) => {
        update({
            id: cleanedDocumentId as Id<"documents">, // Kirimkan ID yang bersih di sini juga
            content
        })
    }

    if (document === undefined) {
        return (
            <div>
            <Cover.Skeleton/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
                <div className="space-y-4 pl-8 pt-4">
                    <Skeleton className="h-14 w-[50%]"/>
                    <Skeleton className="h-4 w-[80%]"/>
                    <Skeleton className="h-4 w-[40%]"/>
                    <Skeleton className="h-4 w-[60%]"/>
                </div>
            </div>
        </div>
        )
    }

    if (document === null) {
        return <div>Tidak ditemukan</div>
    }
    
    return ( 
        <div className="pb-40">
            <Cover url={document.coverImage}/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document}/>
                <Editor
                onChange={onChange}
                initialContent={document.content}
                />
            </div>
        </div>
     );
}
 
export default DocumentIdPage;
