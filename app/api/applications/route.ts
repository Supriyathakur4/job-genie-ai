import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Application from "@/models/Application";

export const runtime = "nodejs";

// ================== GET ==================
export async function GET() {
  try {
    await connectDB();

    const applications = await Application.find().sort({
      appliedDate: -1,
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}

// ================== POST ==================
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newApplication = await Application.create({
      company: body.company,
      role: body.role,
      status: body.status || "Applied",
      appliedDate: new Date(),
    });

    return NextResponse.json(newApplication);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}

// ================== DELETE ==================
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Application.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}

// ================== PATCH ==================
export async function PATCH(req: Request) {
  try {
    await connectDB();

    const { id, status } = await req.json();

    const updated = await Application.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}
