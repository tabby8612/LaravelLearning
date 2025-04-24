import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import TipTap from '@/components/tip-tap';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { MoveLeft } from 'lucide-react';
import { FormEvent, useState } from 'react';

type Comment = {
    id: string;
    name: string;
    comment: string;
    postId: string;
    postTitle: string;
};

type PageProps = {
    comment: Comment;
};

export default function Edit() {
    const { comment } = usePage<PageProps>().props;
    const [commentContent, setCommentContent] = useState<string>(comment.comment);

    function submitHandler(e: FormEvent<HTMLInputElement>) {
        e.preventDefault();

        const authorName = document.getElementById('author') as HTMLInputElement;

        router.patch(route('comment.update', comment.id), {
            authorName: authorName.value,
            contentArr: commentContent,
        });
    }

    function deleteHandler(e: FormEvent<HTMLInputElement>) {
        e.preventDefault();
        router.delete(route('comment.destroy', comment.id));
    }

    return (
        <DashboardLayout title="Edit Comment" identifier="comments">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Edit Comment</h1>
                <form encType="multipart/form-data" className="w-3xl">
                    <Label labelName="Comment ID" />
                    <p className="my-4 text-[15px] text-slate-300">{comment.id}</p>
                    <Label labelName="Post" />
                    <p className="my-4 text-[15px] text-slate-300">
                        <a href={route('single.post', comment.postId)} className="underline">
                            {comment.postTitle}
                        </a>
                    </p>
                    <Label labelName="Author" />
                    <Input name="author" id="author" value={comment.name} />

                    <Label labelName="Comment" />
                    <div className="text-white">
                        <TipTap content={commentContent} setContent={setCommentContent} />
                    </div>

                    <div className="flex w-3xl justify-between">
                        <div className="my-auto">
                            <MoveLeft className="text-primary-dark mr-2 inline" />
                            <a href={route('comment.index')} className="text-primary-text font-poppins text-l my-auto mb-3.5 font-medium">
                                Back To All Comments
                            </a>
                        </div>
                        <div className="flex gap-3">
                            <Button text="Delete Comment" clickFn={deleteHandler} />
                            <Button text="Edit Comment" clickFn={submitHandler} />
                        </div>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
