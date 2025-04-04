{{-- @extends("layouts/app") --}}


@extends("layouts.app")

@section('title', 'Showing Titles')

@section("content")



<ul>
@foreach ($data as $entry)
    <img src="{{ $entry->path }}" alt="">
    <li style="list-style: square;">
    <a style="text-decoration: underline;" href="{{ route("post.show", ["post" => $entry->id]) }}">
    {{ $entry->title }}</a> -
    <a href="{{ route("post.edit", ["post" => $entry->id]) }}">edit</a> </li>
@endforeach
</ul>

@endsection