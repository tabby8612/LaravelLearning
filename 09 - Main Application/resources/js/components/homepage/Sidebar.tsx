import { SearchIcon } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="max-[h-screen, h-full] bg-primary-dark px-auto mr-5 w-[20%] px-5 text-white">
            <div id="search">
                <div className="bg-primary-text mt-9 rounded-t-md text-center text-2xl font-bold text-black">
                    <h1>Search</h1>
                </div>
                <div className="relative mb-6 h-full bg-white py-5 pl-2.5 text-black">
                    <input type="Search" className="rounded-md pl-1" placeholder="Search..." />
                    <SearchIcon className="absolute top-6 right-4 size-4" />
                </div>
            </div>
            <div id="search">
                <div className="bg-primary-text mt-9 rounded-t-md text-center text-2xl font-bold text-black">
                    <h1>Posts</h1>
                </div>
                <div className="max(h-20, h-full) relative bg-white py-5 pl-2.5 text-black">
                    <ul>
                        <li>Post 1</li>
                        <li>Post 2</li>
                        <li>Post 3</li>
                    </ul>
                </div>
            </div>
            <div id="search">
                <div className="bg-primary-text mt-9 rounded-t-md text-center text-2xl font-bold text-black">
                    <h1>Pages</h1>
                </div>
                <div className="max(h-20, h-full) relative mb-6 bg-white py-5 pl-2.5 text-black">
                    <ul>
                        <li>Page 1</li>
                        <li>Page 2</li>
                        <li>Page 3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
