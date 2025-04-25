import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import Tiptap from '@/components/tip-tap';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useState } from 'react';

type Category = {
    id: string;
    category_name: string;
};

type PageProps = {
    categories: Category[];
};

export default function Create() {
    const { categories } = usePage<PageProps>().props;
    const [postTags, setpostTags] = useState<string[]>([]);
    const [postDescription, setPostDescription] = useState<string>('');

    //-- Handle Submit Form
    function submitHandler(e: FormEvent<HTMLInputElement>) {
        e.preventDefault();

        const title = document.getElementById('title') as HTMLInputElement;
        const image = document.getElementById('image') as HTMLInputElement;
        const category = document.getElementById('categories1') as HTMLSelectElement;

        return router.post(route('admin.store'), {
            title: title.value,
            description: postDescription, //-- will send content as a string to check and store in DB
            image: image.files![0], //-- image.files[0] will contain object that inertia convert into FileType object for Laravel
            category: category.value,
            tags: postTags,
        });
    }

    //-- Change Tags Event, adds tags in an array and "," press
    function tagsHandler(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value.includes(',')) {
            // add logic to attach tag if tag is present
            // else add new tag and attach
            const tag = e.target.value.split(',')[0];
            e.target.value = '';
            setpostTags((prevPostTags) => [...prevPostTags, tag]);
        }
    }

    function removeTagHandler(tag: string) {
        setpostTags((prevPostTags) => prevPostTags.filter((el) => el != tag));
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
                            className="file:bg-primary-dark w-full cursor-pointer rounded border bg-white text-sm font-medium text-slate-500 file:mr-4 file:cursor-pointer file:rounded-xs file:border-0 file:px-4 file:py-3 file:text-white file:hover:bg-gray-200"
                        />
                        <p className="my-2 text-xs text-slate-50">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
                    </div>
                    <Label labelName="Description" />
                    <div className="text-white">
                        <Tiptap content={postDescription} setContent={setPostDescription} />
                    </div>
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
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        className="mb-4 w-3xl rounded-xl border-2 border-gray-400 p-2 text-white"
                        onChange={tagsHandler}
                    />
                    <div id="tagsContainer">
                        {postTags && (
                            <ul className="ml-3 flex gap-3 align-middle">
                                {postTags.map((el, index) => (
                                    <li
                                        className="rounded-[5px] bg-slate-400 px-2 py-1 align-middle text-[12px]"
                                        key={index}
                                        onClick={() => removeTagHandler(el)}
                                    >
                                        {el}

                                        <span className="ml-3 inline size-3.5 cursor-pointer rounded-[5px] hover:text-white">X</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <Button text="Submit New Post" clickFn={submitHandler} />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
