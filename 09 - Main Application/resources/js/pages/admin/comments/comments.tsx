import Pagination from '@/components/homepage/Pagination';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Comment = {
    id: string;
    name: string;
    comment: string;
    postId: string;
    created_at: string;
    status: string;
};

type PageProps = {
    comments: Comment[];
    totalPages: number;
    message: string;
};

export default function Comments() {
    const linkClasses = 'hover:text-primary-text cursor-pointer text-center hover:underline text-primary-text font-bold';
    const moderationClasses = 'bg-orange-100 text-orange-800';
    const approveClasses = 'bg-green-100 text-green-700';
    const btnClasses = 'cursor-pointer rounded-[10px] px-3.5 py-2 shadow-[5px] shadow-black hover:brightness-125 mt-2.5';

    const { comments, totalPages, message } = usePage<PageProps>().props;
    const [feedbackMessage, setFeedbackMessage] = useState<string>(message);
    console.log(message);

    useEffect(() => {
        if (!feedbackMessage) return;

        setTimeout(() => {
            setFeedbackMessage('');
        }, 3000);
    }, [feedbackMessage]);

    const numbers: number[] = [];

    for (let i = 0; i < totalPages; i++) {
        numbers.push(i + 1);
    }

    function approveHandler(id: string) {
        router.post(route('comment.approve', id));
    }

    function disapproveHandler(id: string) {
        router.post(route('comment.disapprove', id));
    }

    return (
        <DashboardLayout title="All Comments" identifier="comments">
            <div className="mx-12 mt-12 box-border">
                <div className="flex w-full justify-between gap-7 align-baseline">
                    <h1 className="text-primary-text font-poppins my-7 text-5xl font-medium">All Comments</h1>
                </div>
                <p className="animate-fade-in-scale mx-auto w-2xl rounded-[5px] bg-green-200 px-3 text-center">{feedbackMessage}</p>
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
                            <th className="w-3xs px-3">Action</th>
                            <th className="w-3xs px-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {comments.map((comment) => (
                            <tr className="h-10 border-blue-200" key={comment.id}>
                                <td className="p-3 text-center">{comment.id}</td>
                                <td className="p-3 text-center"> {comment.name.split(' ')[0]}</td>
                                <td className="pr-3 text-center">
                                    <a href={route('comment.edit', comment.id)}>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: `${comment.comment.substring(0, 40)}` }}
                                            className={`${linkClasses} h-[10px] w-full`}
                                        ></div>
                                    </a>
                                </td>
                                <td className="p-3 text-center">{comment.postId}</td>
                                <td className="pr-3 text-center">
                                    <p
                                        className={`rounded-[10px] px-2 py-1 text-xs ${comment.status === 'approved' ? approveClasses : moderationClasses}`}
                                    >
                                        {comment.status}
                                    </p>
                                </td>
                                <td className="text-center">{comment.created_at ?? '25/05/2025'}</td>
                                <td className={`mr-1.5 text-center ${'linkClasses'}`}>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            approveHandler(comment.id);
                                        }}
                                    >
                                        <button className={`${btnClasses} bg-green-700`}>Approve</button>
                                    </form>
                                </td>
                                <td className={`mr-1.5 text-center ${'linkClasses'}`}>
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            disapproveHandler(comment.id);
                                        }}
                                    >
                                        <button className={`${btnClasses} bg-red-800`}>Disapprove</button>
                                    </form>
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
