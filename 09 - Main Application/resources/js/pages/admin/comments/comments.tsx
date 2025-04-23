import Pagination from '@/components/homepage/Pagination';
import DashboardLayout from '@/layouts/dashboard-layout';
import { usePage } from '@inertiajs/react';

type Comment = {
    id: string;
    name: string;
    comment: string;
    postId: string;
    created_at: string;
};

type PageProps = {
    comments: Comment[];
    totalPages: number;
};

export default function Comments() {
    const linkClasses = 'hover:text-primary-text cursor-pointer text-center hover:underline text-primary-text font-bold';

    const { comments, totalPages } = usePage<PageProps>().props;

    const numbers: number[] = [];

    for (let i = 0; i < totalPages; i++) {
        numbers.push(i + 1);
    }

    return (
        <DashboardLayout title="All Comments" identifier="comments">
            <div className="mx-12 mt-12 box-border flex">
                <div className="flex w-full justify-between gap-7 align-baseline">
                    <h1 className="text-primary-text font-poppins my-7 text-5xl font-medium">All Comments</h1>
                </div>
            </div>

            <div className="mx-12 my-2">
                <table className="mx-12 my-5 table-cell rounded-2xl border-2 border-gray-50 pt-3.5 pb-3.5 shadow-xl">
                    <thead className="mt-7 py-2 pt-6">
                        <tr className="text-l rounded-2xl bg-blue-100 py-2">
                            <th className="rounded-2xl px-2.5 py-1">Id</th>
                            <th className="px-2.5">Name</th>
                            <th className="w-4xl px-2.5">Comments</th>
                            <th className="px-2.5">PostID</th>
                            <th className="px-2.5">Status</th>
                            <th className="w-3xs px-2.5">Created</th>
                            <th className="px-7">Approve</th>
                            <th className="px-7">Disapprove</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {comments.map((comment) => (
                            <tr className="h-10 border-blue-200" key={comment.id}>
                                <td className="p-3 text-center">{comment.id}</td>
                                <td className="p-3 text-center"> {comment.name}</td>
                                <td className="pr-3 text-center">
                                    <a href={route('comment.edit', comment.id)}>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: `${comment.comment.substring(0, 60)}...` }}
                                            className={linkClasses}
                                        ></div>
                                    </a>
                                </td>
                                <td className="p-3 text-center">{comment.postId}</td>
                                <td className="pr-3 text-center">Approved</td>
                                <td className="pr-3 text-center">{comment.created_at ?? '25/05/2025'}</td>
                                <td className={`mr-1.5 text-center ${'linkClasses'}`}>
                                    <span>Approve</span>
                                </td>
                                <td className={`mr-1.5 text-center ${'linkClasses'}`}>
                                    <span>Disapprove</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="my-10 flex justify-end gap-3">
                    {numbers.map((el) => (
                        <Pagination num={el} key={el} />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
