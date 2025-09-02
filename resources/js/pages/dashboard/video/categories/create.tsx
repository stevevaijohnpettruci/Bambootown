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
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Video Category', href: '/video/categories/' },
    { title: 'Add Category', href: '/product/categories/create-category' }
];

type CategoryForm = {
    category_name: string;

}

export default function CreateCategory() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const { data, setData, post, processing, errors, reset } = useForm<CategoryForm>({
        category_name: '',
        
    });

    const submit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        try {
            // Menggunakan Inertia's post method untuk form submission
            post('/video/categories', {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Data Produk" />
            <div className="w-full mx-auto p-6">
                <div className="bg-white rounded-lg   p-5">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-900">
                        Tambah Kategori Video
                    </h1>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Nama Produk */}
                        <div>
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                                Nama Kategori <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                
                                onChange={(event) => setData('category_name', event.target.value)}
                                placeholder="Masukkan nama produk"
                                className={errors.category_name ? 'border-red-500' : ''}
                                required
                            />
                            <FormError message={errors.category_name} />
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
                                        <span>Simpan Kategori</span>
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