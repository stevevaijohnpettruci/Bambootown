<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\VideoCategory;
use Illuminate\Http\Request;

class VideoCategoryController extends Controller
{
    //
    public function index(Request $request){
        $categories_search = $request->input('search');
        $video_categories = VideoCategory::query()
            ->when($categories_search, function ($query, $categories_search) {
                $query->where('category_name', 'like', "{$categories_search}%");
            })
            ->paginate(10)
            ->withQueryString();
        
        return Inertia::render('dashboard/video/categories/index', [
                'categories' => $video_categories,
                'filters' => [
                    'search' => $categories_search,
                    
                ]
            ]);
    }

    public function create(){
        return Inertia::render('dashboard/video/categories/create');
    }

    public function store(Request $request){
        $validated = $request->validate(
            [
                'category_name' => 'required|string|max:255',
                ]
            );
            
        VideoCategory::create($validated);
        return redirect()->route('categories.index')->with('success',"Data berhasil ditambahkan" );
    }

    public function edit($id){
        $video_categories = VideoCategory::findOrFail($id);
        return Inertia::render('dashboard/video/categories/edit',[
            'video_categories' => $video_categories,
        ]);
        
    }

    public function update(Request $request, $id){
        $validated = $request->validate(
            [
                'category_name' => 'required|string|max:255',
            ]
        );

        $category = VideoCategory::findOrFail($id);
        
        $category->update($validated);
        return redirect()
            ->route('categories.index')
            ->with('success', "Data berhasil diupdate");
    }

    public function destroy($id){
        $category = VideoCategory::findOrFail($id);
        $name = $category->category_name;
        
        $category->delete();

        return redirect()->route('categories.index')->with('success',"{$name} berhasil dihapus" );
    }
}
