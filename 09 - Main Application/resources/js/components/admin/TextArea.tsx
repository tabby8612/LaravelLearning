type Props = {
    name: string;
    value?: string;
};

export default function TextArea({ name, value = '' }: Props) {
    return (
        <textarea
            name={name}
            id={name}
            rows={8}
            defaultValue={value}
            className="mb-2.5 w-3xl rounded-xl border-2 border-gray-400 p-2 text-white"
        ></textarea>
    );
}
