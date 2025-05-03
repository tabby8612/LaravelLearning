@props(
    [
        "jobsData"
    ]
)

<div id="tagsSection" class=" w-6xl mt-5 mx-auto px-2 py-3">
    
    <x-ui.heading>Recent Jobs</x-ui.heading>
    
   
    
    <x-ui.recent-job-card :$jobsData  />
    
</div>