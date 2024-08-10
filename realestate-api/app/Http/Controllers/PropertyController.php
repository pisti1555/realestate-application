<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Models\Property;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
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
                'status' => 'error',
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
            if (!Auth::check()) {
                return response()->json([
                    'status'=> 'error',
                    'message'=> 'Unauthorized'
                ]);
            }

            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'status'=> 'error',
                    'message'=> 'Couldnt find user'
                ]);
            }

            if (!$user->isAgent()) {
                return response()->json([
                    'status'=> 'error',
                    'message'=> 'No permission'
                ]);
            }

            $validate = Validator::make($request->all(), [
                "title"=>["required", "string"],
                "price"=> ["required", "numeric"],
                "city"=> ["required", "string"],
                "postal_code"=> ["required", "string"],
                "address"=> ["required", "string"],
                "description"=> ["required", "string"],
            ]);
    
            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message'=> 'Validation error',
                    'errors' => $validate->errors(),
                ], 401);
            }
    
            $property = $user->properties()->create([
                "title"=>$request->title,
                "price"=> $request->price,
                "city"=> $request->city,
                "postal_code"=> $request->postal_code,
                "address"=> $request->address,
                "description"=> $request->description,
            ]);
    
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
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, Property $property)
    {
        try {
            if (!Auth::check()) {
                return response()->json([
                    'status'=> 'error',
                    'message'=> 'Unauthorized'
                ], 401);
            }

            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'status'=> 'error',
                    'message'=> 'Couldnt find user'
                ], 401);
            }

            if (!$user->isAgent()) {
                return response()->json([
                    'status'=> 'error',
                    'message'=> 'No permission: not an agent'
                ], 401);
            }

            if (!$user->properties->contains($property)) {
                return response()->json([
                    'status'=> 'error',
                    'message'=> 'No permission: can not edit somebody elses property'
                ], 401);
            }

            $validate = Validator::make($request->all(), [
                "title"=>["required", "string"],
                "price"=> ["required", "numeric"],
                "city"=> ["required", "string"],
                "postal_code"=> ["required", "string"],
                "address"=> ["required", "string"],
                "description"=> ["required", "string"],
            ]);
    
            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message'=> 'Validation error',
                    'errors' => $validate->errors(),
                ], 401);
            }
    
            $property->update([
                "title"=>$request->title,
                "price"=> $request->price,
                "city"=> $request->city,
                "postal_code"=> $request->postal_code,
                "address"=> $request->address,
                "description"=> $request->description,
            ]);
    
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
        //
    }
}
