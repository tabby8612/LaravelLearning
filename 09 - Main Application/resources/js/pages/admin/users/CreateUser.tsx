import Button from '@/components/admin/Button';
import Input from '@/components/admin/Input';
import Label from '@/components/admin/Label';
import InputError from '@/components/input-error';
import DashboardLayout from '@/layouts/dashboard-layout';
import { router, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Create() {
    const { errors } = usePage().props;

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
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
        router.post(route('user.store'), values);
    }

    return (
        <DashboardLayout title="Create New User" identifier="users">
            <div className="mx-12 my-12 w-3xl p-5">
                <h1 className="text-primary-text font-poppins mb-3.5 text-5xl font-medium">Create New User</h1>
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
                        <Button text="Create New User" />
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
