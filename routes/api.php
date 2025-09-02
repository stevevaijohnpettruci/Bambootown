<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ProductCategoryAPIController;
use App\Http\Controllers\API\ProductAPIController;
use App\Http\Controllers\API\VideoAPIController;
use App\Http\Controllers\API\VideoCategoryAPIController;
use App\Http\Controllers\API\EventTourAPIController;

Route::prefix('v1')->group(function () {
    Route::apiResource('products', ProductAPIController::class);
    Route::apiResource('products-category', ProductCategoryAPIController::class);
    Route::apiResource('videos',VideoAPIController::class);
    Route::apiResource('videos-category',VideoCategoryAPIController::class);
    Route::apiResource('event-tours',EventTourAPIController::class);
});

