import CommentSection from '@/components/comment-section';
import HomepageLayout from '@/layouts/homepage-layout';
import { createContext } from 'react';

type Tag = {
    id: string;
    name: string;
};

type DataType = {
    id: string;
    title: string;
    description: string;
    updated_at: string;
    user: string;
    image: string;
    category: string;
    tags: Tag[];
};

type Comment = {
    name: string;
    comment: string;
};

type Props = {
    post: DataType;
    data: DataType[];
    isLoggedIn: boolean;
    comments: Comment[];
};

export const SinglePostContext = createContext<DataType[]>([]);

export default function SinglePost({ post, data, isLoggedIn, comments }: Props) {
    return (
        <SinglePostContext.Provider value={data}>
            <HomepageLayout page={post.title} isLoggedIn={isLoggedIn}>
                <div id="content" className="mx-auto my-7 w-4xl pl-4">
                    <h1 className="text-primary-dark py-5 text-3xl font-bold">{post.title}</h1>
                    <div className="flex gap-5">
                        <p>
                            Posted By: <span className="text-primary-dark">{post.user}</span>
                        </p>
                        <p>
                            Posted On: <span className="text-primary-dark">{post.updated_at}</span>
                        </p>
                    </div>

                    <div className="flex size-96 justify-center py-6">
                        <img src={`/images/${post.image}`} alt={post.title} />
                    </div>
                    <div className="py-3.5" dangerouslySetInnerHTML={{ __html: post.description }}></div>
                    <div id="postFooter">
                        <p>
                            Category: <span className="text-primary-dark">{post.category}</span>
                        </p>
                        <p>
                            Tags:{' '}
                            {post.tags?.map((el) => (
                                <span className="text-primary-dark mr-5 text-[13px]" key={el.id}>
                                    {el.name}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>

                <CommentSection comments={comments} />
            </HomepageLayout>
        </SinglePostContext.Provider>
    );
}
