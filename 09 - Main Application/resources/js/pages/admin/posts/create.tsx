import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import Tiptap from '@/components/tip-tap';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { FormEvent } from 'react';

type Category = {
    id: string;
    category_name: string;
};

type PageProps = {
    categories: Category[];
};

export default function Create() {
    const { categories } = usePage<PageProps>().props;

    function submitHandler(e: FormEvent<HTMLInputElement>) {
        e.preventDefault();

        const title = document.getElementById('title') as HTMLInputElement;
        const image = document.getElementById('image') as HTMLInputElement;
        const category = document.getElementById('categories1') as HTMLSelectElement;

        //-- Getting Content From RichText
        const content = document.querySelector('.tiptap')?.childNodes as ArrayLike<ChildNode>;
        const contentArr: string[] = Array.from(content, (el) => (el as Element).outerHTML);

        return router.post(route('admin.store'), {
            title: title.value,
            description: JSON.stringify(contentArr), //-- will send content as a string to check and store in DB
            image: image.files![0], //-- image.files[0] will contain object that inertia convert into FileType object for Laravel
            category: category.value,
        });
    }

    return (
        <DashboardLayout title="Create New Post" identifier="posts">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Create New Post</h1>
                <form encType="multipart/form-data" className="w-3xl">
                    <Label labelName="Title" />
                    <Input name="title" id="title" />
                    <Label labelName="Image" />
                    <div className="mb-6">
                        <input
                            type="file"
                            name="image"
                            id="image"
                            className="w-full cursor-pointer rounded border bg-white text-sm font-medium text-slate-500 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-slate-500 file:hover:bg-gray-200"
                        />
                        <p className="my-2 text-xs text-slate-50">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                    </div>
                    <Label labelName="Description" />
                    <Tiptap content="Write Something Meaningful" />
                    <Label labelName="Category" />
                    <select name="categories" id="categories1" className="mb-6 rounded-lg bg-slate-300 py-2 pr-5 pl-4" defaultValue="Select Category">
                        <option value="">Select Category</option>
                        {categories.map((el) => (
                            <option value={el.id} key={el.category_name}>
                                {el.category_name}
                            </option>
                        ))}
                    </select>
                    <Label labelName="Tags" />
                    <Input name="tags" id="tags" />
                    <div className="flex justify-end">
                        <Button text="Submit New Post" clickFn={submitHandler} />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
