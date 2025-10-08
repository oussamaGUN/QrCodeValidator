import { useState } from "react";
export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (file) {
      const fd = new FormData();
      fd.append('file', file);
      console.log(fd);

    }
  };

  return (
      <main>
        <h1>Welcome to the Home Page</h1>
        <input onChange={handleFileChange} type="file" />
        <button onClick={handleUpload}>Upload</button>
        {file?.type === "application/pdf" && <p>Selected file: {file.type}</p>}
      </main>
  );
}
