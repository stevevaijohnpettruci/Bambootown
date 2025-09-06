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

    public function store(Request $request){
        try {
            // Validasi input
            $validated = $request->validate([
                'event_name'        =>  'required|string|max:255',
                'event_description' =>  'required|string|max:255',
                'event_date'        =>  'required|date_format:Y-m-d',
                'event_address'     =>  'required|string|max:255',
                'event_ticket_link' =>  'required|string|max:255',
            ]);

            // Create event & tour
            $event = EventTour::create($validated);
            return response()->json([
                'success' => true,
                'message' => 'Produk berhasil ditambahkan!',
                'data' => $event
            ], 201); // 201 Created status

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422); // 422 Unprocessable Entity

        } catch (Exception $e) {
            // Log the error
            Log::error('Product creation failed: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan saat menyimpan produk.',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500); // 500 Internal Server Error
        }
    }
    
    public function show($id){
        $event = EventTour::findOrFail($id);  
        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Tidak dapat menemukan produk!',
                'data' => null
            ], 404); 
        }
        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil diterima!',
            'data' => $event
        ]);
    }

    public function update(Request $request, $id){
        try{
            $validated = $request->validate([
                'event_name'        =>  'required|string|max:255',
                'event_description' =>  'required|string|max:255',
                'event_date'        =>  'required|date_format:Y-m-d',
                'event_address'     =>  'required|string|max:255',
                'event_ticket_link' =>  'required|string|max:255',
            ]);
            $event = EventTour::findOrFail($id);

            // kalau ada file baru → upload & replace
            

            $event->update($validated);
            return response()->json([
                'success'=> true,
                'message'=> 'Produk berhasil diupdate!',
                'data'=>$event->fresh(),
            ]);
            }
            catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422); // 422 Unprocessable Entity

            } catch (Exception $e) {
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