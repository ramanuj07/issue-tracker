import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../prisma/client";

const issueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const issueBody = await req.json();
  const validation = issueSchema.safeParse(issueBody);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: issueBody.title,
      description: issueBody.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
