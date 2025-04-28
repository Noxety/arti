<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::all();
        return Inertia::render('AdminPanel/Client/index', [
            'message' => 'Hello from ClientController',
            'user' => Auth::user(),
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('AdminPanel/Client/create', [
            'message' => 'Hello from ClientController',
            'user' => Auth::user()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'phone' => 'nullable|string|max:255',
            'companyName' => 'nullable|string|max:255',
            'companyAddress' => 'nullable|string|max:255',
            'companyPhone' => 'nullable|string|max:255',
            'companyEmail' => 'nullable|string|email|max:255',
            'isActive' => 'nullable|boolean',
        ]);

        $client = Client::create($validated);

        return response()->json([
            'message' => 'Client created successfully.',
            'client' => $client,
        ], 201); // 201 Created
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getallClients()
    {
        $clients = Client::all();
        dd($clients);
        return response()->json([
            'clients' => $clients,
            'message' => 'Clients retrieved successfully.',
        ], 200);
        
    }
}
