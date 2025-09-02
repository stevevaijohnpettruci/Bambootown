import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, router, Link } from "@inertiajs/react";
import { Edit, Plus, X } from "lucide-react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"; // ganti biar konsisten

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Video Dashboard",
        href: "/video",
    },
];

type Video = {
    id: number;
    name: string;
    video_url: string;
    category: string;
    description: string;
    thumbnail_url?: string;
    embed_url: string;
};

interface PaginationData {
    data: Video[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function Dashboard() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState("");
    const [error, setError] = useState<string | null>(null);

    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get("page") || "1");

    const filteredVideos = videos.filter((video) =>
        video.name.toLowerCase().includes(nameFilter.toLowerCase())
    );

    const fetchVideoData = async (page = 1, searchQuery = "") => {
        try {
        setLoading(true);
        const response = await axios.get(
            `/api/v1/videos?page=${page}&search=${searchQuery}`
        );

        setVideos(response.data.videos.data);
        setPagination(response.data.videos);

        setError(null);
        } catch (error) {
        console.error("Error", error);
        setError("Gagal mengambil data video");
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        const handleLocationChange = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get("page") || "1");
        const search = urlParams.get("search") || "";

        fetchVideoData(page, search);
        setNameFilter(search);
        };

        handleLocationChange();
        window.addEventListener("popstate", handleLocationChange);

        const handleInertiaNavigate = () => {
        setTimeout(handleLocationChange, 0);
        };
        document.addEventListener("inertia:navigate", handleInertiaNavigate);

        return () => {
        window.removeEventListener("popstate", handleLocationChange);
        document.removeEventListener("inertia:navigate", handleInertiaNavigate);
        };
    }, []);

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
        if (nameFilter.length > 0 || urlParams.get("search")) {
            const newUrl = new URL(window.location.href);
            if (nameFilter) {
            newUrl.searchParams.set("search", nameFilter);
            newUrl.searchParams.set("page", "1");
            } else {
            newUrl.searchParams.delete("search");
            }

            router.visit(newUrl.pathname + newUrl.search, {
            preserveState: true,
            preserveScroll: true,
            only: [],
            });
        }
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [nameFilter]);

    if (loading) {
        return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Videos" />
            <div className="p-4">
            <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                <span className="ml-2">Loading...</span>
            </div>
            </div>
        </AppLayout>
        );
    }

    if (error) {
        return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Videos" />
            <div className="p-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>Error: {error}</p>
                <button
                onClick={() => fetchVideoData(currentPage)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                Retry
                </button>
            </div>
            </div>
        </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Videos" />
        <div className="flex h-full flex-col gap-4 rounded-xl p-4 overflow-x-auto">
            <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">
                Bambootown Videos ({pagination?.total || 0} total)
            </div>

            <div className="flex items-center gap-2">
                <Label className="whitespace-nowrap">Cari :</Label>
                <Input
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Cari video..."
                className="w-48"
                />
                <Link
                href="/video/create"
                className="bg-yellow-300 flex items-center w-40 justify-center p-1 rounded-sm hover:bg-yellow-400"
                >
                <Plus className="w-5 h-5" />
                Tambah Data
                </Link>
            </div>
            </div>

            {pagination && (
            <div className="text-sm text-gray-600">
                Showing {videos.length} of {pagination.total} videos
                {nameFilter && <span> for "{nameFilter}"</span>}
            </div>
            )}

            <TableRoot>
            <TableHeader>
                <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Judul Video</TableHead>
                <TableHead>Link Video</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Deskripsi Video</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {videos.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    {nameFilter
                        ? `Tidak ada video yang sesuai dengan pencarian "${nameFilter}".`
                        : "Tidak ada video ditemukan."}
                    </TableCell>
                </TableRow>
                ) : (
                videos.map((video) => (
                    <TableRow key={video.id}>
                    <TableCell className="text-xs font-poppins w-10">
                        {video.id}
                    </TableCell>
                    <TableCell className="text-xs font-poppins">
                        {video.name}
                    </TableCell>
                    <TableCell className="text-xs font-poppins">
                        {video.video_url}
                    </TableCell>
                    <TableCell className="text-xs font-poppins">
                        {video.category}
                    </TableCell>
                    <TableCell
                        className="text-xs font-poppins truncate max-w-xs"
                        title={video.description}
                    >
                        {video.description}
                    </TableCell>
                    <TableCell className="flex gap-1 justify-center py-2">
                        <Link
                        href={`/video/${video.id}/edit`}
                        className="flex items-center gap-0.5 bg-blue-300 hover:bg-blue-400 p-1 rounded-sm text-xs transition-colors"
                        >
                        <Edit className="w-4 h-auto" />
                        Edit
                        </Link>
                        <Button
                        onClick={() => {
                            if (confirm(`Yakin hapus video "${video.name}"?`)) {
                            router.delete(route("video.destroy", video.id), {
                                preserveScroll: true,
                                onSuccess: () => {
                                fetchVideoData(currentPage, nameFilter);
                                },
                            });
                            }
                        }}
                        className="flex items-center gap-0.5 bg-red-400 hover:bg-red-500 p-1 rounded-sm text-xs transition-colors"
                        >
                        <X className="w-4 h-auto" />
                        Hapus
                        </Button>
                    </TableCell>
                    </TableRow>
                ))
                )}
            </TableBody>
            </TableRoot>

            {pagination && pagination.last_page > 1 && (
            <Pagination
                current_page={pagination.current_page}
                last_page={pagination.last_page}
                search={nameFilter}
            />
            )}
        </div>
        </AppLayout>
    );
}
