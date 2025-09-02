import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, useForm, router } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import FormError from '@/components/ui/toast-error';
import { Save } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Product Category', href: '/product/categories' },
  { title: 'Edit Category', href: '/product/categories/edit' },
];

interface CategoryForm  {
  category_name: string;
   // Method spoofing untuk Laravel
  [key: string]: string | null | undefined;
};

interface CategoryData {
  id: number;
  category_name: string;
}

interface EditProps {
  product_categories: CategoryData; // Data kategori dari server
}

export default function EditCategory({ product_categories }: EditProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, setData, put, processing, errors } = useForm<CategoryForm>({
    category_name: product_categories?.category_name || '',
  });

  
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    put(`/product/categories/${product_categories.id}`, {
      onSuccess: () => {
        router.visit('/product/categories');
        console.log('Data Berhasil')
      },
      onError: (errors) => {
        console.error('Form submission errors:', errors);
      },
      onFinish: () => {
        setIsSubmitting(false);
      },
    });
  };

  const handleReset = () => {
    setData('category_name', product_categories?.category_name || '');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Kategori" />

      <div className="w-full mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border p-5">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Edit Kategori
            </h1>
            <div className="text-sm text-gray-500">ID: {product_categories?.id}</div>
          </div>

          <form onSubmit={submit} className="space-y-6">
            {/* Nama Kategori */}
            <div>
              <Label
                htmlFor="category_name"
                className="text-sm font-medium text-gray-700 mb-2 block"
              >
                Nama Kategori <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category_name"
                
                onChange={(event) => setData('category_name', event.target.value)}
                placeholder="Masukkan nama kategori"
                className={errors.category_name ? 'border-red-500' : ''}
                required
              />
              <FormError message={errors.category_name} />
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={processing || isSubmitting}
              >
                Reset ke Data Asli
              </Button>
              <Button
                type="submit"
                disabled={processing || isSubmitting}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-6 py-2"
              >
                {processing || isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Mengupdate...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Update Kategori</span>
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
