import UploadButton from "@/components/UploadButton";

export default async function Home() {
  return <>
    <div className={"flex flex-col items-center justify-center min-w-screen min-h-screen gap-2"}>
      <h1 className={"text-5xl font-bold"}>niceEli.tech CDN</h1>
      <div className={"flex"}>
        <UploadButton />
      </div>
    </div>
  </>
}
