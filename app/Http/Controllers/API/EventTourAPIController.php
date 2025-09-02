<?php 

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\Request;
use App\Models\EventTour;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class EventTourAPIController extends Controller{
    public function index(Request $request){
        $category_search = $request->input('search');

        $event_data = EventTour::query()
            ->when($category_search, function ($query, $category_search) {
                $query->where('event_name', 'like', "{$category_search}%");
            })
            ->paginate(5)
            ->withQueryString();

        return response()->json([
            'success' => true,
            'message' => $event_data->isEmpty() ? 'Tidak dapat menemukan produk!' : 'Produk berhasil diterima!',
            'event' => $event_data
        ]);
    }
}