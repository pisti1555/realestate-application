<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Models\Property;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;

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
                'status' => 'error',
                'message'=> 'No properties found'
            ], 404);
        }

        return $collection;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Property $property)
    {
        $property = Property::find($property->id);
        if (!$property) {
            return response()->json([
                'status'=> 'error',
                'message'=> 'Property not found with the given ID'
            ], 404);
        }

        $resource = new PropertyResource($property);
        if (!$resource) {
            return response()->json([
                'status'=> 'error',
                'message'=> 'Resource could not be created from the given property'
            ], 404);
        }
        return $resource;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Property $property)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, Property $property)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        //
    }
}
