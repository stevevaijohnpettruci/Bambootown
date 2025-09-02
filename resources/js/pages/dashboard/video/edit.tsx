import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Head } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormError from "@/components/ui/toast-error";
import { Save, ArrowLeft } from "lucide-react";
import Product from "@/types/index";
import { useForm, router } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Video Dashboard", href: "/video" },
    { title: "Edit Video", href: "/product/edit" },
    ];

    interface VideoCategory {
        id: number;
        category_name: string;
    }

    type VideoForm = {
        name: string;
        video_url: string;
        category: string;
        description: string;
        thumbnail_url?: string;
        embed_url?: string;
        _method?:string;
    }

    interface VideoData {
        id: number;
        name: string;
        video_url: string;
        category: string;
        description: string;
        thumbnail_url?: string;
        embed_url?: string;
        _method?:string;
    }

    interface EditProps {
     video: VideoData; // Data produk dari server (Inertia props)
    }

    export default function EditVideo({ video }: EditProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentUrl] = useState<string | null>(video?.video_url || null);
    const [category, setCategory] = useState<VideoCategory[]>([]);

    const { data, setData, post, processing, errors, reset } =
        useForm<VideoForm>({
            name: video?.name || "",
            video_url: video?.video_url || "",
            category: video?.category || "",
            description: video?.description || "",
            thumbnail_url: video?.thumbnail_url || "",
            embed_url: video?.embed_url || "",
            _method: "PUT", // Method spoofing untuk Laravel
        });

    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const response = await axios.get("/api/v1/videos-category");
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
        // Menggunakan POST dengan method spoofing untuk PUT
        post(`/video/${video.id}`, {
            onSuccess: () => {
            // Redirect ke halaman index setelah berhasil
            router.visit("/video");
            },
            onError: (errors) => {
            console.error("Form submission errors:", errors);
            },
            onFinish: () => {
            setIsSubmitting(false);
            },
        });
        } catch (error) {
        console.error("Submission error:", error);
        setIsSubmitting(false);
        }
    };


    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData("category", e.target.value);
    };
    const handleReset = () => {
        setData({
            name: video?.name || "",
            video_url: video?.video_url || "",
            category: video?.category || "",
            description: video?.description || "",
            thumbnail_url: video?.thumbnail_url || "",
            embed_url: video?.embed_url || "",
            _method: "PUT",
        });
    };

    return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Edit Data Video" />
    
                <div className="w-full mx-auto p-6">
                    <div className="bg-white rounded-lg   p-5">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-900">
                        Edit Data Video
                    </h1>
    
                    <form onSubmit={submit} className="space-y-6">
                        {/* Nama Produk */}
                        <div>
                        <Label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                        >
                            Judul atau Nama Video <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(event) => setData("name", event.target.value)}
                            placeholder="Masukkan nama produk"
                            className={errors.name ? "border-red-500" : ""}
                            required
                        />
                        <FormError message={errors.name} />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                        {/* Link Video */}
    
                        <div>
                            <Label
                            htmlFor="video_url"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                            >
                            Link Video <span className="text-red-500">*</span>
                            </Label>
                            <Input
                            type="url"
                            id="video_url"
                            value={data.video_url}
                            onChange={(event) => setData("video_url", event.target.value)}
                            placeholder="Masukkan url video"
                            className={errors.video_url ? "border-red-500" : ""}
                            required
                            />
                            <FormError message={errors.video_url} />
                        </div>
                        {/* Category Video */}
                        <div>
                            <Label
                            htmlFor="category"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                            >
                            Kategori <span className="text-red-500">*</span>
                            </Label>
                            <select
                            id="category"
                            name="category"
                            value={data.category}
                            onChange={handleCategoryChange}
                            className={`w-full  text-sm border rounded-lg h-9 px-2 ${errors.category ? "border-red-500" : ""}`}
                            required
                            >
                            <option value="">Pilih Kategori</option>
                            {category.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                {cat.category_name}
                                </option>
                            ))}
                            </select>
                            <FormError message={errors.category} />
                        </div>
                        </div>
                        <div>
                        <Label
                            htmlFor="product_description"
                            className="text-sm font-medium text-gray-700 mb-2 block"
                        >
                            Deskripsi Video
                        </Label>
                        <Textarea
                            id="product_description"
                            value={data.description}
                            onChange={(event) => setData("description", event.target.value)}
                            placeholder="Masukkan deskripsi detail produk..."
                            maxLength={255}
                            rows={4}
                            className={errors.description ? "border-red-500" : ""}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                            {data.description.length}/255 karakter
                        </div>
                        <FormError message={errors.description} />
                        </div>
    
                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleReset}
                            disabled={processing || isSubmitting}
                        >
                            Reset Form
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing || isSubmitting}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2"
                        >
                            {processing || isSubmitting ? (
                            <div className="flex items-center space-x-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                                <span>Menyimpan...</span>
                            </div>
                            ) : (
                            <div className="flex items-center space-x-2">
                                <Save className="w-4 h-4" />
                                <span>Simpan Video</span>
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
