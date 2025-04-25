import SidebarTab from '@/components/admin/SidebarTab';
import { BookmarkIcon, Cog6ToothIcon, GlobeAltIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/24/solid';
import { Head, router, usePage } from '@inertiajs/react';
import { BellIcon, ChevronDown, ChevronUp, PersonStanding, SearchIcon, SpeechIcon, TagsIcon, User } from 'lucide-react';
import { ReactNode, useState } from 'react';

type Props = {
    title: string;
    identifier: string;
    children: ReactNode;
};

type PageProps = {
    auth: {
        user: {
            name: string;
            id: string;
        };
    };
};

export default function DashboardLayout({ title, identifier, children }: Props) {
    const { auth } = usePage<PageProps>().props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    function clickHandler(e: React.MouseEvent<HTMLAnchorElement>) {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const params = target.href.split('/');

        if (params.includes('logout')) {
            router.post('/logout', { message: 'You Are Logged Out' });
        } else {
            router.get(route('user.edit', auth.user.id));
        }
    }

    function menuToggler(e: React.MouseEvent<HTMLHeadingElement>) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
    }

    return (
        <>
            <Head title={title} />
            <div className="from-primary-light to-primary-dark min-h-screen w-full bg-linear-to-r from-30%">
                <div className="flex">
                    <div className="bg-primary-dark min-h-screen w-[15%] py-7 inset-shadow-sm">
                        <h1 className="text-primary-text bold mx-15 mt-6 mb-6 align-middle text-3xl font-bold">Admin</h1>

                        <SidebarTab
                            tabName="dashboard"
                            curTab={identifier === 'dashboard'}
                            Icon={GlobeAltIcon}
                            items={[
                                {
                                    name: 'Main',
                                    param: '/admin',
                                },
                            ]}
                        />

                        <SidebarTab
                            tabName="users"
                            curTab={identifier === 'users'}
                            Icon={UserIcon}
                            items={[
                                {
                                    name: 'All Users',
                                    param: route('user.index'),
                                },
                                {
                                    name: 'Create New User',
                                    param: route('user.create'),
                                },
                            ]}
                        />

                        <SidebarTab
                            tabName="posts"
                            curTab={identifier === 'posts'}
                            Icon={PencilSquareIcon}
                            items={[
                                {
                                    name: 'All Posts',
                                    param: route('admin.posts'),
                                },
                                {
                                    name: 'Create New Post',
                                    param: route('admin.create'),
                                },
                            ]}
                        />

                        <SidebarTab
                            tabName="tags"
                            curTab={identifier === 'tags'}
                            Icon={TagsIcon}
                            items={[
                                {
                                    name: 'All Tags',
                                    param: route('tags.index'),
                                },
                                {
                                    name: 'Create New Tag',
                                    param: route('tags.create'),
                                },
                            ]}
                        />

                        <SidebarTab
                            tabName="categories"
                            curTab={identifier === 'categories'}
                            Icon={BookmarkIcon}
                            items={[
                                {
                                    name: 'All Categories',
                                    param: route('categories.index'),
                                },
                                {
                                    name: 'Create New Post',
                                    param: route('categories.create'),
                                },
                            ]}
                        />

                        <SidebarTab
                            tabName="settings"
                            curTab={identifier === 'settings'}
                            Icon={Cog6ToothIcon}
                            items={[
                                {
                                    name: 'Edit User',
                                    param: route('user.edit', auth.user.id),
                                },
                                {
                                    name: 'Logout',
                                    param: '/logout',
                                },
                            ]}
                            clickFn={clickHandler}
                        />
                        <SidebarTab
                            tabName="roles"
                            curTab={identifier === 'roles'}
                            Icon={PersonStanding}
                            items={[
                                {
                                    name: 'All Roles',
                                    param: route('roles.index'),
                                },
                            ]}
                        />
                        <SidebarTab
                            tabName="comments"
                            curTab={identifier === 'comments'}
                            Icon={SpeechIcon}
                            items={[
                                {
                                    name: 'All Comments',
                                    param: route('comment.index'),
                                },
                                {
                                    name: 'All Replies',
                                    param: route('reply.index'),
                                },
                            ]}
                        />
                    </div>
                    <div className="flex w-[85%] flex-col">
                        <nav className="relative flex flex-row justify-between bg-white p-4 text-gray-400 shadow-xl">
                            <div className="flex gap-2">
                                <SearchIcon />
                                <input type="text" name="search" className="font-poppins mr-7 w-2xs focus:outline-0" />
                            </div>
                            <div className="flex gap-7">
                                <BellIcon />
                                <div className="border-l-3 border-gray-400"></div>
                                <User className="text-gray-900" />
                                <div className="">
                                    <h1 className="cursor-pointer text-gray-900" onClick={menuToggler}>
                                        {auth.user.name}{' '}
                                        {isOpen ? <ChevronUp className="mr-6 inline transition" /> : <ChevronDown className="mr-6 inline" />}
                                    </h1>
                                    {isOpen && (
                                        <div className="text-2xs animate-fade-in-scale absolute top-13 right-5 rounded-xl bg-white px-8 py-2 text-black shadow-2xs shadow-black">
                                            <ul>
                                                <li className="mb-6 block">
                                                    <a href={route('user.edit', auth.user.id)} onClick={clickHandler}>
                                                        Settings
                                                    </a>
                                                </li>
                                                <li className="mb-6 block">
                                                    <a href={route('logout')} onClick={clickHandler}>
                                                        Logout
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </nav>
                        {children}
                        {/* <div id="content"></div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
