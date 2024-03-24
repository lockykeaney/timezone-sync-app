"use client";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

import { api } from "~/trpc/react";

const CreateUserFormInputSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8),
});

type CreateUserFormInput = z.infer<typeof CreateUserFormInputSchema>;

export default function SignUpPage() {
  const { register, handleSubmit } = useForm<CreateUserFormInput>();

  const createNewUser = api.user.createNewUser.useMutation({
    onSuccess: (res) => {
      console.log(res);
    },
  });

  const onSubmit: SubmitHandler<CreateUserFormInput> = (data) => {
    createNewUser.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="username">Username</Label>
      <Input {...register("username")} placeholder="Username" />
      <Label htmlFor="email">Email</Label>
      <Input {...register("email")} placeholder="Email" />
      <Label htmlFor="password">Password</Label>
      <Input {...register("password")} placeholder="Password" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
