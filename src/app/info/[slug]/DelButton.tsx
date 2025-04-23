"use client";

export default function DelButton({slug, sp}: {slug: string, sp: { [key: string]: string | undefined }}) {
  
  let k = sp["key"]
  if (!k) k = ""
  const trueKey: string = k

  async function deleteFile(slug: string, key: string) {
    await fetch(`/api/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key, slug})
    })
    window.location.href = `/`
  }
  
  if (trueKey != "") {
    return <button className={"btn btn-error"} onClick={() => deleteFile(slug, trueKey)}>Delete</button>
  }
}