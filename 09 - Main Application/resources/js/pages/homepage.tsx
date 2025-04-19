import { Card as PostCard } from '@/components/homepage/Card';
import Pagination from '@/components/homepage/Pagination';
import HomepageLayout from '@/layouts/homepage-layout';
import { router, usePage } from '@inertiajs/react';
import { createContext, FormEvent } from 'react';

type DataType = {
    id: string;
    title: string;
    description: string;
    user: string;
    date: string;
    image: string;
    category: string;
};

type Props = {
    data: DataType[];
    totalPages: number;
    isLoggedIn: boolean;
};

//-- To pass data from Parent to Grandchild (Homepage to HomeLayout to Sidebar)
//-- We can use createContext to pass data from HomePage directly to Sidebar
//-- we can create Content outside the top level component and export returning
//-- context value (PostContext). We need to wrap content with Provider and
//-- pass value to consume it with useContext.
export const PostContext = createContext<DataType[]>([]);

type Category = {
    category_name: string;
    id: string;
};

type PageProps = {
    categories: Category[];
};

export default function Homepage({ data, totalPages, isLoggedIn }: Props) {
    const { categories } = usePage<PageProps>().props;

    const numbers: number[] = [];

    for (let i = 0; i < totalPages; i++) {
        numbers.push(i + 1);
    }

    function handleCategorySubmit(e: FormEvent<HTMLButtonElement & { id: string }>) {
        e.preventDefault();

        const button = e.target as HTMLButtonElement;
        console.log(button.id);
        router.get(route('categoryPosts', button.id));
    }

    return (
        <PostContext.Provider value={data}>
            <HomepageLayout page="Homepage" isLoggedIn={isLoggedIn}>
                <div id="content" className="ml-10">
                    <div id="CategoryFilter" className="mx-auto mt-6 flex justify-center gap-3.5">
                        {categories.map((el) => (
                            <button
                                className="bg-primary-dark cursor-pointer rounded-[10px] px-5 py-3 text-white hover:brightness-125"
                                id={el.id}
                                key={el.id}
                                onClick={handleCategorySubmit}
                            >
                                {el.category_name}
                            </button>
                        ))}
                    </div>
                    {data.map((el) => (
                        <PostCard
                            id={el.id}
                            title={el.title}
                            image={el.image}
                            date={el.date}
                            description={el.description}
                            user={el.user}
                            key={el.id}
                            category={el.category}
                        />
                    ))}

                    <div className="my-10 flex w-[80%] justify-end gap-3">
                        {numbers.map((el) => (
                            <Pagination num={el} key={el} />
                        ))}
                    </div>
                </div>
            </HomepageLayout>
        </PostContext.Provider>
    );
}
