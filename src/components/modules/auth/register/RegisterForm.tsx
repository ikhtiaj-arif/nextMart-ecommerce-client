'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { registerFormSchema } from "./registerValidation";

// Validation Schema using Zod


const RegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const { formState: { isSubmitting } } = form
    const password = form.watch("password")
    const confirmPassword = form.watch("confirmPassword")

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await registerUser(data)
            if (res.success) {
                toast.success(res?.message)
            } else {
                toast.error(res?.message)
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <Card className="max-w-md mx-auto shadow-lg p-6 border border-gray-200">
            <CardHeader>
                <CardTitle className="text-center text-xl font-semibold">Register</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Enter your name" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="Enter your email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Enter your password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Confirm your password" />
                                    </FormControl>
                                    {
                                        confirmPassword && password !== confirmPassword ? <FormMessage >Password does not match</FormMessage> : <FormMessage />
                                    }
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default RegisterForm;
