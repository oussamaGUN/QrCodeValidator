import { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
const queryClient = new QueryClient(); // Create a React Query client

const Results = ({ uploadId }: { uploadId: string }) => {
  const fetchResults = async () => {
    const res = await fetch(`http://localhost:3001/api/get-data/${uploadId}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json(); // returns { results: [...] }
  };
  const { data ,isLoading} = useQuery({
      queryKey: ['uploadResults', uploadId],
      queryFn: fetchResults,
      refetchInterval: 2000,
  })

  if (isLoading) return <p>Processing...</p>;

  console.log(data);


  return (
    <main>
      <p>{data.valid}</p>
      <p>{data.invalid}</p>
      <p>{data.unreadable}</p>
      <p>{data.duplicates}</p>
    </main>
  )
}

export default function Home() {
  const [uploadId, setUploadId] = useState<string | null>(null)
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
      setUploadId(data.uploadId);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <h1>Welcome to the Home Page</h1>
        <input onChange={handleFileChange} type="file" />
        <button onClick={handleUpload}>Upload</button>
        {file?.type === "application/pdf" && <p>Selected file: {file.type}</p>}
        {uploadId && <Results uploadId={uploadId}/>}
      </main>
    </QueryClientProvider>
  );
}
