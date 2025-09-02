<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProductCategory;
class Product extends Model
{
    //
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'id',
        'name',
        'price',
        'size',
        'product_description',
        'category_id',
        'product_availables',
        'product_link',
        'image_path',
    ];

    public function categoryId(){
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }
}
