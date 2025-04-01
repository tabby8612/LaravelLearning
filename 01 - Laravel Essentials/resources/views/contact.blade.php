{{-- @extends("layouts/app") --}}
@extends("layouts.app")

@section('title', 'Contact Page')

@section("content")

@if (!empty($people))
    <ul class="m-2 bg-amber-400">
        @foreach ($people as $person)
            <li>{{ $person }}</li>        
        @endforeach
    
    </ul>

@endif

<h1 class="bg-amber-600 text-amber-50">Hello From {{ $name }} of {{ $age }} age Using Layout</h1>

@endsection