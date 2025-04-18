import StatsTab from '@/components/admin/StatsTab';
import DashboardLayout from '@/layouts/dashboard-layout';

type Props = {
    postsCount: number;
    usersCount: number;
    username: string;
};

export default function Dashboard({ postsCount, usersCount, username }: Props) {
    return (
        <DashboardLayout title="Dashboard" identifier="dashboard" user={username}>
            <div className="mx-12 my-12 h-[500px] w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Dashboard</h1>

                <div id="statscards" className="flex">
                    <StatsTab tabName="Users" tabStats={`${usersCount}`} />
                    <StatsTab tabName="Posts" tabStats={`${postsCount}`} />
                    <StatsTab tabName="Categories" tabStats="0" />
                    <StatsTab tabName="Tags" tabStats="0" />
                </div>
            </div>
        </DashboardLayout>
    );
}
