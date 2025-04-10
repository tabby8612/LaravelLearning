import { Card as PostCard } from '@/components/homepage/Card';
import Pagination from '@/components/homepage/Pagination';
import HomepageLayout from '@/layouts/homepage-layout';
import { createContext } from 'react';

type DataType = {
    id: string;
    title: string;
    description: string;
    user: string;
    date: string;
    image: string;
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

export default function Homepage({ data, totalPages, isLoggedIn }: Props) {
    const numbers: number[] = [];

    for (let i = 0; i < totalPages; i++) {
        numbers.push(i + 1);
    }

    return (
        <PostContext.Provider value={data}>
            <HomepageLayout page="Homepage" isLoggedIn={isLoggedIn}>
                <div id="content" className="ml-10">
                    {data.map((el) => (
                        <PostCard
                            id={el.id}
                            title={el.title}
                            image={el.image}
                            date={el.date}
                            description={el.description}
                            user={el.user}
                            key={el.id}
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
