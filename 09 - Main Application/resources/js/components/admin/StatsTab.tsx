type Props = {
    tabName: string;
    tabStats: string;
};

export default function StatsTab({ tabName, tabStats }: Props) {
    return (
        <div id="users" className="bg-primary-dark mx-3 w-50 rounded-xl p-7 inset-shadow-sm inset-shadow-black">
            <h1 className="text-primary-text font-poppins text-xl font-medium">{tabName}</h1>
            <h2 className="text-lg text-white">{tabStats}</h2>
        </div>
    );
}
