import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FormError from '@/components/ui/toast-error';
import { Save } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useState,useEffect } from 'react';
import { router } from '@inertiajs/react';
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Event Tour', href: '/event-tour' },
    { title: 'Add Event & Tour', href: '/product/create' }
];

type Address = {
    city:string;
    street:string;
}
interface EventData {
    id:number;
    event_name: string;
    event_description: string;
    event_date:string ;
    event_address: Address;
    event_ticket_link: string;
    _method?:string;
}

interface EditProps {
    event: EventData; // Data produk dari server (Inertia props)
}
type EventTourForm = {
    event_name: string;
    event_description: string;
    event_date:string ;
    event_address: Address;
    event_ticket_link: string;
    _method?:string;
}

export default function Edit({event} : EditProps) {
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data, setData, processing, errors, reset } = useForm<EventTourForm>({
        event_name: event?.event_name || '',
        event_description: event?.event_description || '',
        event_date: event?.event_date || '',
        event_address: {
            city: event?.event_address?.city|| '',
            street:event?.event_address.street || ''
        },
        event_ticket_link: '',
        _method:'PUT',
    });
    
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...data,
            event_address: `${data.event_address.city}, ${data.event_address.street}`,
        };

        router.put(`/event-tour/${event.id}`, payload, {
            onSuccess: () => {
                reset();
                router.visit('/event-tour');
            } ,
            onError: (errors) => console.error(errors),
            onFinish: () => setIsSubmitting(false),
        });
    };
        
    


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Data Event & Tour" />

            <div className="w-full mx-auto p-6">
                <div className="bg-white rounded-lg p-5">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold mb-6 text-gray-900">
                        Edit Data Event & Tour
                        </h1>
                        <div className="text-sm text-gray-500">ID: {event?.id}</div>
                    </div>
                    <form onSubmit={submit} className="space-y-6">
                        {/* Nama Event & Tour */}
                        <div>
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
                                Nama Acara <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.event_name}
                                onChange={(event) => setData('event_name', event.target.value)}
                                placeholder="Masukkan nama acara..."
                                className={errors.event_name ? 'border-red-500' : ''}
                                required
                            />
                            <FormError message={errors.event_name} />
                        </div>
                        {/* Deskripsi Produk */}
                        <div>
                            <Label htmlFor="product_description" className="text-sm font-medium text-gray-700 mb-2 block">
                                Deskripsi Acara
                            </Label>
                            <Textarea
                                id="product_description"
                                value={data.event_description}
                                onChange={(event) => setData('event_description', event.target.value)}
                                placeholder="Masukkan deskripsi acara..."
                                maxLength={255}
                                rows={4}
                                className={errors.event_description ? 'border-red-500' : ''}
                            />
                            <div className="text-xs text-gray-500 mt-1">
                                {data.event_description.length}/255 karakter
                            </div>
                            <FormError message={errors.event_description} />
                        </div>

                        {/* Tanggal Acara */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <Label htmlFor="event_date" className="text-sm font-medium text-gray-700 mb-2 block">
                                    Tanggal Acara <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="date"
                                    id="event_date  "
                                    onChange={(event) => setData('event_date', event.target.value)}
                                    placeholder="0"
                                    value={data.event_date || ""}
                                    className={errors.event_date ? 'border-red-500' : ''}
                                    required
                                />
                                <FormError />
                            </div>
                            {/* Alamat Acara */}
                            <div>
                                <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">
                                    Alamat Kota<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="city"
                                    onChange={(event) => setData('event_address',{...data.event_address, city:event.target.value})}
                                    placeholder="Masukan alamat kota lokasi acara..."
                                    value={data.event_address.city}
                                    className={errors.event_address ? 'border-red-500' : ''}
                                    required
                                />
                                <FormError />
                            </div>
                            {/* Alamat Jalan */}
                            <div>
                                <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">
                                    Alamat Jalan<span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    id="street"
                                    onChange={(event) => setData('event_address',{...data.event_address, street:event.target.value})}
                                    placeholder="Masukan alamat jalan lokasi acara..."
                                    value={data.event_address.street}
                                    className={errors.event_date ? 'border-red-500' : ''}
                                    required
                                />
                                <FormError />
                            </div>
                        </div>
                        {/* Link Tiket Event & Tour */}
                        <div>
                            <Label htmlFor="ticket" className="text-sm font-medium text-gray-700 mb-2 block">
                                Link Tiket <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="ticket"
                                type='url'
                                value={data.event_ticket_link}
                                onChange={(event) => setData('event_ticket_link', event.target.value)}
                                placeholder="Masukkan nama produk"
                                className={errors.event_ticket_link ? 'border-red-500' : ''}
                                required
                            />
                            <FormError message={errors.event_ticket_link} />
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