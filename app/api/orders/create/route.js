import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Create API endpoint
export async function POST(req) {
    const cookieStore = await cookies(); 
    const supabase = createServerComponentClient({ cookies: () => cookieStore });
    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error("User not found");

        const body = await req.json();

        const order = await prisma.orders.create({
            data: {
                user_id: user.id,
                stripe_id: body.stripe_id,
                name: body.name,
                address: body.address,
                zipcode: body.zipcode,
                city: body.city,
                country: body.country,
                total: Number(body.total),
            }
        });


        for (const prod of body.products) {
            await prisma.orderItem.create({
                data: {
                    order_id: order.id,
                    product_id: Number(prod.id),
                }
            });
        }

        await prisma.$disconnect();
        return NextResponse.json("Order Complete", { status: 200 });
    } catch (error) {
        console.error("Error in order creation:", error);
        await prisma.$disconnect();
        return new NextResponse("Error: Something went wrong", { status: 400 });
    }
}
