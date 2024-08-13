<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePropertyRequest;
use Illuminate\Http\Request;
use App\Http\Requests\UpdatePropertyRequest;
use App\Http\Resources\PropertyResource;
use App\Models\Property;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $collection = PropertyResource::collection(Property::all());

        if ($collection->count() == 0) {
            return response()->json([
                'status' => false,
                'message'=> 'No properties found'
            ], 404);
        }

        return $collection;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {
        try {
            $validated = $request->validated();

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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
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

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, Property $property)
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
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

    public function isOwn(Property $property) {
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
