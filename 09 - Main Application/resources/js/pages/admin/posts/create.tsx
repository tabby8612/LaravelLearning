import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import TextArea from '@/components/admin/TextArea';
import Tiptap from '@/components/tip-tap';
import DashboardLayout from '@/layouts/dashboard-layout';

type Props = {
    token: string;
};

export default function create({ token }: Props) {
    return (
        <DashboardLayout title="Create New Post" identifier="posts">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Create New Post</h1>
                <form action="/admin" method="post" encType="multipart/form-data">
                    <Input type="hidden" name="_token" value={token} />
                    <Label labelName="Title" />
                    <Input name="title" />
                    <Label labelName="Image" />
                    <input type="file" name="image" className="mb-2.5 w-3xl border-gray-400 p-2 text-white" />;
                    <Label labelName="Description" />
                    <Tiptap />
                    <TextArea name="description" />
                    <Label labelName="Tags" />
                    <Input name="tags" />
                    <div className="flex w-3xl justify-end">
                        <Button text="Submit New Post" />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
