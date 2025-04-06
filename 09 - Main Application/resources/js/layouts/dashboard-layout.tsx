import SidebarTab from '@/components/admin/SidebarTab';
import { BookmarkIcon, Cog6ToothIcon, GlobeAltIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/24/solid';
import { Head } from '@inertiajs/react';
import { BellIcon, ChevronDown, SearchIcon, TagsIcon, User } from 'lucide-react';
import { ReactNode } from 'react';

type Props = {
    title: string;
    identifier: string;
    children: ReactNode;
};

export default function DashboardLayout({ title, identifier, children }: Props) {
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
                                    param: '/users',
                                },
                                {
                                    name: 'Create New User',
                                    param: '/user/create',
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
                                    param: '/admin/posts/all',
                                },
                                {
                                    name: 'Create New Post',
                                    param: '/admin/create',
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
                                    param: '/tags',
                                },
                                {
                                    name: 'Create New Tag',
                                    param: '/tag/create',
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
                                    param: '/categories',
                                },
                                {
                                    name: 'Create New Post',
                                    param: '/category/create',
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
                                    param: '/user/edit',
                                },
                                {
                                    name: 'Logout',
                                    param: '/user/logout',
                                },
                            ]}
                        />
                    </div>
                    <div className="flex w-[85%] flex-col">
                        <nav className="flex flex-row justify-between bg-white p-4 text-gray-400 shadow-xl">
                            <div className="flex gap-2">
                                <SearchIcon />
                                <input type="text" name="search" className="font-poppins mr-7 w-2xs focus:outline-0" />
                            </div>
                            <div className="flex gap-7">
                                <BellIcon />
                                <div className="border-l-3 border-gray-400"></div>
                                <User className="text-gray-900" />
                                <h1 className="text-gray-900">Tim Cook</h1>
                                <ChevronDown className="mr-6" />
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
