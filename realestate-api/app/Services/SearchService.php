<?php

namespace App\Services;

use App\Models\Property;
use App\Http\Requests\SearchPropertyRequest;
use Illuminate\Validation\ValidationException;

class SearchService
{
  public static function searchProperty(SearchPropertyRequest $request) {
    $query = Property::query();

    if ($request->has("query")) {
      $queryy = $request->input('query');
      $query = $query->where("title", "like", "%" . $queryy . "%");
    }
    if ($request->has("minPrice")) {
      $query->where("price",">=", $request->minPrice);
    }
    if ($request->has("maxPrice")) {
      $query->where("price","<=", $request->maxPrice);
    }
    if ($request->has("minRating")) {
      if ($request->minRating != 0) {
        $query->where("rating",">=", $request->minRating);
      }
    }
    if ($request->has("maxRating")) {
      $query->where("rating","<=", $request->maxRating);
    }
    if ($request->has("orderBy")) {
      if ($request->orderBy == "date-asc") {
        $query->orderBy("created_at", "asc");
      } else if($request->orderBy == "date-desc") {
        $query->orderBy("created_at", "desc");
      } else if($request->orderBy == "rating-desc") {
        $query->orderBy("rating", "desc");
      } else if($request->orderBy == "price-desc") {
        $query->orderBy("price", "desc");
      } else if($request->orderBy == "price-asc") {
        $query->orderBy("price", "asc");
      }
    }

    return $query->get();
  }


}
