type Props = {
    num: number | string;
};

export default function Pagination({ num }: Props) {
    const queryString = window.location.search;
    const currPage = queryString.split('=')[1] ?? 1;

    return (
        <a
            href={`?page=${num}`}
            className={`bg-primary-dark rounded-md p-2.5 font-bold shadow-amber-200 drop-shadow-2xl hover:brightness-150 ${+currPage === num ? `text-primary-text brightness-150` : `text-white`}`}
            key={num}
        >
            {num}
        </a>
    );
}
