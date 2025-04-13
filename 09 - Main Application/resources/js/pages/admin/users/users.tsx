import DashboardLayout from '@/layouts/dashboard-layout';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface userData {
    user_id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

type Props = {
    usersData: userData[];
    activeUser: string;
    message: string;
};

export default function Users({ usersData, activeUser, message }: Props) {
    const [showMessage, setShowMessage] = useState(message);

    useEffect(() => {
        setTimeout(() => {
            setShowMessage('');
        }, 5000);
    }, [showMessage]);

    const linkClasses = 'hover:text-primary-text cursor-pointer text-center hover:underline text-primary-text font-bold';

    function handleDelete(id: string) {
        router.delete(route('user.destroy', id));
    }

    return (
        <DashboardLayout title="All Users" identifier="users" user={activeUser}>
            <div className="mx-12 mt-12 box-border flex">
                <div className="flex w-full justify-between gap-7 align-baseline">
                    <h1 className="text-primary-text font-poppins my-7 text-5xl font-medium">All Users</h1>

                    <a
                        href={route('user.create')}
                        className="border-primary-text bg-primary-text font-poppins shadow-l my-auto rounded-2xl border-2 px-6 py-4 text-black hover:brightness-95"
                    >
                        Create New User
                    </a>
                </div>
            </div>

            {showMessage && <div className="mx-12 text-green-200">{showMessage}</div>}

            <div className="mx-12 my-2">
                <table className="mx-12 my-5 table-cell rounded-2xl border-2 border-gray-50 pt-3.5 pb-3.5 shadow-xl">
                    <thead className="mt-7 py-2 pt-6">
                        <tr className="text-l rounded-2xl bg-blue-100 py-2">
                            <th className="rounded-2xl px-2.5 py-1">Id</th>
                            <th className="w-4xl px-2.5">Name</th>
                            <th className="w-4xl px-2.5">Email</th>
                            <th className="w-4xl px-2.5">Created</th>
                            <th className="w-4xl px-2.5">Updated</th>
                            <th className="w-4xl px-7">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {usersData.map((user) => (
                            <tr className="h-10 border-blue-200" key={user.user_id}>
                                <td className="p-3 text-center">{user.user_id}</td>
                                <td className="p-3 text-center">
                                    <a href={route('user.edit', user.user_id)} className={linkClasses}>
                                        {user.name}
                                    </a>
                                </td>
                                <td className="p-3 text-center">{user.email}</td>
                                <td className="pr-3 text-center">{user.created_at}</td>
                                <td className="pr-3 text-center">{user.updated_at}</td>
                                <td
                                    className={`mr-1.5 text-center ${linkClasses}`}
                                    onClick={() => {
                                        if (confirm('Do you really want to delete')) {
                                            handleDelete(user.user_id);
                                        }
                                    }}
                                >
                                    Delete
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
