<?php

namespace App\Services;

use App\Models\Message;
use App\Http\Resources\MessageResource;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreMessageRequest;

class MessageService
{
  public static function getReceivedMessages() {
    $receivedMessages = Message::where('receiver', Auth::id())->get();
    return MessageResource::collection($receivedMessages);
  }

  public static function getSentMessages() {
    $sentMessages = Message::where('sender', Auth::id())->get();
    return MessageResource::collection($sentMessages);
  }

  public static function sendMessage(StoreMessageRequest $request) {
    $validated = $request->validated();
      $validated['sender'] = Auth::id();
      Message::create($validated);
      return response()->json([
        'status' => 200,
        'message' => $validated
      ], 201);
  }

  public static function getMessage(Message $message) {
    if ($message->receiver == Auth::id() || $message->sender == Auth::id()) {
      return new MessageResource($message);
    } else {
      return response()->json([
        'status' => 403,
        'message' => 'Do not have permission to view this message'
      ]);
    }
  }

}
