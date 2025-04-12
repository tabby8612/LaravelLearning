import DashboardLayout from '@/layouts/dashboard-layout';

type Tag = {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
};

type Props = {
    tagsData: Tag[];
    curUser: string;
};

export default function Tags({ tagsData, curUser }: Props) {
    const linkClasses = 'hover:text-primary-text cursor-pointer text-center hover:underline text-primary-text font-bold';

    return (
        <DashboardLayout title="All Tags" identifier="tags" user={curUser}>
            <div className="mx-12 mt-12 box-border flex">
                <div className="flex w-full justify-between gap-7 align-baseline">
                    <h1 className="text-primary-text font-poppins my-7 text-5xl font-medium">All Tags</h1>

                    <a
                        href={route('tags.create')}
                        className="border-primary-text bg-primary-text font-poppins shadow-l my-auto rounded-2xl border-2 px-6 py-4 text-black hover:brightness-95"
                    >
                        Create New Tag
                    </a>
                </div>
            </div>

            <div className="mx-12 my-2">
                <table className="mx-12 my-5 table-cell rounded-2xl border-2 border-gray-50 pt-3.5 pb-3.5 shadow-xl">
                    <thead className="mt-7 py-2 pt-6">
                        <tr className="text-l rounded-2xl bg-blue-100 py-2">
                            <th className="rounded-2xl px-2.5 py-1">Id</th>
                            <th className="w-4xl px-2.5">Tags</th>
                            <th className="w-4xl px-2.5">Created</th>
                            <th className="w-4xl px-2.5">Updated</th>
                            <th className="w-4xl px-7">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {tagsData.map((tag) => (
                            <tr className="h-10 border-blue-200" key={tag.id}>
                                <td className="p-3 text-center">{tag.id}</td>
                                <td className="p-3 text-center">{tag.name}</td>
                                <td className="pr-3 text-center">{tag.created_at}</td>
                                <td className="pr-3 text-center">{tag.updated_at}</td>
                                <td className={`mr-1.5 text-center ${linkClasses}`}>Delete</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
