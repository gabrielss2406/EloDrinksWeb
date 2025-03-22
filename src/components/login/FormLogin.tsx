"use client"

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginType } from '@/schemas/User';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const FormLogin: React.FC = () => {
    const router = useRouter();

    const form = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data: LoginType) => {
        // TODO - hook for login
        console.log(data)
        toast.success("Bem-vindo(a)!", {
            description: "Logado com sucesso!",
        });
        router.push("/")
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-11/12">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="email@example.com"
                                    type='email'
                                    className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                    className={`bg-gray-200 ${fieldState.invalid ? 'border-red-500' : ''}`}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <div className="text-right">
                    <a href="/reset-password" className="text-sm text-blue-600 hover:underline">
                        Esqueceu a senha?
                    </a>
                </div>
                <Button
                    type="submit"
                    variant={'default'}
                    className='w-full'
                >
                    Login
                </Button>
            </form>
        </Form>
    );
};

export default FormLogin;