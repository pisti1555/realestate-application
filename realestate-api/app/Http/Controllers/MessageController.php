<?php

namespace App\Http\Controllers;

use App\Services\MessageService;
use App\Models\Message;
use App\Http\Requests\StoreMessageRequest;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MessageService::getReceivedMessages();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        return MessageService::sendMessage($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        return MessageService::getMessage($message);
    }

    public function sentMessages() {
        return MessageService::getSentMessages();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
