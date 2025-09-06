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

    public function create(){
        
        return Inertia::render('dashboard/event-tour/create');
    }

    
    public function store(Request $request){
        $validated = $request->validate([
            'event_name'        =>  'required|string|max:255',
            'event_description' =>  'required|string|max:255',
            'event_date'        =>  'required|date_format:Y-m-d',
            'event_address'     =>  'required|string|max:255',
            'event_ticket_link' =>  'required|string|max:255',
        ]);

        EventTour::create($validated);
        return redirect()->route('event.index')->with('success',"Data berhasil ditambahkan");
    }

    public function edit($id){
        $data_event = EventTour::findOrFail($id);
        return Inertia::render('dashboard/event-tour/edit',[
            'event' => $data_event,
        ]);
    }

    public function update(Request $request, $id){
        $validated = $request->validate([
            'event_name'        =>  'required|string|max:255',
            'event_description' =>  'required|string|max:255',
            'event_date'        =>  'required|date_format:Y-m-d',
            'event_address'     =>  'required|string|max:255',
            'event_ticket_link' =>  'required|string|max:255',
        ]);

        $event = EventTour::findOrFail($id);

        $event->update($validated);

        return redirect()
            ->route('event.index')
            ->with('success', "Data berhasil diupdate");
    }

    public function destroy($id){
        $event = EventTour::findOrFail($id);
        $event_name = $event->name;
        $event->delete();

        return redirect()->route('event.index')->with('success',"Data $event_name Berhasil dihapus");
    }
}
