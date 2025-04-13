import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";


//Create API end points
export async function GET(req,context){
    try {
        const { name } =context.params
   
        const items = await prisma.products.findMany({
            take:5, 
            where: {
                title:{
                    contains:name,
                    mode: "insensitive",
                }
            }
        })
            await prisma.$disconnect();
            return NextResponse.json(items);
    }catch (error){
        console.log(error);
        await prisma.$disconnect();
        return new NextResponse("Error Something went wrong", {status:400});
    }
    
}