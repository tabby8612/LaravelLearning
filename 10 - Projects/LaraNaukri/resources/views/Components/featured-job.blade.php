@props(["jobsData"])

<div id="featuredSection" class=" w-6xl mt-10 mx-auto px-2 py-3">
    
    <x-ui.heading>Featured Jobs</x-ui.heading>

    <div id="featuredJobs" class="flex justify-between">
        
        
        <x-ui.card :$jobsData />
        
    </div>

</div>