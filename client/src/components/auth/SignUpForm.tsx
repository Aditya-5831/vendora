"use client";

import {
  signUpFormSchema,
  SignUpFormValues,
} from "@/lib/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import apiRequest, { setAccessToken } from "@/lib/apiRequest";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";

interface AuthErrorResponse {
  error: {
    message: string;
  };
}

const SignUpForm = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { setUser } = useAuthStore((state) => state);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SignUpFormValues) => {
      const response = (await apiRequest.post("/auth/sign-up", values)).data;

      if (response.success) {
        setAccessToken(response.accessToken);
        toast.success(response.message);
        setUser(response.user);
      }
    },

    onError: (error: AxiosError) => {
      if (error.response) {
        const errorResponse = error.response.data as AuthErrorResponse;

        if (errorResponse.error.message === "User already exists") {
          toast.error("User already exists");
        } else {
          toast.error("Something went wrong");
        }
      }
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    mutate(values);
    form.reset();
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Jason Watson" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
              "Sign up"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpForm;
