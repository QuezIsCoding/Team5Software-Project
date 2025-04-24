import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";


//Create API end points
export async function GET(){
    try {
        const products = await prisma.products.findMany()
            ;
            return NextResponse.json(products);
    }catch (error){
        console.log(error);
        ;
        return new NextResponse("Error Something went wrong", {status:400});
    }
    
}