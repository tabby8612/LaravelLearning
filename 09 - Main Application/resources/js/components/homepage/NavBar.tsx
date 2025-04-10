import { Book } from 'lucide-react';

type Props = {
    page: string;
    isLoggedIn: boolean;
};

export default function NavBar({ page = 'home', isLoggedIn }: Props) {
    const navLinkClasses = 'cursor-pointer rounded-xl px-3 py-1.5 hover:bg-blue-900';

    return (
        <nav className="bg-primary-dark flex min-h-15 w-full justify-between text-white">
            <div className="my-auto ml-7 flex gap-5">
                <Book className="mt-2 mr-4" />
                <a className={`${navLinkClasses} ${page === 'homepage' && 'text-primary-text'}`} href="/">
                    Home
                </a>
                <a className={`${navLinkClasses} ${page === 'posts' && 'text-primary-text'}`} href="/posts/all">
                    Posts
                </a>

                <a className={`${navLinkClasses} ${page === 'contact' && 'text-primary-text'}`} href="/contact">
                    Contact
                </a>
            </div>

            {!isLoggedIn && (
                <div className="my-auto mr-7 flex gap-10">
                    <a
                        href="/login"
                        className={`${navLinkClasses} bg-primary-text text-black transition duration-1000 hover:text-white hover:brightness-100`}
                    >
                        Login
                    </a>
                    <a
                        href="/register"
                        className={`${navLinkClasses} bg-primary-text text-black transition duration-1000 hover:text-white hover:brightness-100`}
                    >
                        Register
                    </a>
                </div>
            )}

            {isLoggedIn && (
                <div className="my-auto mr-7 flex gap-10">
                    <a
                        href={route('dashboard')}
                        className={`${navLinkClasses} bg-primary-text text-black transition duration-1000 hover:text-white hover:brightness-100`}
                    >
                        Dashboard
                    </a>
                </div>
            )}
        </nav>
    );
}
