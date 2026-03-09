import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import jwt from "jsonwebtoken";

function getUserId(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.userId;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  await connectDB();

  const userId = getUserId(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await Application.find({ userId });

  return NextResponse.json(applications);
}

export async function POST(req: Request) {
  await connectDB();

  const userId = getUserId(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const newApplication = await Application.create({
    userId,
    company: body.company,
    role: body.role,
    status: body.status,
  });

  return NextResponse.json(newApplication);
}

export async function DELETE(req: Request) {
  await connectDB();

  const { id } = await req.json();

  await Application.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted successfully" });
}

export async function PUT(req: Request) {
  await connectDB();

  const { id, status } = await req.json();

  const updated = await Application.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  return NextResponse.json(updated);
}