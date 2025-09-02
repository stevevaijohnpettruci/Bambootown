<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\ProductCategory;
use Exception;
use Illuminate\Http\Request;

use function Laravel\Prompts\error;

class ProductCategoryController extends Controller
{
    //

    public function index(Request $request){
        $categories_search = $request->input('search');
        $product_categories = ProductCategory::query()
            ->when($categories_search, function ($query, $categories_search) {
                $query->where('category_name', 'like', "{$categories_search}%");
            })
            ->paginate(10)
            ->withQueryString();
        
        return Inertia::render('dashboard/product/categories/index', [
                'categories' => $product_categories,
                'filters' => [
                    'search' => $categories_search,
                    
                ]
            ]);
    }
    public function create(){
        return Inertia::render('dashboard/product/categories/create-category');
    }

    public function store(Request $request){
        $validated = $request->validate(
            [
                'category_name' => 'required|string|max:255',
                ]
            );
            
        ProductCategory::create($validated);
        return redirect()->route('categories.index')->with('success',"Data berhasil ditambahkan" );
    
    }
    public function edit($id){
        $categories_data = ProductCategory::findOrFail($id);

        return Inertia::render('dashboard/product/categories/edit',[
            'product_categories' => $categories_data,
        ]);
    }

    public function update(Request $request, $id){
        $validated = $request->validate(
            [
                'category_name' => 'required|string|max:255',
            ]
        );

        $category = ProductCategory::findOrFail($id);
        
        $category->update($validated);
        return redirect()
            ->route('categories.index')
            ->with('success', "Data berhasil diupdate");

        
    }

    public function destroy($id){
        $category = ProductCategory::findOrFail($id);
        $name = $category->category_name;
        
        $category->delete();

        return redirect()->route('categories.index')->with('success',"{$name} berhasil dihapus" );
    }
}
