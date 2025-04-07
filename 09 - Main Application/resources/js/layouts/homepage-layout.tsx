import Hero from '@/components/homepage/Hero';
import NavBar from '@/components/homepage/NavBar';
import Sidebar from '@/components/homepage/Sidebar';
import { ReactNode } from 'react';

type Props = {
    page: string;
    children: ReactNode;
};

export default function HomepageLayout({ page = 'homepage', children }: Props) {
    return (
        <>
            <div id="header">
                <title>{page}</title>
                <NavBar page={page} />
                <Hero />
            </div>
            <div className="flex justify-around">
                <div className="ml-9 h-full w-[80%]">{children}</div>
                <Sidebar />
            </div>
        </>
    );
}
