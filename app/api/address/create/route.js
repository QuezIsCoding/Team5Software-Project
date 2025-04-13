import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


//Create API end points
export async function POST(req){
    const supabase = createServerComponentClient({ cookies });
    
    try {
        const{ data: {user} }= await supabase.auth.getUser()

        if (!user) throw Error()

            const body = await req.json();
        
            const res = await prisma.addresses.create({
                data: {
                    user_id: user?.id,
                    name: body.name,
                    address: body.address,
                    city: body.city,
                    zipcode: body.zipcode,
                    country: body.country,
                }
            })
            await prisma.$disconnect();
            return NextResponse.json(res);
    }catch (error){
        console.log(error);
        await prisma.$disconnect();
        return new NextResponse("Error Something went wrong", {status:400});
    }
    
}