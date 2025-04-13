import DashboardLayout from '@/layouts/dashboard-layout';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Category = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
};

type Props = {
    categoriesData: Category[];
    curUser: string;
    message: string;
};

export default function Categories({ categoriesData, curUser, message }: Props) {
    //-- usePage().props will contain all props passed it
    //-- Useful for populating data when validation failed
    //-- Also useful for displaying errors

    const [successMessage, setSuccessMessage] = useState(message);
    console.log(successMessage);

    useEffect(() => {
        if (!successMessage) return;

        const timer = setTimeout(() => {
            setSuccessMessage('');
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [successMessage, message]);

    function handleDelete(id: string) {
        router.delete(route('categories.destroy', id));

        return;
    }

    const linkClasses = 'hover:text-primary-text cursor-pointer text-center hover:underline text-primary-text font-bold';

    return (
        <DashboardLayout title="All Categories" identifier="categories" user={curUser}>
            <div className="mx-12 mt-12 box-border flex">
                <div className="flex w-full justify-between gap-7 align-baseline">
                    <h1 className="text-primary-text font-poppins my-7 text-5xl font-medium">All Categories</h1>

                    <a
                        href={route('categories.create')}
                        className="border-primary-text bg-primary-text font-poppins shadow-l my-auto rounded-2xl border-2 px-6 py-4 text-black hover:brightness-95"
                    >
                        Create New Category
                    </a>
                </div>
            </div>

            <div className="mx-12 my-2">
                {successMessage && (
                    <div className="my-4 rounded-xl bg-green-200 px-2 py-3 text-center text-green-800">
                        <h1>{successMessage}</h1>
                    </div>
                )}
                <table className="mx-12 my-5 table-cell rounded-2xl border-2 border-gray-50 pt-3.5 pb-3.5 shadow-xl">
                    <thead className="mt-7 py-2 pt-6">
                        <tr className="text-l rounded-2xl bg-blue-100 py-2">
                            <th className="rounded-2xl px-2.5 py-1">Id</th>
                            <th className="w-4xl px-2.5">Category</th>
                            <th className="w-4xl px-2.5">Created</th>
                            <th className="w-4xl px-2.5">Updated</th>
                            <th className="w-4xl px-7">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {categoriesData.map((category) => (
                            <tr className="h-10 border-blue-200" key={category.id}>
                                <td className="p-3 text-center">{category.id}</td>
                                <td className="p-3 text-center">
                                    {' '}
                                    <a href={route('categories.edit', category.id)} className={linkClasses}>
                                        {category.name}
                                    </a>
                                </td>
                                <td className="pr-3 text-center">{category.created_at}</td>
                                <td className="pr-3 text-center">{category.updated_at}</td>
                                <td
                                    className={`mr-1.5 text-center ${linkClasses}`}
                                    onClick={() => {
                                        if (confirm('Do you really want to delete?')) {
                                            handleDelete(category.id);
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
