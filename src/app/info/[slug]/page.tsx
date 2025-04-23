import DelButton from "@/app/info/[slug]/DelButton";
import type {File} from "prisma";

import {GET} from "@/app/i/[slug]/route";
import Link from "next/link";

export default async function Page({params, searchParams}: { params: Promise<{ slug: string }>, searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const slug = (await params).slug;
  if (isNaN(Number(slug))) return <><p>ERROR: Give a ID as your slug</p></>
  const sp = (await searchParams)
  
  let key = sp["key"]
  if (!key) key = ""
  
  const data = await GET(null, {params: params})
  if (data.status != 200) return <>
    <div className={"flex flex-col items-center justify-center min-w-screen min-h-screen gap-2"}>
      <h1 className={"text-center font-bold text-3xl"}>File Not Found</h1>
      <Link className={"btn btn-primary"} href={"/"}>Home</Link>
    </div>
  </>
  
  const jsonData: File = await data.json()
  
  
  return <>
    <div className={"flex flex-col items-center justify-center min-w-screen min-h-screen gap-2"}>
      <h1 className={"text-center font-bold text-3xl"}>{jsonData.name} (id: {jsonData.id})</h1>
      <p>Created: {new Date(Date.parse(jsonData.createdAt as unknown as string)).toUTCString()}</p>
      <p>Type: {jsonData.fileType}</p>
      <div className={"flex gap-2"}>
        <Link href={`/u/${jsonData.id}/`} className={"btn btn-success"}>Open</Link>
        <DelButton slug={slug} sp={sp}/>
      </div>
    </div>
  </>
}