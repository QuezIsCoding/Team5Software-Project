import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Create API end point
export async function GET() {
    const cookieStore = await cookies(); 
    const supabase = createServerComponentClient({ cookies: () => cookieStore }); // ✅ pass it as a function

    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error("User not found");

        const orders = await prisma.orders.findMany({
            where: { user_id: user?.id },
            orderBy: { id: "desc" },
            include: {
                orderItem: {
                    include: {
                        product: true
                    }
                }
            }
        });

        ;
        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        ;
        return new NextResponse("Error: Something went wrong", { status: 400 });
    }
}
