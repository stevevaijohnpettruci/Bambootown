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

    Route::prefix('product/categories')->name('product.categories.')->group(function () {
        Route::get('/', [ProductCategoryController::class, 'index'])->name('index');
        Route::get('/create', [ProductCategoryController::class, 'create'])->name('create');
        Route::post('/', [ProductCategoryController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [ProductCategoryController::class, 'edit'])->name('edit');
        Route::put('/{id}', [ProductCategoryController::class, 'update'])->name('update');
        Route::delete('/{id}', [ProductCategoryController::class, 'destroy'])->name('destroy');
    });

    Route::get('video', [VideoController::class, 'index'])->name('video.index'); 
    Route::get('video/create',[VideoController::class, 'create'])->name('video.create');
    Route::post('video',[VideoController::class, 'store'])->name('video.store');
    Route::get('video/{id}/edit',[VideoController::class,'edit'])->name('video.edit');
    Route::put('video/{id}',[VideoController::class, 'update'])->name('video.update');
    Route::delete('video/{id}',[VideoController::class, 'destroy'])->name('video.destroy');

    Route::prefix('video/categories')->name('video.categories.')->group(function () {
        Route::get('/', [VideoCategoryController::class, 'index'])->name('index');
        Route::get('/create', [VideoCategoryController::class, 'create'])->name('create');
        Route::post('/', [VideoCategoryController::class,'store'])->name('store');
        Route::get('/{id}/edit', [VideoCategoryController::class,'edit'])->name('edit');
        Route::put('/{id}', [VideoCategoryController::class,'update'])->name('update');
        Route::delete('/{id}', [VideoCategoryController::class, 'destroy'])->name('destroy');
    });

    Route::prefix('event-tour')->name('event.')->group(function () {
        Route::get('/', [EventTourController::class, 'index'])->name('index');
        Route::get('/create', [EventTourController::class, 'create'])->name('create');
        Route::post('/',[EventTourController::class, 'store'])->name('store');
        Route::get('/{id}/edit',[EventTourController::class, 'edit'])->name('edit');
        Route::put('/{id}',[EventTourController::class,'update'])->name('update');
        Route::delete('/{id}',[EventTourController::class, 'destroy'])->name('destroy');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
