<div id="tagsSection" class=" w-6xl mt-5 mx-auto px-2 py-3">
    
    <x-ui.heading>Tags</x-ui.heading>

    <div id="jobtags" class=" text-white px-5">
        <ul class="flex gap-4">
            @foreach ($tags as $tag)
                <li>{{ $tag->name }}</li>            
            @endforeach
        </ul>
    </div>
    

</div>