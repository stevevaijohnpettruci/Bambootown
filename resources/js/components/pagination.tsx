import { router } from "@inertiajs/react";
import { Button } from "@headlessui/react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useMemo, useCallback } from "react";

interface PaginationProps {
    last_page: number;
    current_page: number;
    search?: string;
    maxPageButtons?: number;
    className?: string;
    }

    export default function Pagination({ 
    last_page, 
    current_page, 
    search,
    maxPageButtons = 5,
    className = ""
    }: PaginationProps) {
    // Validasi props
    if (last_page < 1 || current_page < 1 || current_page > last_page) {
        return null;
    }

    // Memoize query string
    const query = useMemo(() => 
        search ? `&search=${encodeURIComponent(search)}` : '', 
        [search]
    );

    // Navigation handler dengan useCallback
    const handlePageChange = useCallback((page: number) => {
        if (page >= 1 && page <= last_page && page !== current_page) {
        router.visit(`?page=${page}${query}`, { 
            preserveState: true,
            preserveScroll: true 
        });
        }
    }, [last_page, current_page, query]);

    // Memoize page buttons logic
    const pageButtons = useMemo(() => {
        const buttons = [];
        const totalPages = last_page;
        const currentPage = current_page;

        let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
        let endPage = startPage + maxPageButtons - 1;

        if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPageButtons + 1);
        }

        // Tombol halaman pertama + ellipsis
        if (startPage > 1) {
        buttons.push(
            <Button
            key={1}
            className="rounded-full h-10 w-10 p-2 bg-gray-200 hover:bg-gray-100 transition-colors"
            onClick={() => handlePageChange(1)}
            aria-label="Go to first page"
            >
            1
            </Button>
        );
        if (startPage > 2) {
            buttons.push(
            <span key="start-ellipsis" className="px-2 text-gray-500" aria-hidden="true">
                ...
            </span>
            );
        }
        }

        // Tombol halaman dalam range
        for (let page = startPage; page <= endPage; page++) {
        const isActive = currentPage === page;
        buttons.push(
            <Button
            key={page}
            className={`rounded-full h-10 w-10 p-2 transition-colors ${
                isActive 
                ? 'bg-yellow-400 text-gray-900 font-medium' 
                : 'bg-gray-200 hover:bg-gray-100'
            }`}
            onClick={() => handlePageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={isActive ? 'page' : undefined}
            disabled={isActive}
            >
            {page}
            </Button>
        );
        }

        // Ellipsis + tombol halaman terakhir
        if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            buttons.push(
            <span key="end-ellipsis" className="px-2 text-gray-500" aria-hidden="true">
                ...
            </span>
            );
        }
        buttons.push(
            <Button
            key={totalPages}
            className="rounded-full h-10 w-10 p-2 bg-gray-200 hover:bg-gray-100 transition-colors"
            onClick={() => handlePageChange(totalPages)}
            aria-label="Go to last page"
            >
            {totalPages}
            </Button>
        );
        }

        return buttons;
    }, [last_page, current_page, maxPageButtons, handlePageChange]);

    // Jika hanya ada 1 halaman, tidak perlu menampilkan pagination
    if (last_page <= 1) {
        return null;
    }

    return (
        <nav 
        className={`flex items-center justify-center gap-2 mt-4 ${className}`}
        aria-label="Pagination"
        >
        {/* Tombol Previous */}
        <Button
            onClick={() => handlePageChange(current_page - 1)}
            disabled={current_page <= 1}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Go to previous page"
        >
            <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* Page buttons */}
        {pageButtons}

        {/* Tombol Next */}
        <Button
            onClick={() => handlePageChange(current_page + 1)}
            disabled={current_page >= last_page}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Go to next page"
        >
            <ChevronRight className="w-4 h-4" />
        </Button>
        </nav>
    );
}