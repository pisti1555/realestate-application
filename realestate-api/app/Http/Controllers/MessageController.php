<?php

namespace App\Http\Controllers;

use App\Services\MessageService;
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
        return MessageService::getReceivedMessages(Auth::id());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMessageRequest $request)
    {
        return MessageService::sendMessage(Auth::id(), $request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        return MessageService::getMessage(Auth::id(), $message);
    }

    public function sentMessages() {
        return MessageService::getSentMessages(Auth::id());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
