"use client";
import {useRef} from "react";

export default function UploadButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload failed');

      const res = await response.json();
      
      window.location.href = `/info/${res.id}?key=${res.adminKey}`;

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return <>
    <input
      type="file"
      className="hidden"
      ref={fileInputRef}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
      }}
    />
    <button className={"btn btn-primary btn-xl"} onClick={() => {
      fileInputRef.current?.click();
    }}>Upload!</button>
  </>
}