<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Models\ProductCategory;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
class ProductCategoryAPIController extends Controller {
    public function index(Request $request)
    {
        $category_search = $request->input('search');

        $categories_data = ProductCategory::query()
            ->when($category_search, function ($query, $category_search) {
                $query->where('category_name', 'like', "{$category_search}%");
            })
            ->paginate(5)
            ->withQueryString();

        return response()->json([
            'success' => true,
            'message' => $categories_data->isEmpty() ? 'Tidak dapat menemukan produk!' : 'Produk berhasil diterima!',
            'categories' => $categories_data
        ]);
    }

    public function update(Request $request, $id){
        try{
            $validated = $request->validate(
                ['category_name' => 'required|string|max:255']
            );
            
            $category = ProductCategory::findOrFail($id);
            $category->update();
            return response()->json([
                    'success'=> true,
                    'message'=> 'Produk berhasil diupdate!',
                    'data'=>$category->fresh(),
            ]);
        }
        catch(ValidationException $e){
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422); //
        }

        catch (Exception $e) {
            // Log the error
            Log::error('Product creation failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menyimpan produk.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500); // 500 Internal Server Error
        }
    }

    public function show($id)
    {
        $data_product = ProductCategory::find($id);
        
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
}