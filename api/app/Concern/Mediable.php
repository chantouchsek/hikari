<?php

namespace App\Concern;

use App\Models\Media;

trait Mediable
{
    /**
     * Check if the resource has a media
     *
     * @param integer $image
     * @return boolean
     */
    public function hasMedia($image): bool
    {
        return $this->media->where('id', $image)->isNotEmpty();
    }

    /**
     * Get all of the resource's media.
     */
    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }
}