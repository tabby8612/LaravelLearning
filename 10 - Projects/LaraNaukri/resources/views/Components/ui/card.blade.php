@props(["jobsData"])

@foreach ($jobsData as $job)

    @if ($job->featured)
        <div id="featuredJobCard" class=" px-5 text-white font-sans">
                <div id="cardHeader">
                    <h1>{{$job->employer->name}}</h1>            
                </div>
            <div id="cardBody" class="w-3xs p-10 font-bold text-center">
                <h1>{{$job->title}}</h1>            
            </div>
            <div id="cardFooter" class="flex justify-between items-center">
                <div id="tags" >
                    <ul class="flex gap-3 text-[0.7rem]">
                        @foreach ($job->tags as $tag)
                            <li>{{ $tag->name }}</li>                       
                        @endforeach
                    </ul>
                </div>
                <img src="https://placehold.co/42/navy/white" alt="company logo">
            </div>
        </div>
    @endif
    
@endforeach


