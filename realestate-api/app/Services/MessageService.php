<?php

namespace App\Services;

use App\Models\Message;
use App\Http\Resources\MessageResource;
use App\Models\User;
use App\Http\Requests\StoreMessageRequest;
use App\Http\Requests\StoreMessageByEmail;
use Illuminate\Support\Facades\Log;

class MessageService
{
  public static function getReceivedMessages(string $id, ) {
    $receivedMessages = Message::where('receiver', $id)->latest()->get();
    return MessageResource::collection($receivedMessages);
  }

  public static function getSentMessages(string $id, ) {
    $sentMessages = Message::where('sender', $id)->latest()->get();
    return MessageResource::collection($sentMessages);
  }

  public static function sendMessage(string $id, StoreMessageRequest $request) {
    $validated = $request->validated();
      $validated['sender'] = $id;

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

  public static function sendMessageByEmail(string $id, StoreMessageByEmail $request) {
    $validated = $request->validated();
      $validated['sender'] = $id;
      $receiver = User::where('email', $validated['receiver'])->first();

      if (!$receiver) {
        return response()->json([
            'status' => 404,
            'message' => 'Receiver not found',
            'receiver' => $receiver,
            'receiver_col' => $validated['receiver']
        ], 404);
      }

      $senderRole = User::findOrFail($validated['sender'])->role;
      $receiverRole = $receiver->role;

      if ($receiver == $validated['sender']) {
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

      $validated['receiver'] = $receiver->id;
      Message::create($validated);
      return response()->json([
        'status' => 200,
        'message' => $validated
      ], 201);
  }

  public static function getMessage(string $id, Message $message) {
    if ($message->receiver == $id) {
      if ($message->seen == false) {
        $message->seen = true;
        $message->save();
      }
      return new MessageResource($message);
    } else if ($message->sender == $id) {
      return new MessageResource($message);
    } else {
      return response()->json([
        'status' => 403,
        'message' => 'Do not have permission to view this message'
      ], 403);
    }
  }

  public static function getNewMessagesCount(string $id) {
    return Message::where('receiver', $id)->where('seen', false)->count();
  }

}
