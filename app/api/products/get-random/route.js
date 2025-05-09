import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";

//Create API end points
export async function GET(){
    try {
        const productsCount = await prisma.products.count();
        const skip = Math.floor(Math.random() * productsCount);

        const products = await prisma.products.findMany({
            take:5,
            skip: skip,
            orderBy:{ id: 'asc'},
        })
            ;
            return NextResponse.json(products);
    }catch (error){
        console.log(error);
        ;
        return new NextResponse("Error Something went wrong", {status:400});
    }
    
}