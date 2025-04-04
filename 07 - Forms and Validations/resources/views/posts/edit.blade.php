{{-- @extends("layouts/app") --}}
@extends("layouts.app")

@section('title', 'Post Creation Page')

@section("content")

<form action="/post/{{$post->id}}" method="POST">
    <input type="hidden" name="_method" value="PUT">
    {{-- @method("PUT")  --}}
    @csrf
    <input type="text" name="title" value="{{ $post->title }}" class="bg-white" style="border: 2px solid black; margin-right: 10px;">
    <input type="submit" value="Edit Data" style="margin-left: 10px; border: 2px solid black; cursor: pointer;">

</form>

<form action="/post/{{$post->id}}" method="post">
@method("DELETE")
@csrf

<input type="submit" value="Delete" style="margin-left: 10px; border: 2px solid black; cursor: pointer;">

</form>

@endsection