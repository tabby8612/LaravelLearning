import { ChangeEvent } from 'react';

type Props = {
    name: string;
    type?: string;
    value?: string;
    id?: string;
    onChangeFn?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ name, type = 'text', value = '', id, onChangeFn, ...props }: Props) {
    return (
        <input
            type={type}
            name={name}
            id={id}
            defaultValue={value}
            onChange={onChangeFn}
            className="mb-2.5 w-3xl rounded-xl border-2 border-gray-400 p-2 text-white"
            {...props}
        />
    );
}
