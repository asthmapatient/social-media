"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/PasswordInput";
import { loginSchema, LoginValue } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { login } from "./action";
import { useToast } from "@/hooks/use-toast";
import LoadingButton from "@/components/ui/loadingbutton";


const LoginForm = () => {
  const form = useForm<LoginValue>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();
  const onSubmit = async (values: LoginValue) => {
    startTransition(async () => {
      const { message, success } = await login(values);
      if (success) {
        toast({
          title: message,
        });
      } else {
        toast({
          title: message,
        });
      }
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Username:</FormLabel>
                <Input placeholder="Username" {...field} />
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <PasswordInput placeholder="Password" {...field} />
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <LoadingButton
          type="submit"
          loading={isPending}
          className="w-full mt-4"
        >
          Login
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
