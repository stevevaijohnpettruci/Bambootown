import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Pagination from '@/components/pagination';
import { TableBody, TableCell, TableHead, TableHeader, TableRoot, TableRow } from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard', // Fix: sesuaikan dengan route yang benar
    },
];

type Product = {
    id: number;
    name: string;
    price: string;
    size: string;
    product_availables: string;
    product_description: string;
    product_link: string;
    image_path: string;
    image_url?: string; 
};

type PaginationData = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
};

export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [pagination, setPagination] = useState<PaginationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProductData = async (page = 1) => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/v1/products?page=${page}`);

            setProducts(response.data.products.data); 
            setPagination(response.data.products);
            setError(null);
      
            
        } catch (error) {
            console.error('Error', error);
            setError('Gagal mengambil data produk');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    const handlePageChange = (page: number) => {
        fetchProductData(page);
    };

    if (loading) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="All Products" />
                <div className="p-4">
                    <p>Loading...</p>
                </div>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="All Products" />
                <div className="p-4">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Products" />
            <div className="p-4">
                <TableRoot>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Available</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product,index)=>(
                        <TableRow key={index}>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.size}</TableCell>
                            <TableCell>{product.product_availables}</TableCell>    
                        </TableRow>
                        ))}     
                    </TableBody>
                </TableRoot>

        
            </div>
        </AppLayout>
    );
}