<?php

namespace App\Http\Controllers;

use App\Http\Resources\MessageResource;
use App\Models\Message;
use App\Http\Requests\StoreMessageRequest;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Message::where('receiver', Auth::id())->get();
        return MessageResource::collection($messages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        $validated = $request->validated();
        $validated['sender'] = Auth::id();
        Message::create($validated);
        return response()->json([
            'status' => 200,
            'message' => $validated
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        if ($message->receiver == Auth::id() || $message->sender == Auth::id()) {
            return new MessageResource($message);
        } else {
            return response()->json([
                'status' => 403,
                'message' => 'Do not have permission to view this message'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
