import { router, usePage } from '@inertiajs/react';
import { Speech } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Icon } from './icon';

type Comment = {
    name: string;
    comment: string;
};

type Props = {
    comments: Comment[];
};

type PageProps = {
    post: {
        id: string;
    };
};

export default function CommentSection({ comments }: Props) {
    const { post, errors } = usePage<PageProps>().props;
    const [comment, setComment] = useState('');

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const commentText = document.getElementById('comment') as HTMLInputElement;

        router.post(route('comment.store'), {
            comment: commentText.value,
            postId: post.id,
        });

        setComment('');
    }

    function commentHandler(e: ChangeEvent<HTMLTextAreaElement>) {
        setComment(e.target.value);
    }

    return (
        <section className="mx-auto w-4xl bg-white py-8 antialiased lg:py-16 dark:bg-gray-900">
            <div className="mx-auto max-w-2xl px-4">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">Discussion ({comments.length})</h2>
                </div>
                <form className="mb-6" onSubmit={handleSubmit}>
                    <div className="mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
                        <label htmlFor='"comment"' className="">
                            Your comment
                        </label>
                        <textarea
                            id="comment"
                            rows={6}
                            className="w-full border-0 px-0 text-sm text-gray-900 focus:ring-0 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                            placeholder="Write a comment..."
                            value={comment}
                            required
                            onChange={commentHandler}
                        ></textarea>
                    </div>
                    {errors && <p className="mb-2.5 text-[13px] text-red-500">{errors.comment}</p>}

                    <button
                        type="submit"
                        className="bg-primary-dark focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 inline-flex items-center rounded-lg px-4 py-2.5 text-center text-xs font-medium text-white focus:ring-4"
                    >
                        Post comment
                    </button>
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
                        <p className="text-gray-500 dark:text-gray-400">{comment.comment}</p>
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
                                Reply
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
