<?php

namespace App\Services;

use App\Models\Message;
use App\Http\Resources\MessageResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreMessageRequest;

class MessageService
{
  public static function getReceivedMessages() {
    $receivedMessages = Message::where('receiver', Auth::id())->latest()->get();
    return MessageResource::collection($receivedMessages);
  }

  public static function getSentMessages() {
    $sentMessages = Message::where('sender', Auth::id())->latest()->get();
    return MessageResource::collection($sentMessages);
  }

  public static function sendMessage(StoreMessageRequest $request) {
    $validated = $request->validated();
      $validated['sender'] = Auth::id();

      $senderRole = User::findOrFail($validated['sender'])->role;
      $receiverRole = User::findOrFail($validated['receiver'])->role;

      if ($validated['receiver'] == $validated['sender']) {
        return response()->json([
          'status' => 403,
          'message' => 'Cannot send a message to yourself'
        ], 403);
      }

      if ($senderRole == $receiverRole) {
        return response()->json([
          'status' => 403,
          'message' => 'Unable to send message to the receiver'
        ], 403);
      }

      Message::create($validated);
      return response()->json([
        'status' => 200,
        'message' => $validated
      ], 201);
  }

  public static function getMessage(Message $message) {
    if ($message->receiver == Auth::id()) {
      if ($message->seen == false) {
        $message->seen = true;
        $message->save();
      }
      return new MessageResource($message);
    } else if ($message->sender == Auth::id()) {
      return new MessageResource($message);
    } else {
      return response()->json([
        'status' => 403,
        'message' => 'Do not have permission to view this message'
      ], 403);
    }
  }

}
