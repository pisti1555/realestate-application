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
    if ($request->has('orderby')) {
      $orderBy = $request->query('orderby');
      
      switch ($orderBy) {
          case 'date-desc': {
            $query->orderBy('created_at', 'desc');
            break;
          }
          case 'date-asc': {
            $query->orderBy('created_at', 'asc');
            break;
          }
          case 'rating-desc': {
            $query->orderBy('rating', 'desc');
            break;
          }
          case 'price-asc': {
            $query->orderBy('price', 'asc');
              break;
          } 
          case 'price-desc': {
            $query->orderBy('price', 'desc');
            break;
          } 
          default: {
            $query->orderBy('created_at', 'desc');
          }
      }
  }

    return $query->get();
  }


}
