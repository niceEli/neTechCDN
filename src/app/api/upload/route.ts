import prisma from "@/lib/prisma";
import {randomUUID} from "node:crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({error: 'No file uploaded'}, {status: 400});
    }

    if (!(file instanceof File)) {
      return Response.json({error: 'Invalid file'}, {status: 400});
    }

    const buffer = await file.arrayBuffer();
    const base64Data = Buffer.from(buffer).toString('base64');
    const dataUrl = `data:${file.type};base64,${base64Data}`;

    const dbFile = await prisma.file.create({
      data: {
        name: file.name,
        adminKey: randomUUID(),
        fileType: file.type,
        base64: dataUrl,
      }
    })
    
    return Response.json({
      id: dbFile.id,
      adminKey: dbFile.adminKey
    });

  } catch (error) {
    return Response.json({error: `Failed to process file ${error}`}, {status: 500});
  }
}