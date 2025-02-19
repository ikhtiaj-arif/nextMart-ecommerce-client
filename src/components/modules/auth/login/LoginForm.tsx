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
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginFormSchema } from "./loginValidation";


// Validation Schema using Zod


const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const { formState: { isSubmitting } } = form

    const [reCaptchaStatus, setReCaptchaStatus] = useState(false)

    const searchParams = useSearchParams()
    const redirect = searchParams.get("redirectPath")
    const router = useRouter()




    const handleRecaptcha = async (value: string | null) => {
        try {
            const res = await reCaptchaTokenVerification(value!)
            if (res.success) {
                setReCaptchaStatus(true)

            } else {
                setReCaptchaStatus(false)

            }

        } catch (error: any) {
            console.log(error);
        }
    }


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        try {
            const res = await loginUser(data)
            if (res.success) {
                toast.success(res?.message)
                if (redirect) {
                    router.push(redirect)
                } else {
                    router.push("/profile")
                }
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
                <CardTitle className="text-center text-xl font-semibold">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">


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
                        <div className="flex mt-3 w-full">

                            <ReCAPTCHA
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string}
                                onChange={handleRecaptcha}
                                className="mx-auto"
                            />
                        </div>
                        <Button disabled={reCaptchaStatus ? false : true} type="submit" className="w-full">
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default LoginForm;
