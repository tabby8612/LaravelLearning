import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import InputError from '@/components/input-error';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useState } from 'react';

type Data = {
    id: string;
    name: string;
    email: string;
    password: string;
};

type Props = {
    userData: Data;
};

export default function EditUser({ userData }: Props) {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        name: userData.name,
        email: userData.email,
        password: userData.password,
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();

        setValues((values) => ({
            ...values,
            [e.target.id]: e.target.value,
        }));
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(`In handle Submit`);
        router.patch(route('user.update', userData.id), values);
    }

    return (
        <DashboardLayout title="Edit User" identifier="users">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Edit User</h1>
                <form onSubmit={handleSubmit}>
                    <Label labelName="name" />
                    <Input type="text" id="name" name="name" value={values.name} onChangeFn={handleChange} />
                    <InputError message={errors.name} className="mb-5 text-white" />

                    <Label labelName="email" />
                    <Input type="text" id="email" name="email" value={values.email} onChangeFn={handleChange} />
                    <InputError message={errors.email} className="mb-5 text-white" />

                    <Label labelName="password" />
                    <Input type="password" id="password" name="password" onChangeFn={handleChange} />
                    <InputError message={errors.password} className="mb-5 text-white" />

                    <Label labelName="Confirm Password" />
                    <Input type="password" id="password_confirmation" name="password_confirmation" onChangeFn={handleChange} />

                    <div className="flex w-3xl justify-end">
                        <Button text="Edit User" />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
