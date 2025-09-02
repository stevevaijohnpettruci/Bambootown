<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
class ProductAPIController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $data_product = Product::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "{$search}%");
            })
            ->paginate(10)
            ->withQueryString();

        $data_product->getCollection()->transform(function ($product) {
            $product->image_path = asset('storage/' . $product->image_path);
            return $product;
        });
        
        return response()->json([
            'success' => true,
            'message' => $data_product->isEmpty() ? 'Tidak dapat menemukan produk!' : 'Produk berhasil diterima!',
            'products' => $data_product
        ]);
    }

    public function show($id)
    {
        $data_product = Product::find($id);
        
        if (!$data_product) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak dapat menemukan produk!',
                'data' => null
            ], 404); 
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil diterima!',
            'data' => $data_product
        ]);
    }
    public function store(Request $request)
    {
        try {
            // Validasi input
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'size' => 'required|string|max:255',
                'product_description' => 'nullable|string|max:1000', // Increased length
                'category' => 'required|string|max:255',
                'product_availables' => 'required|integer|min:0',
                'product_link' => 'nullable|url|max:500',
                'image_path' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120', // 5MB max
            ]);

            // Handle file upload
            if ($request->hasFile('image_path')) {
                $file = $request->file('image_path');
                
                // Generate unique filename
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                
                // Store file in public/storage/products
                $validated['image_path'] = $file->storeAs('products', $filename, 'public');
            }

            // Create product
            $product = Product::create($validated);

            // Transform image path to full URL for response
            if ($product->image_path) {
                $product->image_path = asset('storage/' . $product->image_path);
            }

            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil ditambahkan!',
                'data' => $product
            ], 201); // 201 Created status

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422); // 422 Unprocessable Entity

        } catch (\Exception $e) {
            // Log the error
            Log::error('Product creation failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menyimpan produk.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500); // 500 Internal Server Error
        }
    }
    public function update(Request $request, $id){
            try{
                $validated = $request->validate([
                    'name' => 'required|string|max:255',
                    'price' => 'required|numeric',
                    'size' => 'required|string|max:255',
                    'product_description' => 'nullable|string|max:255',
                    'product_availables' => 'required|integer',
                    'product_link' => 'nullable|url',
                    'image_path' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
                ]);
                $product = Product::findOrFail($id);

                // kalau ada file baru → upload & replace
                if ($request->hasFile('image_path')) {
                    // optional: hapus file lama
                    if ($product->image_path && Storage::disk('public')->exists($product->image_path)) {
                        Storage::disk('public')->delete($product->image_path);
                    }

                    $validated['image_path'] = $request->file('image_path')->store('products', 'public');
                }

                $product->update($validated);
                return response()->json([
                    'success'=> true,
                    'message'=> 'Produk berhasil diupdate!',
                    'data'=>$product->fresh(),
                ]);
                }
            catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422); // 422 Unprocessable Entity

            } catch (\Exception $e) {
            // Log the error
            Log::error('Product creation failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menyimpan produk.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500); // 500 Internal Server Error
        }
            
    }
}
