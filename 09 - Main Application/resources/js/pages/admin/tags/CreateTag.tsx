import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import InputError from '@/components/input-error';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function CreateTag() {
    const { errors } = usePage().props;

    function formHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const tagName = document.getElementById('tag') as HTMLInputElement;

        router.post(route('tags.store'), {
            tag: tagName.value,
        });
    }

    return (
        <DashboardLayout title="Create New Tag" identifier="tags">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Create New Tag</h1>
                <form onSubmit={formHandler}>
                    <Label labelName="Tag Name" />
                    <Input type="text" id="tag" name="tag" />
                    <InputError message={errors.tag} className="mb-5 text-white" />

                    <div className="flex w-3xl justify-end">
                        <Button text="Create New Tag" />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
