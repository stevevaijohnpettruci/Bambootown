<?php

namespace App\Models;

use App\Models\VideoCategory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Video extends Model
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
        'video_url',
        'category',
        'description',
        'thumbnail_url',
        'embed_url'
    ];
    public function categoryId(){
        return $this->belongsTo(VideoCategory::class, 'category');
    }
}
