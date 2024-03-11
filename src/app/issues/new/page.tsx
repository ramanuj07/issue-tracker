"use client";

import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IssueForm>();

  return (
    <form
      className="max-w-xl p-4 space-y-4"
      onSubmit={handleSubmit(async (data) => {
        await fetch("/api/issues", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        router.push("/issues");
      })}
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <TextArea placeholder="Description" {...register("description")} />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
