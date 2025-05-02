<!DOCTYPE html>
<html>
<x-head />

<body class="bg-black">
    <x-nav-bar />
    <div class=" text-white py-12 flex justify-center items-center">
        <div class=" mx-auto flex flex-col justify-center items-center">
            <h1 class="text-center text-4xl font-semibold">Let's Find Your Next Job</h1>    
            <form class="my-2">
                <input type="text" class="  rounded text-xl px-2 py-1 outline-0" placeholder="web developer...">
            </form>
        </div>
    </div>
    <x-featured-job />
    <x-tags />
    <x-recent-jobs />

</body>
</html>
