import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import { Edit, Plus } from "lucide-react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/pagination";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@headlessui/react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Product Category",
        href: "/product/categories/",
    },
    ];

    interface ProductCategory {
    id: number;
    category_name: string;
    };

    interface ProductCategoryPaginationData {
    data: ProductCategory[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    }

    export default function Category() {
    const [product_categories, setProductCategories] = useState<
        ProductCategory[]
    >([]);
    const [productCategoryPagination, setProductCategoryPagination] =
        useState<ProductCategoryPaginationData | null>(null);

    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Get current page from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get("page") || "1");

    const filteredCategory = product_categories.filter((category) => {
        const matchesName = category.category_name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
        return matchesName;
    });

    const fetchProductData = async (page = 1, searchQuery = "") => {
        try {
        setLoading(true);

        const CategoryResponse = await axios.get(
            `/api/v1/products-category?page=${page}&search=${searchQuery}`,
        );

        setProductCategories(CategoryResponse.data.categories.data);
        setProductCategoryPagination(CategoryResponse.data.categories);
        setError(null);
        } catch (error) {
        console.error("Error", error);
        setError("Gagal mengambil data produk");
        } finally {
        setLoading(false);
        }
    };

    // Listen to URL changes (pagination clicks)
    useEffect(() => {
        const handleLocationChange = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const page = parseInt(urlParams.get("page") || "1");
        const search = urlParams.get("search") || "";

        fetchProductData(page, search);
        setNameFilter(search);
        };

        // Initial load
        handleLocationChange();

        // Listen to browser back/forward and pagination clicks
        window.addEventListener("popstate", handleLocationChange);

        // Custom event listener for Inertia navigation
        const handleInertiaNavigate = () => {
        setTimeout(handleLocationChange, 0);
        };

        document.addEventListener("inertia:navigate", handleInertiaNavigate);

        return () => {
        window.removeEventListener("popstate", handleLocationChange);
        document.removeEventListener("inertia:navigate", handleInertiaNavigate);
        };
    }, []);

    // Handle search with debounce
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
        if (nameFilter.length > 0 || urlParams.get("search")) {
            // Update URL with search parameter
            const newUrl = new URL(window.location.href);
            if (nameFilter) {
            newUrl.searchParams.set("search", nameFilter);
            newUrl.searchParams.set("page", "1"); // Reset to page 1 on search
            } else {
            newUrl.searchParams.delete("search");
            }

            // Use router.visit to update URL and trigger data fetch
            router.visit(newUrl.pathname + newUrl.search, {
            preserveState: true,
            preserveScroll: true,
            only: [], // Don't fetch any Inertia data, we'll handle it manually
            });
        }
        }, 300); // 300ms debounce

        return () => clearTimeout(delayedSearch);
    }, [nameFilter]);

    if (loading) {
        return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Products" />
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
            <Head title="All Category" />
            <div className="p-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <p>Error: {error}</p>
                <button
                onClick={() => fetchProductData(currentPage)}
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
        <Head title="Products" />
        <div className="flex h-full flex-col gap-4 rounded-xl p-4 overflow-x-auto">
            {/* Category Tabel */}

            <div className="flex justify-between items-center">
            {/* Judul */}
            <div className="text-lg font-semibold">
                Product Category ({productCategoryPagination?.total || 0} total)
            </div>

            {/* Search + Button */}
            <div className="flex items-center gap-2">
                <Label className="whitespace-nowrap">Cari :</Label>
                <Input
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Cari kategori..."
                className="w-48"
                />
                <Link
                href="/product/categories/create-category"
                className="bg-yellow-300 flex items-center w-40 justify-center p-1 rounded-sm hover:bg-yellow-400"
                >
                <Plus className="w-5 h-5" />
                Tambah Data
                </Link>
            </div>
            </div>

            {/* Results info */}
            {productCategoryPagination && (
            <div className="text-sm text-gray-600">
                Showing {product_categories.length} of{" "}
                {productCategoryPagination.total} products
                {nameFilter && <span> for "{nameFilter}"</span>}
            </div>
            )}

            <TableRoot>
            <TableHeader>
                <TableRow>
                <TableHead>Category ID</TableHead>
                <TableHead>Nama Kategori</TableHead>
                <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {product_categories.length === 0 ? (
                <TableRow>
                    <TableCell
                    colSpan={9}
                    className="text-center py-8 text-gray-500"
                    >
                    {nameFilter
                        ? `Tidak ada produk yang sesuai dengan pencarian "${nameFilter}".`
                        : "Tidak ada produk ditemukan."}
                    </TableCell>
                </TableRow>
                ) : (
                product_categories.map((category) => (
                    <TableRow key={category.id}>
                    <TableCell className="text-sm font-poppins">
                        {category.id}
                    </TableCell>
                    <TableCell className="text-sm font-poppins">
                        {category.category_name}
                    </TableCell>

                    <TableCell className="flex gap-1 justify-center py-2">
                        <Link
                        href={`/product/categories/${category.id}/edit`}
                        className="flex items-center gap-0.5 bg-blue-300 hover:bg-blue-400 p-1 rounded-sm text-xs transition-colors"
                        >
                        <Edit className="w-4 h-auto" />
                        Edit
                        </Link>
                        <Button
                        onClick={() => {
                            if (
                            confirm(
                                `Yakin hapus "${category.category_name}"?`,
                            )
                            ) {
                            router.delete(
                                route("categories.destroy", category.id),
                                {
                                preserveScroll: true,
                                onSuccess: () => {
                                    // Refresh data after successful deletion
                                    fetchProductData(currentPage, nameFilter);
                                },
                                },
                            );
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

            {/* Pagination */}

            {productCategoryPagination &&
            productCategoryPagination.last_page > 1 && (
                <Pagination
                current_page={productCategoryPagination.current_page}
                last_page={productCategoryPagination.last_page}
                search={nameFilter}
                />
            )}
        </div>
        </AppLayout>
    );
}
