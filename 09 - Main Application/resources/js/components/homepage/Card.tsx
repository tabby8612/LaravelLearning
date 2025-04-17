import { UserIcon } from 'lucide-react';

type Props = {
    id: string;
    title: string;
    description: string;
    user: string;
    date: string;
    image: string;
};

export function Card({ id, image, date, title, description, user }: Props) {
    return (
        <div id="card" className="my-5 flex">
            <div className="mr-3 h-70 w-50 rounded-3xl">
                <img src={`/images/${image}`} alt={title} className="block h-full w-full rounded-3xl object-cover" />
            </div>
            <div>
                <div className="mt-2 flex gap-1">
                    <p className="px-3.5 py-2.5 text-[13px] text-gray-500">{date}</p>
                    <p className="rounded-xl bg-gray-200 px-2 py-2 text-[13px] text-gray-500">Self Development</p>
                </div>
                <a href={`/post/${id}`} className="bg-amber-400">
                    <h1 className="font-poppins text-primary-dark px-3.5 py-2.5 text-2xl font-bold hover:text-blue-800">{title}</h1>
                </a>
                <p className="border-gray-400 px-3.5 py-2.5 after:mx-auto after:my-6 after:block after:w-[70%] after:rounded-xl after:border-1 after:border-gray-200">
                    <div dangerouslySetInnerHTML={{ __html: description.substring(0, 100) }}></div>
                </p>
                <div className="mx-3 my-auto flex gap-5 align-middle">
                    <UserIcon className="my-auto size-8" />
                    <div>
                        <h1 className="text-md font-bold">{user}</h1>
                        <p className="text-xs text-gray-400">Author</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
