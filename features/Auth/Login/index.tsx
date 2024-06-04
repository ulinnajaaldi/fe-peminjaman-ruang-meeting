"use client";

import Image from "next/image";
import Link from "next/link";

import { useLoginUser } from "@/useCases/AuthUseCases";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES_PATH } from "@/constants/routes";
import { ActionBackToHome } from "@/components/common";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLoginFeature } from "./hook";

const LoginFeature = () => {
  const { form } = useLoginFeature();

  const { mutate, isPending } = useLoginUser();

  return (
    <main className="relative w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Masukan email atau username untuk login ke akun anda
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((values) => mutate(values))}
              className="space-y-8"
            >
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email/ Username</FormLabel>
                      <FormControl>
                        <Input placeholder="email or username" {...field} />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Loading..." : "Login"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden h-[100vh] bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="absolute left-0 top-0 m-5">
        <ActionBackToHome />
      </div>
    </main>
  );
};

export default LoginFeature;
