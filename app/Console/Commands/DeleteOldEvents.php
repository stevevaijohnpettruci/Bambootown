<?php

namespace App\Console\Commands;
use App\Models\EventTour;
use Illuminate\Console\Command;
use Carbon\Carbon;

class DeleteOldEvents extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'events:delete-today';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete event & tour where event_date is today';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $today = Carbon::today()->toDateString();
        $deletedEvents = EventTour::whereDate('event_date', $today)->delete();

        $this->info("$deletedEvents event (s) deleted for date $today");

    }
}
