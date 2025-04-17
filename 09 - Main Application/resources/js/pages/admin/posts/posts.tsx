import Input from '@/components/admin/Input';
import DashboardLayout from '@/layouts/dashboard-layout';

type Props = {
    data: {
        id: number;
        title: string;
        description: string;
        image: string;
        user: string;
    }[];
    token: string;
};

export default function posts({ data, token }: Props) {
    const linkClasses = 'hover:text-primary-text cursor-pointer text-center hover:underline text-primary-text font-bold';
    return (
        <DashboardLayout title="All Posts" identifier="posts">
            <div className="mx-12 my-12">
                <div className="my-2 flex w-full justify-between gap-7">
                    <h1 className="text-primary-text font-poppins mb-7 text-5xl font-medium">All Posts</h1>

                    <a
                        href="/admin/create"
                        className="border-primary-text bg-primary-text font-poppins shadow-l my-auto rounded-2xl border-2 px-6 py-4 text-black hover:brightness-95"
                    >
                        Create New Post
                    </a>
                </div>
                <table className="mx-12 my-5 table-cell rounded-2xl border-2 border-gray-50 pt-3.5 pb-3.5 shadow-xl">
                    <thead className="bg-blue-100 text-xl">
                        <tr className="">
                            <th className="px-2.5">S.No</th>
                            <th className="px-2.5">Author</th>
                            <th className="w-2xl px-2.5">Title</th>
                            <th className="w-7xl px-2.5">Description</th>
                            <th className="w-4xl px-2.5">Image</th>
                            <th className="px-7">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {data.map((post, index) => (
                            <tr key={index} className="h-18 border-b-2 border-blue-200">
                                <td className="p-3 text-center">{index + 1}</td>
                                <td className="p-3 text-center">{post.user}</td>
                                <td className="pr-3 text-center">
                                    <a href={`/admin/${post.id}/edit`} className={linkClasses}>
                                        {post.title}
                                    </a>
                                </td>
                                {/* <td className="pr-3">{post.description.substring(0, 65)}</td> */}
                                <td className="pr-3">
                                    {' '}
                                    <div dangerouslySetInnerHTML={{ __html: post.description.substring(0, 65) }}></div>{' '}
                                </td>
                                <td className="pr-3">
                                    {post.image ? (
                                        <img className="mx-auto my-2 h-14" src={`/images/${post.image}`} alt={post.title} />
                                    ) : (
                                        'Not Available'
                                    )}
                                </td>
                                <td className="mr-1.5">
                                    <form action={`/admin/${post.id}`} method="POST">
                                        <Input type="hidden" name="_token" value={token} />
                                        <Input type="hidden" name="_method" value="DELETE" />

                                        <input
                                            type="submit"
                                            name="delete"
                                            value="Delete"
                                            className="bg-primary-text ml-4 cursor-pointer rounded-xl px-5 py-3 text-black shadow-2xl hover:shadow hover:brightness-95"
                                        />
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
