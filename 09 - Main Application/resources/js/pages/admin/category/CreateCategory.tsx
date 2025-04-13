import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import InputError from '@/components/input-error';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function CreateCategory() {
    const { errors } = usePage().props;

    console.log(errors);

    function formhandler(e: FormEvent<HTMLFormElement>) {
        //>> REMEMBER: FormEvent has preventDefault() and FormEventHandler doesn't
        //>> And we need to type cast Event type to element type

        e.preventDefault();

        //>> To avoid undefined errors we need to tell TS this is HTMLInputElement
        const category = document.getElementById('category') as HTMLInputElement;

        //-- Now to submit post/patch/delete request we need to use router
        //-- instance and use its methods in which pass route and payload/data.
        router.post(route('categories.store'), {
            category: category.value,
        });
    }

    return (
        <DashboardLayout title="Create New Category" identifier="categories">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Create New Category</h1>
                {/* //? IMPORTANT: when submitting form with Inertia we don't need to add field for TOKEN and METHOD field */}
                <form onSubmit={formhandler}>
                    <Label labelName="Category Name" />
                    <Input type="text" id="category" name="category" />
                    <InputError message={errors.category} className="mb-5 text-white" />

                    <div className="flex w-3xl justify-end">
                        <Button text="Create New Category" />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
