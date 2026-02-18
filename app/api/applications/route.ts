import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const applications = await Application.find().sort({ appliedDate: -1 });
    return NextResponse.json(applications);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newApplication = await Application.create(body);

    return NextResponse.json(newApplication);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
  }
}
