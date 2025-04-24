import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";

// Create API endpoint for GET /api/product/[id]
export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const product = await prisma.products.findFirst({
      where: { id: Number(id) },
    });

    ;

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    ;
    return NextResponse.json({ error: "Something went wrong" }, { status: 400 });
  }
}
