import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FormError from '@/components/ui/toast-error';
import { Save } from 'lucide-react';
import Product from '@/types/index';
import axios from "axios";
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Product Catalog', href: '/product' },
    { title: 'Add Product', href: '/product/create' }
];

interface ProductCategory {
    id: number;
    category_name: string;
}

interface ProductForm {
    name: string;
    price: string;
    size: string;
    product_availables: string;
    category_id: string;
    product_description: string;
    product_link: string;
    image_path: File | null;
    [key: string]: string | File | null;
}

export default function Create() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [category, setCategory] = useState<ProductCategory[]>([]);
    const { data, setData, post, processing, errors, reset } = useForm<ProductForm>({
        name: '',
        price: '',
        size: '',
        product_description: '',
        category_id: '',
        product_availables: '',
        product_link: '',
        image_path: null,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/v1/products-category');
                setCategory(response.data.categories.data);
                console.log(response.data.categories.data);
            } catch (error) {
                console.error("Gagal ambil kategori:", error);
            }
        };

        fetchCategories();
    }, []);

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            // Menggunakan Inertia's post method untuk form submission
            post('/product', {
                onSuccess: () => {
                    // Reset form setelah berhasil
                    reset();
                    // Redirect atau show success message bisa ditambahkan di sini
                },
                onError: (errors) => {
                    console.error('Form submission errors:', errors);
                },
                onFinish: () => {
                    setIsSubmitting(false);
                }
            });
        } catch (error) {
            console.error('Submission error:', error);
            setIsSubmitting(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('image_path', file);
    };

    const handleNumberInput = (field: keyof ProductForm, value: string) => {
        // Hanya terima angka positif
        if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
            setData(field, value);
        }
    };

    // Handler untuk select category
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('category_id', e.target.value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Data Produk" />

            <div className="w-full mx-auto p-6">
                <div className="bg-white rounded-lg p-5">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-900">
                        Tambah Data Produk Baru
                    </h1>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Nama Produk */}
                        <div>
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                                Nama Produk <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(event) => setData('name', event.target.value)}
                                placeholder="Masukkan nama produk"
                                className={errors.name ? 'border-red-500' : ''}
                                required
                            />
                            <FormError message={errors.name} />
                        </div>

                        {/* Harga dan Ukuran */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="price" className="text-sm font-medium text-gray-700 mb-2 block">
                                    Harga (Rp) <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="number"
                                    id="price"
                                    value={data.price}
                                    onChange={(event) => handleNumberInput('price', event.target.value)}
                                    placeholder="0"
                                    min="0"
                                    step="1000"
                                    className={errors.price ? 'border-red-500' : ''}
                                    required
                                />
                                <FormError message={errors.price} />
                            </div>
                            
                            <div>
                                <Label htmlFor="size" className="text-sm font-medium text-gray-700 mb-2 block">
                                    Ukuran
                                </Label>
                                <Input
                                    id="size"
                                    value={data.size}
                                    onChange={(event) => setData('size', event.target.value)}
                                    placeholder="Contoh: S, M, L, XL atau ukuran lainnya"
                                    className={errors.size ? 'border-red-500' : ''}
                                />
                                <FormError message={errors.size} />
                            </div>
                        </div>

                        {/* Deskripsi Produk */}
                        <div>
                            <Label htmlFor="product_description" className="text-sm font-medium text-gray-700 mb-2 block">
                                Deskripsi Produk
                            </Label>
                            <Textarea
                                id="product_description"
                                value={data.product_description}
                                onChange={(event) => setData('product_description', event.target.value)}
                                placeholder="Masukkan deskripsi detail produk..."
                                maxLength={255}
                                rows={4}
                                className={errors.product_description ? 'border-red-500' : ''}
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                {data.product_description.length}/255 karakter
                            </div>
                            <FormError message={errors.product_description} />
                        </div>
                        
                        {/* Kategori, Stok, dan Link */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <Label htmlFor="category_id" className="text-sm font-medium text-gray-700 mb-2 block">
                                    Kategori <span className="text-red-500">*</span>
                                </Label>
                                <select
                                    id="category_id"
                                    name="category_id"
                                    value={data.category_id}
                                    onChange={handleCategoryChange}
                                    className={`w-full border rounded-lg h-9 px-2 ${errors.category_id ? 'border-red-500' : ''}`}
                                    required
                                >
                                    <option value="">Pilih Kategori</option>
                                    {category.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.category_name}
                                        </option>
                                    ))}
                                </select>
                                <FormError message={errors.category_id} />
                            </div>
                            
                            <div>
                                <Label htmlFor="product_availables" className="text-sm font-medium text-gray-700 mb-2 block">
                                    Stok Tersedia <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="number"
                                    id="product_availables"
                                    value={data.product_availables}
                                    onChange={(event) => handleNumberInput('product_availables', event.target.value)}
                                    placeholder="0"
                                    min="0"
                                    className={errors.product_availables ? 'border-red-500' : ''}
                                    required
                                />
                                <FormError message={errors.product_availables} />
                            </div>

                            <div>
                                <Label htmlFor="product_link" className="text-sm font-medium text-gray-700 mb-2 block">
                                    Link Produk
                                </Label>
                                <Input
                                    type="url"
                                    id="product_link"
                                    value={data.product_link}
                                    onChange={(event) => setData('product_link', event.target.value)}
                                    placeholder="https://example.com/produk"
                                    className={errors.product_link ? 'border-red-500' : ''}
                                />
                                <FormError message={errors.product_link} />
                            </div>
                        </div>

                        {/* Upload Gambar */}
                        <div>
                            <Label htmlFor="image_path" className="text-sm font-medium text-gray-700 mb-2 block">
                                Gambar Produk
                            </Label>
                            <Input
                                type="file"
                                id="image_path"
                                onChange={handleFileChange}
                                accept="image/*"
                                className={errors.image_path ? 'border-red-500' : ''}
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                Format yang didukung: JPG, PNG, GIF. Maksimal 2MB.
                            </div>
                            <FormError message={errors.image_path} />
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => reset()}
                                disabled={processing || isSubmitting}
                            >
                                Reset Form
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing || isSubmitting}
                                className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2"
                            >
                                {(processing || isSubmitting) ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                                        <span>Menyimpan...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Save className="w-4 h-4" />
                                        <span>Simpan Data Produk</span>
                                    </div>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}