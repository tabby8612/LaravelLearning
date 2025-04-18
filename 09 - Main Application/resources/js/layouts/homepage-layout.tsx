import Hero from '@/components/homepage/Hero';
import NavBar from '@/components/homepage/NavBar';
import Sidebar from '@/components/homepage/Sidebar';
import { ReactNode } from 'react';

type Props = {
    page: string;
    children: ReactNode;
    isLoggedIn: boolean;
};

export default function HomepageLayout({ page = 'homepage', isLoggedIn, children }: Props) {
    return (
        <>
            <div id="header">
                <title>{page}</title>
                <NavBar page={page} isLoggedIn={isLoggedIn} />
                <Hero />
            </div>
            <div className="flex justify-around">
                <div className="h-full w-[80%]">{children}</div>
                <Sidebar />
            </div>
        </>
    );
}
