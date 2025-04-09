import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import TextArea from '@/components/admin/TextArea';
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
};

export const PostContext = createContext<DataType[]>([]);

export default function Contact({ data }: Props) {
    return (
        <PostContext.Provider value={data}>
            <HomepageLayout page="Contact">
                <div id="contactform" className="from-primary-dark to-primary-light h-[800px] bg-gradient-to-r from-40% pt-5">
                    <form action="" className="ml-5">
                        <Label labelName="Name" />
                        <Input name="name" />

                        <Label labelName="Email" />
                        <Input name="email" />

                        <Label labelName="Message" />
                        <TextArea name="message" />

                        <div className="flex w-[65%] justify-end">
                            <Button text="Submit" />
                        </div>
                    </form>
                </div>
            </HomepageLayout>
        </PostContext.Provider>
    );
}
