import { PostContext as PostContextContact } from '@/pages/contact';
import { PostContext } from '@/pages/homepage';
import { SinglePostContext } from '@/pages/SinglePost';
import { usePage } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { useContext } from 'react';

type Tag = {
    id: string;
    tag_name: string;
};

type Category = {
    id: string;
    category_name: string;
};

type PageProps = {
    tags: Tag[];
    categories: Category[];
};

export default function Sidebar() {
    const { tags, categories } = usePage<PageProps>().props;

    let data = [];
    const HomePostData = useContext(PostContext) ?? [];
    const ContactPostData = useContext(PostContextContact) ?? [];
    const SinglePostData = useContext(SinglePostContext) ?? [];

    const curPage = window.location.pathname.split('/')[1];

    if (curPage === 'contact') {
        data = ContactPostData;
    } else if (curPage === 'post') {
        data = SinglePostData;
    } else {
        data = HomePostData;
    }

    //-- Array.from is shortcut to create array from iterable
    //-- and pass mapping function.
    const pageTitles: string[] = [];

    data.forEach((el) => pageTitles.push(el.title));

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
            <div id="posts">
                <div className="bg-primary-text mt-9 rounded-t-md text-center text-2xl font-bold text-black">
                    <h1>Posts</h1>
                </div>
                <div className="max(h-20, h-full) relative bg-white py-5 pl-2.5 text-black">
                    <ul>
                        {pageTitles.map((el) => (
                            <li key={el} className="mb-2.5">
                                {el}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div id="pages">
                <div className="bg-primary-text mt-9 rounded-t-md text-center text-2xl font-bold text-black">
                    <h1>Pages</h1>
                </div>
                <div className="max(h-20, h-full) relative mb-6 bg-white py-5 pl-2.5 text-black">
                    <ul>
                        <li className="my-2.5">
                            <a href="/" className="text-primary-dark hover:border-b-2 hover:border-amber-300">
                                Home
                            </a>
                        </li>
                        <li className="my-2.5">
                            <a href="/posts/all" className="text-primary-dark hover:border-b-2 hover:border-amber-300">
                                All Posts
                            </a>
                        </li>
                        <li className="my-2.5">
                            <a href="/contact" className="text-primary-dark hover:border-b-2 hover:border-amber-300">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="categories">
                <div className="bg-primary-text mt-9 rounded-t-md text-center text-2xl font-bold text-black">
                    <h1>Categories</h1>
                </div>
                <div className="max(h-20, h-full) relative mb-6 bg-white py-5 pl-2.5 text-black">
                    <ul>
                        {categories.map((el) => (
                            <li className="my-2.5" key={el.id}>
                                <a href="/" className="text-primary-dark hover:border-b-2 hover:border-amber-300">
                                    {el.category_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div id="tags">
                <div className="bg-primary-text mt-9 rounded-t-md text-center text-2xl font-bold text-black">
                    <h1>Tags</h1>
                </div>
                <div className="max(h-20, h-full) relative mb-6 bg-white py-5 pl-2.5 text-black">
                    <ul>
                        {tags.map((el) => (
                            <li className="my-2.5" key={el.id}>
                                <a href="/" className="text-primary-dark hover:border-b-2 hover:border-amber-300">
                                    {el.tag_name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
