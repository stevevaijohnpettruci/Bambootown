<?php

namespace App\Http\Controllers;
use App\Models\EventTour;
use App\Models\ProductCategory;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class EventTourController extends Controller
{
    //
    public function index(Request $request){
        $search = $request->input('search');

        $data_event = EventTour::query()
            ->when($search, function ($query, $search) {
                $query->where('event_name', 'like', "{$search}%");
            })
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('dashboard/event-tour/index', [
                'event_tour' => $data_event,
                'filters' => [
                    'search' => $search,
                    
                ]
            ]);
    }
}
