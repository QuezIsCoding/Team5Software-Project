import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Create API endpoint
export async function POST(req) {
    // Await the cookies() function
    const cookieStore = await cookies(); 
    const supabase = createServerComponentClient({ cookies: () => cookieStore });

    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error("User not found");

        const body = await req.json();
        const stripe = new Stripe(process.env.STRIPE_SK_KEY || "");

        const res = await stripe.paymentIntents.create({
            amount: Number(body.amount),
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        return new NextResponse("Error: Something went wrong", { status: 400 });
    }
}
