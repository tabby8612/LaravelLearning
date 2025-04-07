import { Book } from 'lucide-react';

type Props = {
    page: string;
};

export default function NavBar({ page = 'home' }: Props) {
    const navLinkClasses = 'cursor-pointer rounded-xl px-3 py-1.5 hover:bg-blue-900';
    return (
        <nav className="bg-primary-dark flex min-h-15 w-full justify-between text-white">
            <div className="my-auto ml-7 flex gap-5">
                <Book className="mt-2 mr-4" />
                <p className={`${navLinkClasses} ${page === 'homepage' && 'text-primary-text'}`}>Home</p>
                <p className={`${navLinkClasses} ${page === 'posts' && 'text-primary-text'}`}>Posts</p>
                <p className={`${navLinkClasses} ${page === 'about' && 'text-primary-text'}`}>About</p>
                <p className={`${navLinkClasses} ${page === 'contact' && 'text-primary-text'}`}>Contact</p>
            </div>

            <div className="my-auto mr-7 flex gap-10">
                <a href="" className={`${navLinkClasses} bg-primary-text text-black transition duration-1000 hover:text-white hover:brightness-100`}>
                    Login
                </a>
                <a href="" className={`${navLinkClasses} bg-primary-text text-black transition duration-1000 hover:text-white hover:brightness-100`}>
                    Register
                </a>
            </div>
        </nav>
    );
}
