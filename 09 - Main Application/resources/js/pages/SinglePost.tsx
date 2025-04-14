import CommentSection from '@/components/comment-section';
import HomepageLayout from '@/layouts/homepage-layout';
import { createContext } from 'react';

type DataType = {
    id: string;
    title: string;
    description: string;
    updated_at: string;
    user: string;
    image: string;
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
                    <p className="py-3.5">{post.description}</p>
                </div>

                <CommentSection comments={comments} />
            </HomepageLayout>
        </SinglePostContext.Provider>
    );
}
