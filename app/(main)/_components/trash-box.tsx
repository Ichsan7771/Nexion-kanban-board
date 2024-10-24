"use client";

import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";
import { Spinner } from "@/components/spinner";
import { Search, Trash, Undo } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ConfirmModal } from "../../../components/modals/confirm-modal";

export const TrashBox = () => {
    const router = useRouter();
    const params = useParams();
    const documents = useQuery(api.documents.getTrash);
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = useState("");

    const filteredDocuments = documents?.filter((document) => {
        return document.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());
    });

    const onClick = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">,
    ) => {
        event.stopPropagation();
        const promise = restore({ id: documentId });

        toast.promise(promise, {
            loading: "Memulihkan catatan...",
            success: "Catatan dipulihkan!",
            error: "Gagal memulihkan catatan."
        });
    };

    const onRemove = (
        documentId: Id<"documents">,
    ) => {
        const promise = remove({ id: documentId });

        toast.promise(promise, {
            loading: "Menghapus catatan...",
            success: "Catatan dihapus!",
            error: "Gagal menghapus catatan."
        });

        if (params.documentId === documentId) {
            router.push("/documents");
        }
    };

    if (documents === undefined) {
        return (
            <div className="h-full flex items-center justify-center p-4">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="text-sm">
            <div className="flex items-center gap-x-1 p-2">
                <Search className="h-4 w-4" />
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-7 px-2 focus-visible::ring-transparent bg-secondary"
                    placeholder="Cari judul catatan..."
                />
            </div>
            <div className="mt-2">
                {filteredDocuments?.length === 0 ? (
                    <p className="text-sm text-center text-gray-500">Dokumen tidak ditemukan.</p>
                ) : (
                    filteredDocuments?.map((document) => (
                        <div
                            key={document._id}
                            role="button"
                            onClick={() => onClick(document._id)}
                            className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100 cursor-pointer
                            dark:hover:bg-neutral-800"
                        >
                            <span className="text-sm truncate">{document.title}</span>
                            <div className="flex items-center space-x-2">
                                <div
                                    onClick={(e) => onRestore(e, document._id)}
                                    role="button"
                                    className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-neutral-600"
                                >
                                    <Undo className="h-4 w-4 text-gray-500" />
                                </div>
                                <ConfirmModal onConfirm={() => onRemove(document._id)}>
                                <div
                                    role="button"
                                    className="p-2 rounded-sm hover:bg-gray-200 dark:hover:bg-neutral-600"
                                >
                                    <Trash className="h-4 w-4 text-muted-foreground" />
                                </div>
                                </ConfirmModal>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
