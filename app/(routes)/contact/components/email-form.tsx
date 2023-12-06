"use client"

import * as z from "zod"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"

import { sendEmail } from "@/actions/sendEmail";
import { Input } from "@/components/ui/input"
import  Button   from "@/components/ui/button" // this is not the same button from admin store may want to download from shadcn and give another name to file
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "./heading"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(1),
  email:z.string().email().min(1),
  orderId: z.string().min(1).optional(),
  message: z.string().min(1),
});

type EmailFormValues = z.infer<typeof formSchema>

export const EmailForm = ({}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = 'Contact';
  const description = 'Send us a message';
  const toastMessage = 'Email sent';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL as string
  const url = new URL(apiUrl);
  const storeId = url.pathname.substring(1); // Remove the leading '/'

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData: EmailFormValues) => {
    try {
      setLoading(true);

      const sendData = {...formData, storeId: storeId}

      const { data, error } = await sendEmail(sendData);
      if (error) {
        toast.error(error);
      }else{
        router.refresh();
        router.push(`/`);
        toast.success(toastMessage);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
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
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem >
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <Button disabled={loading} className="ml-auto" type="submit">
            Send
          </Button>
        </form>
      </Form>
    </>
  );
};
