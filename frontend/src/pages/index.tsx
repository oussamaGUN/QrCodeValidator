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

  const handleUpload = async () => {
    if (file) {
      if (file?.type !== 'application/pdf') {
        console.log('invalid file')
        throw new Error("invalid file")
      }
      const fd = new FormData();
      fd.append('file', file);
      const response = await fetch('http://localhost:3001/qr/upload', {
          method: 'POST',
          body: fd
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
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
