<?php
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\VideoCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\EventTourController;
use App\Models\VideoCategory;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('index');
})->name('home');

Route::get('/login',[AuthenticatedSessionController::class, 'create'])->
    middleware('guest')->name('login');    

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

Route::get('register',[RegisteredUserController::class, 'create'])
    ->middleware('guest')
    ->name('register');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('product', [ProductController::class, 'index'])->name('product.index');

    Route::get('product/create', [ProductController::class, 'create'])->name('product.create');
    Route::post('product', [ProductController::class, 'store'])->name('product.store');
    Route::get('product/{id}/edit', [ProductController::class, 'edit'])->name('product.edit');
    Route::put('product/{id}', [ProductController::class, 'update'])->name('product.update');
    Route::delete('product/{id}', [ProductController::class, 'destroy'])->name('product.destroy');

    Route::get('product/categories/', [ProductCategoryController::class, 'index'])->name('categories.index');
    Route::get('product/categories/create-category', [ProductCategoryController::class, 'create'])->name('categories.create-category');
    Route::post('product/categories/',[ProductCategoryController::class, 'store'])->name('categories.store');
    Route::get('product/categories/{id}/edit',[ProductCategoryController::class, 'edit'])->name('categories.edit');
    Route::put('product/categories/{id}',[ProductCategoryController::class, 'update'])->name('categories.update');
    Route::delete('product/categories/{id}',[ProductCategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('video', [VideoController::class, 'index'])->name('video.index'); 
    Route::get('video/create',[VideoController::class, 'create'])->name('video.create');
    Route::post('video',[VideoController::class, 'store'])->name('video.store');
    Route::get('video/{id}/edit',[VideoController::class,'edit'])->name('video.edit');
    Route::put('video/{id}',[VideoController::class, 'update'])->name('video.update');
    Route::delete('video/{id}',[VideoController::class, 'destroy'])->name('video.destroy');

    Route::get('video/categories/',[VideoCategoryController::class, 'index'])->name('categories.index');
    Route::get('video/categories/create',[VideoCategoryController::class, 'create'])->name('categories.create');
    Route::post('video/categories/',[VideoCategoryController::class,'store'])->name('categories.store');
    Route::get('video/categories/{id}/edit',[VideoCategoryController::class,'edit'])->name('categories.edit');
    Route::put('video/categories/{id}',[VideoCategoryController::class,'update'])->name('categories.update');
    Route::delete('video/categories/{id}',[VideoCategoryController::class, 'destroy'])->name('categories.destroy');

    Route::get('event-tour',[EventTourController::class, 'index'])->name('event.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
