import { Card as PostCard } from '@/components/homepage/Card';
import HomepageLayout from '@/layouts/homepage-layout';

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
};

export default function Homepage({ data, totalPages }: Props) {
    const queryString = window.location.search;
    const currPage = queryString.split('=')[1] ?? 1;
    console.log(currPage);

    const numbers: number[] = [];

    for (let i = 0; i < totalPages; i++) {
        numbers.push(i + 1);
    }

    console.log(data);

    return (
        <HomepageLayout page="Homepage">
            {data.map((el, index) => (
                <PostCard title={el.title} image={el.image} date={el.date} description={el.description} user={el.user} key={index} />
            ))}

            <div className="my-10 flex w-[80%] justify-end gap-3">
                {numbers.map((el) => (
                    <a
                        href={`?page=${el}`}
                        className={`bg-primary-dark p-2.5 font-bold hover:brightness-150 ${+currPage === el ? `text-primary-text brightness-150` : `text-white`}`}
                        key={el}
                    >
                        {el}
                    </a>
                ))}
            </div>
        </HomepageLayout>
    );
}
