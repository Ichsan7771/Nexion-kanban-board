"use client"

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";

import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { 
DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
 } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
    documentId: Id<"documents">;
};

export const Menu = ({
    documentId
}: MenuProps) => {
    const router = useRouter();
    const { user } = useUser();

    const archive = useMutation(api.documents.archive);

    const onArchived = () => {
        const promise = archive({ id:documentId})
        
        toast.promise(promise, {
            loading: "Memindahkan ke sampah",
            success: "Sukses memindahkan ke sampah!",
            error: "Gagal mengarsipkan catatan."
        });
        
    router.push("/documents");
    };

    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button size="sm" variant="ghost">
                <MoreHorizontal className="h-4 w-4"/>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
        >
            <DropdownMenuItem onClick={onArchived}>
                <Trash className="h-4 w-4 mr-2"/>
                Hapus
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <div className="text-xs text-muted-foreground p-2">
                Terakhir diubah oleh: {user?.fullName}
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
    )
}

Menu.Skeleton = function MenuSkeleton() {
    return (
        <Skeleton className="h-10 w-10"/>
    )
}