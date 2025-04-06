import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import TextArea from '@/components/admin/TextArea';
import DashboardLayout from '@/layouts/dashboard-layout';
import { MoveLeft } from 'lucide-react';

type Props = {
    data: {
        id: string;
        title: string;
        description: string;
        token: string;
        image: string;
    };
};
export default function create({ data }: Props) {
    return (
        <DashboardLayout title="Edit Post" identifier="posts">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Edit Post</h1>
                <form action={`/admin/${data.id}`} method="POST" encType="multipart/form-data">
                    <Input type="hidden" name="_token" value={data.token} />
                    <Input type="hidden" name="_method" value="PATCH" />
                    <Label labelName="Title" />
                    <Input name="title" value={data.title} />
                    <Label labelName="Image" />
                    {data.image && <img className="mb-2 h-28" src={`/images/${data.image}`} alt={data.title} />}
                    <input type="file" name="image" className="mb-2.5 w-3xl border-gray-400 p-2 text-white" />;
                    <Label labelName="Description" />
                    <TextArea name="description" value={data.description} />
                    <Label labelName="Tags" />
                    <Input name="tags" />
                    <div className="flex w-3xl justify-between">
                        <div className="my-auto">
                            <MoveLeft className="text-primary-dark mr-2 inline" />
                            <a href="/admin/posts/all" className="text-primary-text font-poppins text-l my-auto mb-3.5 font-medium">
                                Back To All Post
                            </a>
                        </div>
                        <Button text="Submit New Post" />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
