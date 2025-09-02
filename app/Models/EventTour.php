<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventTour extends Model
{
    //
     use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */ 
    protected $table = 'events_and_tours';
    protected $fillable = [
        'id',
        'event_name',
        'event_description',
        'event_date',
        'event_address',
        'event_ticket_link',
    ];
}
