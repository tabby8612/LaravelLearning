import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import TipTap from '@/components/tip-tap';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { MoveLeft, X } from 'lucide-react';
import { FormEvent } from 'react';

type Category = {
    id: string;
    category_name: string;
};

type PageProps = {
    categories: Category[];
};

type PostTags = {
    tag_name: string;
    id: string;
};

type Props = {
    data: {
        id: string;
        title: string;
        description: string;
        token: string;
        image: string;
        category_id: string;
        tags: PostTags[];
    };
};

export default function Edit({ data }: Props) {
    const { categories } = usePage<PageProps>().props;
    console.log(data);

    function submitHandler(e: FormEvent<HTMLInputElement>) {
        e.preventDefault();

        const title = document.getElementById('title') as HTMLInputElement;
        const image = document.getElementById('image') as HTMLInputElement;
        const category = document.getElementById('categories1') as HTMLSelectElement;

        //-- Getting Content From RichText
        const content = document.querySelector('.tiptap')?.childNodes as ArrayLike<ChildNode>;
        const contentArr: string[] = Array.from(content, (el) => (el as Element).outerHTML);

        return router.patch(route('admin.update', data.id), {
            title: title.value,
            description: JSON.stringify(contentArr), //-- will send content as a string to check and store in DB
            image: image.files![0], //-- image.files[0] will contain object that inertia convert into FileType object for Laravel
            category: category.value,
        });
    }

    function detachHandler(id: string) {
        router.post(route('tag.detach', data.id), {
            tagId: id,
        });
    }

    return (
        <DashboardLayout title="Edit Post" identifier="posts">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Edit Post</h1>
                <form encType="multipart/form-data" className="w-3xl">
                    <Label labelName="Title" />
                    <Input name="title" id="title" value={data.title} />
                    <Label labelName="Image" />
                    {data.image && <img className="mb-2 h-28" src={`/images/${data.image}`} alt={data.title} />}
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
                    <TipTap content={data.description} />
                    <Label labelName="Category" />
                    <select
                        name="categories"
                        id="categories1"
                        className="mb-6 rounded-lg bg-slate-300 py-2 pr-5 pl-4"
                        defaultValue={data.category_id}
                    >
                        <option value="">Select Category</option>
                        {categories.map((el) => (
                            <option value={el.id} key={el.category_name}>
                                {el.category_name}
                            </option>
                        ))}
                    </select>
                    <Label labelName="Tags" />
                    {/* <Input name="tags" /> */}
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        className="mb-4 w-3xl rounded-xl border-2 border-gray-400 p-2 text-white"
                        onChange={(e) => {
                            console.log(e.target.value);
                            if (e.target.value.includes(',')) {
                                console.log('yes');

                                // add logic to attach tag if tag is present
                                // else add new tag and attach
                            }
                        }}
                    />
                    <div id="tagsContainer">
                        <ul className="ml-3 flex gap-3 align-middle">
                            {data.tags.length > 0 &&
                                data.tags.map((el) => (
                                    <li className="rounded-[5px] bg-slate-400 px-2 py-1 align-middle text-[12px]">
                                        {el.tag_name}{' '}
                                        <X
                                            className="ml-1 inline size-3.5 cursor-pointer rounded-[5px] hover:text-white"
                                            onClick={() => detachHandler(el.id)}
                                        />
                                    </li>
                                ))}
                        </ul>
                    </div>
                    <div className="flex w-3xl justify-between">
                        <div className="my-auto">
                            <MoveLeft className="text-primary-dark mr-2 inline" />
                            <a href="/admin/posts/all" className="text-primary-text font-poppins text-l my-auto mb-3.5 font-medium">
                                Back To All Post
                            </a>
                        </div>
                        <Button text="Edit Post" clickFn={submitHandler} />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
