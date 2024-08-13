<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return response()->json([
                "status"=> false,
                "message"=> "Unauthorized",
            ], 401);
        }

        if (Auth::user()->hasRole('user')) {
            return response()->json([
                "status"=> false,
                "message"=> "No permission: User role",
                "role" => Auth::guard('api')->user()->role,
            ], 403);
        }

        return $next($request);
    }
}
