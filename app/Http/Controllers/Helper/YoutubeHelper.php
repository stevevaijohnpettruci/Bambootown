<?php 

namespace App\Http\Controllers\Helper;
class YoutubeHelper{
    public static function parseUrl($url){
        $videoId = null;

        // youtube.com/watch?v=ID
        if (preg_match('/v=([^&]+)/', $url, $matches)) {
            $videoId = $matches[1];
        }
        // youtu.be/ID
        elseif (preg_match('#youtu\.be/([^?]+)#', $url, $matches)) {
            $videoId = $matches[1];
        }

        if (!$videoId) {
            return null;
        }

        return [
            'videoId'      => $videoId,
            'thumbnail_url'  => "https://img.youtube.com/vi/{$videoId}/maxresdefault.jpg",
            'embed_url'     => "https://www.youtube.com/embed/{$videoId}",
        ];
    }
}