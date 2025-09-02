import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Edit, Plus } from 'lucide-react';
import {TableBody, TableCell, TableHead, TableHeader, TableRoot, TableRow} from '@/components/ui/table';
import Pagination from '@/components/pagination';
import {Link} from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@headlessui/react';
import { X } from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Product Catalog',
        href: '/product',
    },
];


type Product = {
    id: number;
    name: string;
    price: string;
    size: string;
    product_availables: string;
    category_id:string;
    product_description: string;
    product_link: string;
    image_path: string;
    
};

interface ProductPaginationData {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}


export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);

   
    const [productPagination, setProductPagination] = useState<ProductPaginationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Get current page from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get('page') || '1');

    const filteredProducts = products.filter(product => {
        const matchesName = product.name.toLowerCase().includes(nameFilter.toLowerCase());
        return matchesName;
    });
    
    const formatPrice = (price:number | string) =>{
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        if (isNaN(numPrice)) {
            return 'Rp 0';
        }

        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(numPrice);
    }

    const fetchProductData = async (page = 1, searchQuery = '') => {
        try {
            setLoading(true);
            const ProductResponse = await axios.get(`/api/v1/products?page=${page}&search=${searchQuery}`);
            
            setProducts(ProductResponse.data.products.data); 
            setProductPagination(ProductResponse.data.products);

            setError(null);
            
        } catch (error) {
            console.error('Error', error);
            setError('Gagal mengambil data produk');
        } finally {
            setLoading(false);
        }
    };

    // Listen to URL changes (pagination clicks)
    useEffect(() => {
        const handleLocationChange = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const page = parseInt(urlParams.get('page') || '1');
            const search = urlParams.get('search') || '';
            
            fetchProductData(page, search);
            setNameFilter(search);
        };

        // Initial load
        handleLocationChange();

        // Listen to browser back/forward and pagination clicks
        window.addEventListener('popstate', handleLocationChange);
        
        // Custom event listener for Inertia navigation
        const handleInertiaNavigate = () => {
            setTimeout(handleLocationChange, 0);
        };
        
        document.addEventListener('inertia:navigate', handleInertiaNavigate);

        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            document.removeEventListener('inertia:navigate', handleInertiaNavigate);
        };
    }, []);

    // Handle search with debounce
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (nameFilter.length > 0 || urlParams.get('search')) {
                // Update URL with search parameter
                const newUrl = new URL(window.location.href);
                if (nameFilter) {
                    newUrl.searchParams.set('search', nameFilter);
                    newUrl.searchParams.set('page', '1'); // Reset to page 1 on search
                } else {
                    newUrl.searchParams.delete('search');
                }
                
                // Use router.visit to update URL and trigger data fetch
                router.visit(newUrl.pathname + newUrl.search, {
                    preserveState: true,
                    preserveScroll: true,
                    only: [] // Don't fetch any Inertia data, we'll handle it manually
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
                <Head title="All Products" />
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
            <Head title="Products"/>
            <div className="flex h-full flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex justify-between items-center">
                    {/* Judul */}
                    <div className="text-lg font-semibold">
                        Bambootown All Product ({productPagination?.total || 0} total)
                    </div>

                    {/* Search + Button */}
                    <div className="flex items-center gap-2">
                        <Label className="whitespace-nowrap">Cari :</Label>
                        <Input 
                            value={nameFilter}  
                            onChange={(e) => setNameFilter(e.target.value)}
                            placeholder="Cari produk..."
                            className="w-48"
                        />
                        <Link 
                            href="/product/create"
                            className="bg-yellow-300 flex items-center w-40 justify-center p-1 rounded-sm hover:bg-yellow-400"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Data
                        </Link>
                    </div>  
                </div>

                {/* Results info */}
                {productPagination && (
                    <div className="text-sm text-gray-600">
                        Showing {products.length} of {productPagination.total} products
                        {nameFilter && (
                            <span> for "{nameFilter}"</span>
                        )}
                    </div>
                )}

                <TableRoot>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nama Produk</TableHead>
                            <TableHead>Harga Produk</TableHead>
                            <TableHead>Ukuran Produk</TableHead>
                            <TableHead>Produk Tersedia</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Deskripsi Produk</TableHead>
                            <TableHead>Link Produk</TableHead>
                            <TableHead>Foto Produk</TableHead>
                            <TableHead className='text-right'>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={9 } className="text-center py-8 text-gray-500">
                                    {nameFilter 
                                        ? `Tidak ada produk yang sesuai dengan pencarian "${nameFilter}".`
                                        : 'Tidak ada produk ditemukan.'
                                    }
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className='text-sm font-poppins w-10'>{product.id}</TableCell>
                                    <TableCell className='text-sm font-poppins'>{product.name}</TableCell>
                                    <TableCell className='text-sm font-poppins'>{formatPrice(product.price)}</TableCell>
                                    <TableCell className='text-sm font-poppins'>{product.size}</TableCell>
                                    <TableCell className='text-sm font-poppins'>{product.product_availables}</TableCell>
                                    <TableCell className='text-sm font-poppins'>{product.category_id}</TableCell>
                                    <TableCell className='text-sm font-poppins truncate max-w-lg' title={product.product_description}>
                                        {product.product_description}
                                    </TableCell>
                                    <TableCell className='text-sm font-poppins'>
                                        <a href={product.product_link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                                            Link
                                        </a>
                                    </TableCell>
                                    <TableCell>
                                        <img 
                                            src={product.image_path} 
                                            alt={product.name} 
                                            width={30} 
                                            height={30} 
                                            className="object-cover  rounded" 
                                        />
                                    </TableCell>
                                    <TableCell className='flex gap-1 justify-center py-2'> 
                                        <Link 
                                            href={`/product/${product.id}/edit`} 
                                            className='flex items-center gap-0.5 bg-blue-300 hover:bg-blue-400 p-1 rounded-sm text-xs transition-colors'
                                        >
                                            <Edit className='w-4 h-auto' />
                                            Edit
                                        </Link>
                                        <Button
                                            onClick={() => {
                                                if (confirm(`Yakin hapus produk "${product.name}"?`)) {
                                                    router.delete(route('product.destroy', product.id), {
                                                        preserveScroll: true,
                                                        onSuccess: () => {
                                                            // Refresh data after successful deletion
                                                            fetchProductData(currentPage, nameFilter);
                                                        }
                                                    });
                                                }
                                            }}
                                            className="flex items-center gap-0.5 bg-red-400 hover:bg-red-500 p-1 rounded-sm text-xs transition-colors"
                                        >
                                            <X className='w-4 h-auto' />
                                            Hapus
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </TableRoot> 

                {/* Pagination - hanya tampil jika ada data dan lebih dari 1 halaman */}
                {productPagination && productPagination.last_page > 1 && (
                    <Pagination 
                        current_page={productPagination.current_page}
                        last_page={productPagination.last_page} 
                        search={nameFilter}
                    />
                )}



            </div>
        </AppLayout>
    );
}