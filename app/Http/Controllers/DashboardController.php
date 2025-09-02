<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

use function Termwind\render;

class DashboardController extends Controller
{
    //
    public function index(){
        return Inertia::render('dashboard/dashboard');
    }
}
