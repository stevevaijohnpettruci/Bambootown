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
        title: "Event Dashboard",
        href: "/event",
    },
];

type Event = {
    id: number;
    event_name: string;
    event_description: string;
    event_date: string;
    event_address: string;
    event_ticket_link: string;
};

interface PaginationData {
    data: Event[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function EventTour() {
    const [events, setEvent] = useState<Event[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState("");
    const [error, setError] = useState<string | null>(null);

    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get("page") || "1");

    const filteredVideos = events.filter((event) =>
        event.event_name.toLowerCase().includes(nameFilter.toLowerCase())
    );

    const fetchEventData = async (page = 1, searchQuery = "") => {
        try {
        setLoading(true);
        const response = await axios.get(
            `/api/v1/event-tours?page=${page}&search=${searchQuery}`
        );

        setEvent(response.data.event.data);
        setPagination(response.data.event);

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

        fetchEventData(page, search);
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
                onClick={() => fetchEventData(currentPage)}
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
        <Head title="Event & Tour" />
        <div className="flex h-full flex-col gap-4 rounded-xl p-4 overflow-x-auto">
            <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">
                Bambootown Event & Tour ({pagination?.total || 0} total)
            </div>

            <div className="flex items-center gap-2">
                <Label className="whitespace-nowrap">Cari :</Label>
                <Input
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Cari acara..."
                className="w-48"
                />
                <Link
                href={route('event.create')}
                className="bg-yellow-300 flex items-center w-40 justify-center p-1 rounded-sm hover:bg-yellow-400"
                >
                <Plus className="w-5 h-5" />
                Tambah Data
                </Link>
            </div>
            </div>

            {pagination && (
            <div className="text-sm text-gray-600">
                Showing {events.length} of {pagination.total} videos
                {nameFilter && <span> for "{nameFilter}"</span>}
            </div>
            )}

            <TableRoot>
            <TableHeader>
                <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Acara</TableHead>
                <TableHead>Deskripsi Acara</TableHead>
                <TableHead>Tanggal Acara</TableHead>
                <TableHead>Alamat Acara</TableHead>
                <TableHead>Link Tiket</TableHead>
                <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {events.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                    {nameFilter
                        ? `Tidak ada video yang sesuai dengan pencarian "${nameFilter}".`
                        : "Tidak ada video ditemukan."}
                    </TableCell>
                </TableRow>
                ) : (
                events.map((event) => (
                    <TableRow key={event.id}>
                    <TableCell className="text-xs font-poppins w-10">
                        {event.id}
                    </TableCell>
                    <TableCell className="text-xs font-poppins">
                        {event.event_name}
                    </TableCell>
                    <TableCell
                        className="text-xs font-poppins truncate max-w-xs"
                        title={event.event_description}
                    >
                        {event.event_description}
                    </TableCell>

                    <TableCell className="text-xs font-poppins">
                        {event.event_date}
                    </TableCell>
                    <TableCell className="text-xs font-poppins">
                        {event.event_address}
                    </TableCell>
                    <TableCell className="text-xs font-poppins text-blue-500 underline hover:text-blue-700">
                        <Link href  ={event.event_ticket_link}>Link</Link>
                    </TableCell>
                    
                    <TableCell className="flex gap-1 justify-center py-2">
                        <Link
                        href={`/event-tour/${event.id}/edit`}
                        className="flex items-center gap-0.5 bg-blue-300 hover:bg-blue-400 p-1 rounded-sm text-xs transition-colors"
                        >
                        <Edit className="w-4 h-auto" />
                        Edit
                        </Link>
                        <Button
                        onClick={() => {
                            if (confirm(`Yakin hapus video "${event.event_name}"?`)) {
                            router.delete(route("event.destroy", event.id), {
                                preserveScroll: true,
                                onSuccess: () => {
                                fetchEventData(currentPage, nameFilter);
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
