import { router, usePage } from '@inertiajs/react';
import { Speech } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Icon } from './icon';
import TipTap from './tip-tap';

type Comment = {
    id: string;
    name: string;
    comment: string;
};

type User = {
    name: string;
};

type PageProps = {
    post: {
        id: string;
    };
    comments: Comment[];
    message: string;
    auth: {
        user: User;
    };
};

export default function CommentSection() {
    const { post, errors, comments, message, auth } = usePage<PageProps>().props;
    console.log(message);
    const [showMessage, setShowMessage] = useState<boolean>(false);
    console.log(showMessage);
    const [ReplyBoxInd, setReplayBoxInd] = useState<string | null>(null);
    const [commentContent, setCommentContent] = useState<string>('');
    const [replyContent, setReplyContent] = useState<string>('');

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => setShowMessage(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [message, showMessage]);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const commentBox = document.querySelector('.tiptap') as HTMLDivElement;

        router.post(
            route('comment.store'),
            {
                comment: commentContent,
                postId: post.id,
            },
            {
                onSuccess: () => {
                    Array.from(commentBox.childNodes).forEach((el) => ((el as Element).outerHTML = ''));
                    setCommentContent('');
                },
                async: true,
            },
        );

        Array.from(commentBox.childNodes).forEach((el) => ((el as Element).outerHTML = ''));
        setShowMessage(true);
    }

    function renderReplyForm(id: string) {
        console.log(id);
        if (ReplyBoxInd === id) {
            setReplayBoxInd(null);
        } else {
            setReplayBoxInd(id);
        }
    }

    function replyHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        console.log(replyContent);
    }

    return (
        <section className="mx-auto w-4xl bg-white py-8 antialiased lg:py-16 dark:bg-gray-900">
            <div className="mx-auto max-w-2xl px-4">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">Discussion ({comments.length})</h2>
                </div>
                {errors && <p className="mb-2.5 text-[13px] text-red-500">{errors.comment}</p>}
                {showMessage && <p className="mb-2.5 text-[13px] text-green-700">{message}</p>}
                <form className="mb-6" onSubmit={handleSubmit}>
                    <TipTap content={commentContent} setContent={setCommentContent} />

                    {auth.user?.name ? (
                        <button
                            type="submit"
                            className="bg-primary-dark focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 inline-flex items-center rounded-lg px-4 py-2.5 text-center text-xs font-medium text-white focus:ring-4"
                        >
                            Post comment
                        </button>
                    ) : (
                        <p className="text-red-600">You need to logged in to comment</p>
                    )}
                </form>
                {comments.map((comment, index) => (
                    <article className="rounded-lg bg-white p-6 text-base dark:bg-gray-900" key={index}>
                        <footer className="mb-2 flex items-center justify-between">
                            <div className="flex items-center">
                                <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                                    <Icon iconNode={Speech} className="mr-3.5" />
                                    {comment.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <time dateTime="2022-02-08" title="February 8th, 2022">
                                        Feb. 8, 2022
                                    </time>
                                </p>
                            </div>
                        </footer>

                        <div className="text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: comment.comment }}></div>
                        <div className="mt-4 flex items-center space-x-4">
                            <button type="button" className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400">
                                <svg
                                    className="mr-1.5 h-3.5 w-3.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 18"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                    />
                                </svg>
                                <p className="cursor-pointer" onClick={() => renderReplyForm(comment.id)}>
                                    Reply
                                </p>
                            </button>
                        </div>
                        {ReplyBoxInd === comment.id && (
                            <div id="replyBox" className="animate-fade-in-scale ml-15">
                                <form onSubmit={replyHandler}>
                                    <TipTap content={replyContent} setContent={setReplyContent} />
                                    <button
                                        type="submit"
                                        className="bg-primary-dark focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 inline-flex items-center rounded-lg px-4 py-2.5 text-center text-xs font-medium text-white focus:ring-4"
                                    >
                                        Submit Replay
                                    </button>
                                </form>
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
