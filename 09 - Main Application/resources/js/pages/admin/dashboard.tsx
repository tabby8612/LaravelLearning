import StatsTab from '@/components/admin/StatsTab';
import DashboardLayout from '@/layouts/dashboard-layout';

type Props = {
    postsCount: number;
    usersCount: number;
    tagsCount: number;
    categoriesCount: number;
};

export default function Dashboard({ postsCount, usersCount, tagsCount, categoriesCount }: Props) {
    return (
        <DashboardLayout title="Dashboard" identifier="dashboard">
            <div className="mx-12 my-12 h-[500px] w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Dashboard</h1>

                <div id="statscards" className="flex">
                    <StatsTab tabName="Users" tabStats={`${usersCount}`} />
                    <StatsTab tabName="Posts" tabStats={`${postsCount}`} />
                    <StatsTab tabName="Categories" tabStats={`${categoriesCount}`} />
                    <StatsTab tabName="Tags" tabStats={`${tagsCount}`} />
                </div>
            </div>
        </DashboardLayout>
    );
}
