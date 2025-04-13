import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import InputError from '@/components/input-error';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

type Category = {
    id: string;
    name: string;
};

type Props = {
    categoryData: Category;
};

export default function EditCategory({ categoryData }: Props) {
    const { errors } = usePage().props;

    function submitHandler(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const categoryName = document.getElementById('category') as HTMLInputElement;

        router.put(route('categories.update', categoryData.id), {
            categoryName: categoryName.value,
        });
    }

    return (
        <DashboardLayout title="Edit Category" identifier="categories">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Edit Category</h1>
                <form onSubmit={submitHandler}>
                    <Label labelName="Category Name" />
                    <Input type="text" id="category" name="category" value={categoryData.name} />
                    <InputError message={errors.categoryName} className="mb-5 text-white" />

                    <div className="flex w-3xl justify-end">
                        <Button text="Update Category" />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
