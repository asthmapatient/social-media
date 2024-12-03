"use client";;
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signUp } from "./actions";
import PasswordInput from "@/components/ui/PasswordInput";
import LoadingButton from "@/components/ui/loadingbutton";
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition(); //another way it also accounts for the redirects , while the new page is loading, it will still shows the loading state
  console.log("isPending", isPending);
  const { toast } = useToast();
  async function onSubmit(values: SignUpValues) {
    startTransition(async () => {
      const result = await signUp(values);
      if (result.success) {
        toast({
          title: result.message,
        });
        router.push("/login");
      }
      toast({
        title: result.message,
      });
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
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
                <Input placeholder="email" type="email" {...field} />
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
                <PasswordInput placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={isPending}
          disabled={isPending}
          type="submit"
          className="w-full"
        >
          Create Account
        </LoadingButton>
      </form>
    </Form>
  );
};

export default SignUpForm;
