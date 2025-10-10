import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { poppins } from "@/styles/fonts";


const queryClient = new QueryClient(); // Create a React Query client


const Results = ({ uploadId, setStatOfProcessing }: { uploadId: string, setStatOfProcessing: React.Dispatch<React.SetStateAction<number>> }) => {
  const fetchResults = async () => {
    const res = await fetch(`http://localhost:3001/api/get-data/${uploadId}`);
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ['uploadResults', uploadId],
    queryFn: fetchResults,
    refetchInterval: 2000,
  });
  
  // console.log(data);
  useEffect(() => {
    if (data) {
      setStatOfProcessing(2);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;

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
  const [statOfProcessing, setStatOfProcessing] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    setStatOfProcessing(1);
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
        <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              m: 0,
              p: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
              bgcolor: "#fdf0d5",
            }}
            className={poppins.className}

          >
          <Button
              variant="contained"
              component="label"
              sx={{
                width: "15rem",
                height: "10vh",
                bgcolor: "#003049"
              }}>
              <label 
                htmlFor="file-upload" 
                className="custom-button"
                style={{ 
                  cursor: "pointer",
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "20px",
                  color: "#ffffff",
                  }}>
                <FileUploadIcon 
                  sx={{
                    fontSize: "25px",
                    mr: "5px"
                  }}/> 
                  Upload Pdf
              </label>
              <input
                id="file-upload"
                type="file"
                style={{ display: "none", cursor: "pointer" }}
                onChange={handleFileChange}
              />

          </Button>
          <Typography sx={{
            mt: "10px",
            color: "#003049"
          }}>{file?.name}</Typography>
          <Button 
            onClick={handleUpload} 
            variant="outlined" 
            sx={{
              mt: 2,
              color: "#c1121f",
              borderColor: "#c1121f"
          }}>Scan</Button>
          {uploadId && <Results uploadId={uploadId} setStatOfProcessing={setStatOfProcessing} />}
          {statOfProcessing === 1 && <p>Processing</p>}
          {statOfProcessing === 2 && <p>show data</p>}
        </Box>
      </main>
    </QueryClientProvider>
  );
}
