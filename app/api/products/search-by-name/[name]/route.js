import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";

// Create API endpoint
export async function GET(req, { params }) {
  try {
    const { name } = params;

    const items = await prisma.products.findMany({
      take: 5,
      where: {
        title: {
          contains: name,
          mode: "insensitive",
        },
      },
    });

    await prisma.$disconnect();
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return new NextResponse("Error Something went wrong", { status: 400 });
  }
}
