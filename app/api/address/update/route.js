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
        
            const res =await prisma.addresses.update({
                where: {id: Number(body.addressId) },
                data: {
                    name: body.name,
                    address: body.address,
                    zipcode: body.zipcode,
                    city: body.city,
                    state: body.state,
                    country: body.country,
                }
            })
            ;
            return NextResponse.json(res);
    }catch (error){
        console.log(error);
        ;
        return new NextResponse("Error Something went wrong", {status:400});
    }
    
}