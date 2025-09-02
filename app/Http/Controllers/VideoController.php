<?php

namespace App\Http\Controllers;

use App\Models\Video;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Helper\YoutubeHelper;
class VideoController extends Controller
{
    //
    public function index(Request $request ){
        $search = $request->input('search');

        $data_videos = Video::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "{$search}%");
            })
            ->paginate(10)
            ->withQueryString();

        $data_videos->getCollection()->transform(function ($video) {
            $video->thumbnail_path = asset('storage/' . $video->thumbnail_path);
            return $video;
        });

        return Inertia::render('dashboard/video/index', [
                'products' => $data_videos,
                'filters' => [
                    'search' => $search,
                ]
            ]);
    }

    public function create(){
        return Inertia::render('dashboard/video/create');
    }

    public function store(Request $request){
        $parsedUrl = YoutubeHelper::parseUrl($request->video_url);

        if(!$parsedUrl){
            return back()->withErrors(['video_url' => 'Url tidak valid']);
        }
        Video::create([
        'name' => $request->name,
        'video_url' => $request->video_url,
        'category' => $request->category,
        'description' => $request->description,
        'thumbnail_url' => $parsedUrl['thumbnailHd'],
        'embed_url' => $parsedUrl['embedUrl'], 
        ]);

        return redirect()->route('video.index')->with('success', 'Video berhasil disimpan!');
    }

    public function edit($id){
        $data_video = Video::findOrFail($id);
        return Inertia::render('dashboard/video/edit',[
            'video' => $data_video,
        ]);
    }
    
    public function update(Request $request, $id){

        $parsedUrl = YoutubeHelper::parseUrl($request->video_url);

        if(!$parsedUrl){
            return back()->withErrors(['video_url' => 'Url tidak valid']);
        }
        $validated = $request->validate([
            'name' => 'string|max:255|required',
            'video_url' => 'string|max:255|required',
            'category' => 'string|max:255|required',
            'description' => 'string|max:255|required',
        ]);
        
        $validated['embed_url'] = $parsedUrl['embed_url'];
        $validated['thumbnail_url'] = $parsedUrl['thumbnail_url'];

        $video = Video::findOrFail($id);
        $video->update($validated);

        return redirect()
            ->route('video.index')
            ->with('success', "Data berhasil diupdate");
    }
    
    public function destroy($id){
        $data_video = Video::findOrFail($id);
        $video_name = $data_video->name;

        $data_video->delete();
        return redirect()->route('video.index')->with('success',"{$video_name} berhasil dihapus" );
    }
}
