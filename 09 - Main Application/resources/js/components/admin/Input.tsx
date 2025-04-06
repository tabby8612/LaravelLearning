type Props = {
    name: string;
    type?: string;
    value?: string;
};

export default function Input({ name, type = 'text', value = '' }: Props) {
    return <input type={type} name={name} defaultValue={value} className="mb-2.5 w-3xl rounded-xl border-2 border-gray-400 p-2 text-white" />;
}
