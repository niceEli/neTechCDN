import prisma from "@/lib/prisma";
import {NextRequest} from "next/server";

export async function GET(
  request: NextRequest | null,
  {params}: { params: Promise<{ slug: string }> }
  ) {
  const slug = (await params).slug;
  // im literally trying to make sure it's a number lil vro
  if (isNaN(parseFloat(slug))) {
    return new Response("Invalid slug", { status: 400 });
  }
  
  const file = await prisma.file.findFirst({where: {id: parseInt(slug)}})
  
  if (!file) {
    return new Response("File not found", { status: 404 });
  }

  const newFile = {...file} as never
  
  delete newFile["adminKey"]
  
  return new Response(JSON.stringify(newFile), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}