import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

type Reply = {
    id: string;
    name: string;
    reply_text: string;
    created_at: string;
};
type PageProps = {
    replies: Reply[];
    replySuccessMessage: string;
    replyDeleteMessage: string;
};

export default function AllReplies() {
    const { replies, replySuccessMessage, replyDeleteMessage } = usePage<PageProps>().props;
    const [displayMessage, setDisplayMessage] = useState<boolean>(false);
    const [displayDeleteMessage, setdisplayDeleteMessage] = useState<boolean>(false);
    const linkClasses = 'hover:text-primary-text cursor-pointer text-center hover:underline text-primary-text font-bold';

    useEffect(() => {
        if (replySuccessMessage) {
            setDisplayMessage(true);
            const timer = setTimeout(() => setDisplayMessage(false), 3000);
            return () => clearTimeout(timer);
        }

        if (replyDeleteMessage) {
            const timer = setTimeout(() => setdisplayDeleteMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [replySuccessMessage, replyDeleteMessage, displayDeleteMessage]);

    function handleDelete(id: string) {
        router.delete(route('reply.destroy', id), {
            preserveScroll: true,
            preserveState: true,
            async: true,
            onSuccess: () => setdisplayDeleteMessage(true),
        });
    }

    return (
        <DashboardLayout title="All Replies" identifier="comments">
            <div className="mx-12 my-12 w-4xl">
                <div className="my-2 flex w-full justify-between gap-7">
                    <h1 className="text-primary-text font-poppins mb-7 text-5xl font-medium">All Replies</h1>
                </div>
                {displayMessage && (
                    <div className="my-3 rounded-[5px] bg-green-200">
                        <p className="animate-fade-in-scale py-1 text-center text-green-700 duration-700">{replySuccessMessage}</p>
                    </div>
                )}
                {displayDeleteMessage && (
                    <div className="my-3 rounded-[5px] bg-green-200">
                        <p className="animate-fade-in-scale py-1 text-center text-green-700 duration-700">{replyDeleteMessage}</p>
                    </div>
                )}

                <table className="mx-12 my-5 table-cell w-4xl rounded-2xl border-2 border-gray-50 pt-3.5 pb-3.5 shadow-xl">
                    <thead className="bg-blue-100 text-xl">
                        <tr className="">
                            <th className="px-2.5">S.No</th>
                            <th className="px-2.5">Author</th>
                            <th className="w-2xl px-2.5 text-center">Reply Text</th>
                            <th className="w-2xl px-2.5">Created</th>
                            <th className="px-7">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {replies.map((reply) => (
                            <tr key={reply.id} className="h-18 border-b-2 border-blue-200">
                                <td className="p-3 text-center">{reply.id}</td>
                                <td className="p-3 text-center">{reply.name}</td>
                                <td className="pr-3 text-center">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: reply.reply_text.substring(0, 65) }}
                                        className={linkClasses}
                                        onClick={() => router.get(route('reply.edit', reply.id))}
                                    ></div>
                                </td>
                                <td className="text-center">{new Date(reply.created_at).toDateString()}</td>
                                <td className="mr-1.5">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            handleDelete(reply.id);
                                        }}
                                    >
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
