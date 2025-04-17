import { FormEvent } from 'react';

type Props = {
    text: string;
    clickFn?: (e: FormEvent<HTMLInputElement>) => void;
};

export default function Button({ text, clickFn }: Props) {
    return (
        <input
            type="submit"
            value={text}
            className="bg-primary-dark text-primary-text border-primary-dark mt-2 cursor-pointer rounded-md border-2 px-7 py-4 shadow-xl outline-0 hover:bg-blue-900 hover:shadow"
            onClick={clickFn}
        />
    );
}
