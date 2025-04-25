import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import TipTap from '@/components/tip-tap';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { MoveLeft } from 'lucide-react';
import { FormEvent, useState } from 'react';

type PageProps = {
    reply: {
        id: string;
        name: string;
        reply_text: string;
    };
};

export default function Edit() {
    const { reply } = usePage<PageProps>().props;
    const [replyContent, setReplyContent] = useState<string>(reply.reply_text);

    function submitHandler(e: FormEvent<HTMLInputElement>) {
        e.preventDefault();

        const name = document.getElementById('name') as HTMLInputElement;

        router.put(route('reply.update', reply.id), {
            name: name.value,
            reply: replyContent,
        });
    }

    return (
        <DashboardLayout title="Edit Post" identifier="posts">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Edit Post</h1>
                <form encType="multipart/form-data" className="w-3xl text-white">
                    <Label labelName="Name" />
                    <Input name="name" id="name" value={reply.name} />

                    <Label labelName="Reply" />
                    <TipTap content={replyContent} setContent={setReplyContent} />

                    <div className="flex w-3xl justify-between">
                        <div className="my-auto">
                            <MoveLeft className="text-primary-dark mr-2 inline" />
                            <a href={route('reply.index')} className="text-primary-text font-poppins text-l my-auto mb-3.5 font-medium">
                                Back To All Replies
                            </a>
                        </div>
                        <Button text="Edit Reply" clickFn={submitHandler} />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
