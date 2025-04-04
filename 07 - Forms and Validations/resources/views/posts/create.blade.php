{{-- @extends("layouts/app") --}}
@extends("layouts.app")

@section('title', 'Post Creation Page')

@section("content")

@if ($errors->any())
    <div class="alert alert-danger">

        <ul>

            @foreach ($errors->all() as $error)

                <li>{{ $error }}</li>

            @endforeach

        </ul>

    </div>
@endif

<form action="/post" method="post" style="">
@csrf
    <input type="text" value="{{old("title")}}" name="title" class="bg-white" style="border: 2px solid black; margin-right: 10px;">
    <input type="submit" value="Enter Data" style="margin-left: 10px; border: 2px solid black; cursor: pointer;">

</form>

@endsection