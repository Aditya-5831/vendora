"use client";

import {
  signInFormSchema,
  SignInFormValues,
} from "@/lib/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import apiRequest, { setAccessToken } from "@/lib/apiRequest";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AuthErrorResponse {
  error: {
    message: string;
  };
}

const SignInForm = () => {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SignInFormValues) => {
      const response = (await apiRequest.post("/auth/sign-in", values)).data;

      if (response.success) {
        setAccessToken(response.accessToken);
        toast.success(response.message);
      }
    },

    onError: (error: AxiosError) => {
      if (error.response) {
        const errorResponse = error.response.data as AuthErrorResponse;

        if (errorResponse.error.message === "Invalid credentials") {
          toast.error("Invalid credentials");
        } else {
          toast.error("Something went wrong");
        }
      }
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    mutate(values);
    form.reset();
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="jason@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="********" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
