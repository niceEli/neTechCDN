import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
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

  const base64 = file.base64

  const fileResponse = await fetch(base64, {
    headers: {
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'max-age=31536000'
    }
  })

  const stream = fileResponse.body;

  return new Response(stream, {
    status: fileResponse.status,
    headers: {
      "Content-Type": fileResponse.headers.get("Content-Type") || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable, stale-while-revalidate=86400",
      "Content-Disposition": `filename="${file.name}"; filename*=UTF-8''${encodeURIComponent(file.name)}`,
      "last-modified": file.createdAt.toUTCString(),
      "Date": new Date().toUTCString(),
      "Content-Title": file.name,
      "Title": file.name,
      "Transfer-Encoding": "chunked",
      "Accept-Ranges": "bytes",
      "Access-Control-Allow-Origin": "*",
    }
  })
}