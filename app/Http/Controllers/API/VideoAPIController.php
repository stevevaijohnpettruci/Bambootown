<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Video;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Helper\YoutubeHelper;

class VideoAPIController extends Controller{
    public function index(Request $request){
        $search = $request->input('search');

        $data_videos = Video::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "{$search}%");
            })
            ->paginate(10)
            ->withQueryString();

        return response()->json([
            'success' => true,
            'message' => $data_videos->isEmpty() ? 'Tidak dapat menemukan video!' : 'Produk berhasil diterima!',
            'videos' => $data_videos
        ]);
    }
    public function show($id)
    {
        $data_video = Video::find($id);
        
        if (!$data_video) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak dapat menemukan videos!',
                'data' => null
            ], 404); 
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil diterima!',
            'data' => $data_video
        ]);
    }

    public function store(Request $request){
        $parsedUrl = YoutubeHelper::parseUrl($request->video_url);

        if(!$parsedUrl){
            return back()->withErrors(['video_url' => 'Url tidak valid']);
        }
        try {
            // Validasi input
            $validated = $request->validate([
                'name' => $request->name,
                'video_url' => $request->video_url,
                'category' => $request->category,
                'description' => $request->description,
                'thumbnail_url' => $parsedUrl['thumbnailHd'],
                'embed_url' => $parsedUrl['embedUrl'],  // 5MB max
            ]);

            // Create Video
            $product = Video::create($validated);


            return response()->json([
                'success' => true,
                'message' => 'Video berhasil ditambahkan!',
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
}