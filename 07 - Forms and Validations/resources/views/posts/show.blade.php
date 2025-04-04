{{-- @extends("layouts/app") --}}


@extends("layouts.app")

@section('title', 'Showing Post')

@section("content")



<h1>{{ $post->title }}</h1>
<p>{{ $post->content }}</p>

@endsection