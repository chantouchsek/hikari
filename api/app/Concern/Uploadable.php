<?php

namespace App\Concern;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

trait Uploadable
{
  use Mediable;

  /**
   * Check if the post has a valid thumbnail
   *
   * @return boolean
   */
  public function hasThumbnail(): bool
  {
    return $this->hasMedia($this->thumbnail_id);
  }

  /**
   * Retrieve the post's thumbnail
   *
   * @return mixed
   */
  public function thumbnail()
  {
    return $this->media->where('id', $this->thumbnail_id)->first();
  }

  /**
   * Store and set the post's thumbnail
   *
   * @param UploadedFile $thumbnail
   * @return void
   */
  public function storeAndSetThumbnail(UploadedFile $thumbnail)
  {
    $thumbnail_name = $thumbnail->store('public/uploads/media');
    $array_data = [
      'filename' => str_replace('public/uploads/media/', '', $thumbnail_name),
      'original_filename' => $thumbnail->getClientOriginalName(),
      'mime_type' => $thumbnail->getMimeType()
    ];
    if (!$this->hasThumbnail()) {
      $media = $this->media()->create($array_data);
      $this->update(['thumbnail_id' => $media->id]);
    } else {
      $name = $this->thumbnail()->filename;
      $path = 'public/uploads/media/';
      if (Storage::disk(config('filesystem.default'))->exists($path . $name)) {
        Storage::disk(config('filesystem.default'))->delete($path . $name);
      }
      $this->thumbnail()->update($array_data);
    }
  }

  /**
   * Store and set the post's thumbnail
   *
   * @param UploadedFile $thumbnail
   * @return void
   */
  public function storeAndSetAttachFiles(UploadedFile $thumbnail)
  {
    $thumbnail_name = $thumbnail->store('public/uploads/media');
    $array_data = [
      'filename' => str_replace('public/uploads/media/', '', $thumbnail_name),
      'original_filename' => $thumbnail->getClientOriginalName(),
      'mime_type' => $thumbnail->getMimeType()
    ];
    $media = $this->media()->create($array_data);
  }

  /**
   * Store and set the media library
   *
   * @param $filename
   * @param $mimetype
   * @param $originalname
   */
  public function storeMediaLibraryByPost($filename, $mimetype, $originalname = null)
  {
    $array_data = [
      'filename' => $filename,
      'original_filename' => $originalname,
      'mime_type' => $mimetype,
    ];
    if (!$this->hasThumbnail()) {
      $media = $this->media()->create($array_data);
      $this->update(['thumbnail_id' => $media->id]);
    } else {
      $name = $this->thumbnail()->filename;
      $path = 'public/uploads/media/';
      if (Storage::disk(config('filesystem.default'))->exists($path . $name)) {
        Storage::disk(config('filesystem.default'))->delete($path . $name);
      }
      $this->thumbnail()->update($array_data);
    }
  }
}