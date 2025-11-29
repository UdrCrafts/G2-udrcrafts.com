"use client";
import z from "zod";
import Link from "next/link" ;
import {Poppins} from "next/font/google";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {cn} from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { registerSchema } from "../../schemas";

const poppins = Poppins({
  subset: ["latin"],
  weight: ["700"],
});

export const SignUpView = () => {

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });
  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    console.log(values);
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="bg-[#F4F4F0] h-screen w-full lg:col-span-3 overflow-y-auto">
        <Form {...form}> 
          <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="flex flex-col gap-8 p-4 lg:p-16" 
            > 
            <div className="flex items-center justify-between mb-8"> 
              <Link href="/"> 
                <span className={cn("text-2xl font-semibold" , poppins.className)}>
                  funroad
                </span> 
              </Link> 
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-base border-none underline"
              >
                <Link prefetch href="/sign-in">
                  Sing in
                </Link>
              </Button>
            </div> 
            <h1 className="text-4xl font-medium">
              Join over 100 creators who are earning money on funroad 
            </h1>
            
          </form> 
        </Form>
      </div>
      <div
        className="h-screen w-full lg:col-span-2 hidden lg:block"
        style={{
          backgroundImage: "url('/auth-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      </div>
    </div>
  );
}
