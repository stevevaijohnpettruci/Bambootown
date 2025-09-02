<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    //
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

        return Inertia::render('dashboard/product/index', [
                'products' => $data_product,
                'filters' => [
                    'search' => $search,
                    
                ]
            ]);
    }

    public function create(){
        return Inertia::render('dashboard/product/create');
    }

    public function store(Request $request)
    {
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'size' => 'required|string|max:255',
        'product_description' => 'nullable|string|max:255',
        'category_id' => 'required|numeric',
        'product_availables' => 'required|integer',
        'product_link' => 'nullable|url',
        'image_path' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        if ($request->hasFile('image_path')) {
            $validated['image_path'] = $request->file('image_path')->store('products', 'public');
        }
        Product::create($validated);
        return redirect()->route('product.index')->with('success',"Data berhasil ditambahkan" );
    }

    public function destroy($id){
        $data_product = Product::findOrFail($id);
        $product_name = $data_product->name;
        $data_product->delete();

        return redirect()->route('product.index')->with('success',"{$product_name} berhasil dihapus" );
    }
    public function edit($id){
        $data_product = Product::findOrFail($id);
        return Inertia::render('dashboard/product/edit',[
            'product' => $data_product,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'size' => 'required|string|max:255',
            'product_description' => 'nullable|string|max:255',
            'category_id' => 'required|numeric',
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

        else {
            $validated['image_path'] = $product->image_path;
        }

        $product->update($validated);

        return redirect()
            ->route('product.index')
            ->with('success', "Data berhasil diupdate");
    }


}
