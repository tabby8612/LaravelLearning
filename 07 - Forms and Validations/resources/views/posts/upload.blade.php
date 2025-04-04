{{-- @extends("layouts/app") --}}
@extends("layouts.app")

@section('title', 'Upload Files')

@section("content")

    <form action="/uploadfile" method="post" enctype="multipart/form-data">
        @csrf
        <div class="form-group">
            <input type="file" class="form-control-file" name="fileToUpload" id="exampleInputFile" style="border: 2px solid black;">
        </div>
        <button type="submit" class="btn btn-primary" style="border: 2px solid red;">Submit</button>
    </form>

@endsection