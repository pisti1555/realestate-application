<?php

namespace App\Services;

use App\Models\Property;
use App\Http\Resources\PropertyResource;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use Illuminate\Support\Facades\Auth;

class PropertyService
{
  public static function getAll() {
    $collection = PropertyResource::collection(Property::all());

    if ($collection->count() == 0) {
        return response()->json([
            'status' => false,
            'message'=> 'No properties found'
        ], 404);
    }

    return $collection;
  }

  public static function getProperty(string $id) {
    $property = Property::find($id);
    if (!$property) {
        return response()->json([
            'status'=> false,
            'message'=> 'Property not found with the given ID'
        ], 404);
    }

    $resource = new PropertyResource($property);
    if (!$resource) {
        return response()->json([
            'status'=> false,
            'message'=> 'Resource could not be created from the given property'
        ], 404);
    }

    return $resource;
  }

  public static function store(StorePropertyRequest $request) {
    try {
      $validated = $request->validated();
      $validated['rating'] = 0;

      $imgPath = $request->image->store('properties', 'public');
      $validated['image'] = env('APP_URL') . '/storage/' . $imgPath;

      $property = Auth::user()->properties()->create($validated);
      
      return response()->json([
        'status' => true,
        'message' => 'Property stored successfully',
        'property' => $property,
      ], 200);
    } catch (\Exception $e) {
        return response()->json(["error"=> $e->getMessage()], 500);
    }
  }

  public static function update(UpdatePropertyRequest $request, Property $property)
  {
      try {
          if (!Auth::user()->properties->contains($property)) {
              return response()->json([
                  'status'=> false,
                  'message'=> 'No permission: can not edit somebody elses property'
              ], 401);
          }

          $validated = $request->validated();

          if ($request->image) {
              $imgPath = $request->image->store('properties', 'public');
              $validated['image'] = env('APP_URL') . '/storage/' . $imgPath;
          }

          $property->update($validated);
  
          return response()->json([
              'status' => true,
              'message' => 'Property updated successfully',
              'property' => $property,
          ], 200);
      } catch (\Exception $e) {
          return response()->json(["error"=> $e->getMessage()], 500);
      }
  }

  public static function destroy(Property $property)
  {
      try {
          if (!Auth::user()->properties->contains($property)) {
              return response()->json([
                  'status'=> false,
                  'message'=> 'No permission: Cannot delete somebody elses property'
              ]);
          }

          $property->delete();
      } catch (\Exception $e) {
          return response()->json(["error"=> $e->getMessage()], 500);
      }
  }

  public static function isOwn(Property $property) {
    try {
      if (!Auth::user()->properties->contains($property)) {
        return response()->json([
          'status' => false,
          'message' => 'Unexpected error'
        ], 401);
      }
    } catch (\Exception $e) {
      return response()->json([
        'status' => false,
        'message' => 'Unexpected error'
      ]);
    }
  }

}
