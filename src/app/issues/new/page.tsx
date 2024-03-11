"use client";

import Spinner from "@/components/Spinner";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, handleSubmit } = useForm<IssueForm>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="p-4 space-y-4"
        onSubmit={handleSubmit(async (data) => {
          try {
            setIsLoading(true);
            await fetch("/api/issues", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            router.push("/issues");
            setIsLoading(false);
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <TextArea placeholder="Description" {...register("description")} />
        <Button disabled={isLoading}>
          Submit New Issue {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
