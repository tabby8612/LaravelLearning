import DashboardLayout from '@/layouts/dashboard-layout';
import { router } from '@inertiajs/react';

type Role = {
    id: string;
    role: string;
    created_at: string;
    updated_at: string;
};

type Props = {
    roles: Role[];
    assignedRoles: string[];
};

export default function Roles({ roles, assignedRoles }: Props) {
    const btnClasses = 'cursor-pointer rounded-[10px] px-3.5 py-2 shadow-[5px] shadow-black hover:brightness-125 mt-2.5';
    const disabledBtnClasses = 'disabled:bg-gray-500 disabled:hover:brightness-100 disabled:cursor-not-allowed';

    function attachHandler(id: string) {
        router.post(route('roles.attach', id));
    }

    function detachHandler(id: string) {
        router.post(route('roles.detach', id));
    }

    return (
        <DashboardLayout title="All Roles" identifier="roles">
            <div className="mx-12 mt-12 box-border flex w-[80%]">
                <div className="flex w-full justify-between gap-7 align-baseline">
                    <h1 className="text-primary-text font-poppins my-7 text-5xl font-medium">All Roles</h1>
                </div>
            </div>

            <div className="mx-12 my-2 w-[80%]">
                <table className="mx-12 my-5 table-cell rounded-2xl border-2 border-gray-50 pt-3.5 pb-3.5 shadow-xl">
                    <thead className="mt-7 py-2 pt-6">
                        <tr className="text-l rounded-2xl bg-blue-100 py-2">
                            <th className="rounded-2xl px-2.5 py-1">Id</th>
                            <th className="w-4xl px-2.5">Roles</th>
                            <th className="w-4xl px-2.5">Created</th>
                            <th className="w-4xl px-2.5">Updated</th>
                            <th className="w-4xl px-7">Attach</th>
                            <th className="w-4xl px-7">Detach</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {roles.map((role) => (
                            <tr className="h-10 border-blue-200" key={role.id}>
                                <td className="p-3 text-center">{role.id}</td>
                                <td className="p-3 text-center">{role.role}</td>
                                <td className="pr-3 text-center">{role.created_at}</td>
                                <td className="pr-3 text-center">{role.updated_at}</td>
                                <td className={`mr-1.5 text-center`}>
                                    <button
                                        className={`bg-green-700 ${btnClasses} ${assignedRoles.includes(role.id) && disabledBtnClasses} `}
                                        disabled={assignedRoles.includes(role.id)}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            attachHandler(role.id);
                                        }}
                                    >
                                        Attach
                                    </button>
                                </td>
                                <td className={`mr-1.5 text-center`}>
                                    <button
                                        className={`bg-red-700 ${btnClasses} ${!assignedRoles.includes(role.id) && disabledBtnClasses}`}
                                        disabled={!assignedRoles.includes(role.id)}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            detachHandler(role.id);
                                        }}
                                    >
                                        Detach
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
}
