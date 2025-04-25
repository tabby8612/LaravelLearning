import StatsTab from '@/components/admin/StatsTab';
import DashboardLayout from '@/layouts/dashboard-layout';

type Props = {
    postsCount: number;
    usersCount: number;
    tagsCount: number;
    categoriesCount: number;
    commentsCount: number;
    rolesCount: number;
};

export default function Dashboard({ postsCount, usersCount, tagsCount, categoriesCount, commentsCount, rolesCount }: Props) {
    return (
        <DashboardLayout title="Dashboard" identifier="dashboard">
            <div className="mx-12 my-12 h-[500px] w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Dashboard</h1>

                <div id="statscards" className="flex">
                    <StatsTab tabName="Posts" tabStats={`${postsCount}`} />
                    <StatsTab tabName="Categories" tabStats={`${categoriesCount}`} />
                    <StatsTab tabName="Tags" tabStats={`${tagsCount}`} />
                    <StatsTab tabName="Users" tabStats={`${usersCount}`} />
                    <StatsTab tabName="Comments" tabStats={`${commentsCount}`} />
                    <StatsTab tabName="Roles" tabStats={`${rolesCount}`} />
                </div>
            </div>
        </DashboardLayout>
    );
}
