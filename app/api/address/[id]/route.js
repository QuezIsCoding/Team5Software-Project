import { cookies } from "next/headers";
import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function GET() {
    const cookieStore = await cookies(); // Await the cookies
    const supabase = createServerComponentClient({ cookies: () => cookieStore }); // ✅ Pass it as a function

    try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error();

        const res = await prisma.addresses.findFirst({
            where: { user_id: user.id }
        });

        ;
        return NextResponse.json(res);
    } catch (error) {
        console.log(error);
        ;
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
