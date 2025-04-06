type Props = {
    labelName: string;
};

export default function Label({ labelName }: Props) {
    return (
        <label htmlFor="title" className="text-primary-text mb-2.5 block text-xl font-bold">
            {labelName}:
        </label>
    );
}
