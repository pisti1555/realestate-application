<?php

namespace App\Http\Controllers;

use App\Services\PropertyService;
use App\Models\Property;
use App\Http\Requests\SearchPropertyRequest;
use App\Http\Requests\StorePropertyRequest;
use App\Http\Requests\UpdatePropertyRequest;
use App\Services\SearchService;

class PropertyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PropertyService::getAll();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePropertyRequest $request)
    {
        return PropertyService::store($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return PropertyService::getProperty($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePropertyRequest $request, Property $property)
    {
        return PropertyService::update($request, $property);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Property $property)
    {
        return PropertyService::destroy($property);
    }

    public function isOwn(Property $property) {
        return PropertyService::isOwn($property);
    }

    public function searchProperty(SearchPropertyRequest $request) {
        return SearchService::searchProperty($request);
    }
}
