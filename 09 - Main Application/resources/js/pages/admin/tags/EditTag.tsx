import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import InputError from '@/components/input-error';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

type Tag = {
    id: string;
    tag_name: string;
};

type Props = {
    tagData: Tag;
};

export default function EditTag({ tagData }: Props) {
    const { errors } = usePage().props;

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const tagName = document.getElementById('tag') as HTMLInputElement;

        router.patch(route('tags.update', tagData.id), {
            tagName: tagName.value,
        });

        return;
    }

    return (
        <DashboardLayout title="Edit Tag" identifier="tags">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Edit Tag</h1>
                <form onSubmit={handleSubmit}>
                    <Label labelName="Tag Name" />
                    <Input type="text" id="tag" name="tag" value={tagData.tag_name} />
                    <InputError message={errors.tagName} className="mb-5 text-white" />

                    <div className="flex w-3xl justify-end">
                        <Button text="Edit Tag" />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
