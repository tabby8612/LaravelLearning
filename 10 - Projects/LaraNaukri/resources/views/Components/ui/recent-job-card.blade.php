@props([
    "jobsData"
])



@foreach ($jobsData as $job)
    @if (!$job->featured)
        <div id="jobpost" class="flex rounded-xl py-2 px-4 border-2 hover:border-slate-700 transition-all duration-700 group cursor-pointer">
        <div id="jobimg" class="size-35 rounded-[5px] text-white">
            
            <div class="rounded-2xl mr-1">
                <img src="https://picsum.photos/seed/{{ random_int(154,1555) }}/130" alt="Job Post Image" class="rounded-[10px]">
            </div>

        </div>
        <div id="jobdetails" class="flex-1/2 pl-3 text-white">            
            
            <p class="text-slate-400">{{$job->employer->name}}</p>
            <h1 class="text-white text-2xl font-bold py-2 group-hover:text-blue-500 transition-colors duration-700">{{$job->title}}</h1>
            <p class="text-white pt-4">{{$job->salary}}</p>
        </div>
        {{-- @php dd($job); @endphp --}}
        <div id="jobtags">
            <ul class="flex text-white gap-3">
                @foreach ($job->tags as $tag)
                    <li class="py-1 px-2 bg-slate-700 rounded-[10px] cursor-pointer hover:bg-slate-600 text-[13px]">{{$tag->name}}</li>
                    
                @endforeach
                
            </ul>
        </div>
    </div>  
    @endif    
@endforeach



{{-- 
<div id="jobpost" class="flex rounded-xl py-2 px-4 border-2 hover:border-slate-700 transition-all duration-700 group">
    <div id="jobimg" class="size-35 rounded-[5px] text-white">
        
        <div class="rounded-2xl mr-1">
            <img src="https://picsum.photos/seed/{{ random_int(154,1555) }}/130" alt="Job Post Image" class="rounded-[10px]">
        </div>

    </div>
    <div id="jobdetails" class="flex-1/2 pl-3 text-white">            
        
        <p class="text-slate-400">Laracasts</p>
        <h1 class="text-white text-2xl font-bold py-2 group-hover:text-blue-500 transition-colors duration-700">Video Designer</h1>
        <p class="text-white pt-4">Full Time - From $60,000</p>
    </div>
    
    <div id="jobtags">
        <ul class="flex text-white gap-3">
            <li class="py-1 px-2 bg-slate-700 rounded-[10px] cursor-pointer hover:bg-slate-600 text-[13px]">Tag</li>
            <li class="py-1 px-2 bg-slate-700 rounded-[10px] cursor-pointer hover:bg-slate-600 text-[13px]">Tag</li>
            <li class="py-1 px-2 bg-slate-700 rounded-[10px] cursor-pointer hover:bg-slate-600 text-[13px]">Tag</li>            
        </ul>
    </div>
</div> --}}