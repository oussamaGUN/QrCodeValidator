import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { poppins } from "@/styles/fonts";
import { Results } from "./utils/react-query";
import Processing from "./components/processing";


const queryClient = new QueryClient(); // Create a React Query client




export default function Home() {
  const [uploadId, setUploadId] = useState<string | null>(null)
  const [statOfProcessing, setStatOfProcessing] = useState(0);
  const [clickAble, setClickAble] = useState(1);
  const [inValidFileType, setInValidFileType] = useState(0);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (file && clickAble) {
      setStatOfProcessing(1);
      setClickAble(0);
      setInValidFileType(0);
      if (file?.type !== 'application/pdf') {
        console.log('invalid file')
        setInValidFileType(1);
        setStatOfProcessing(0);
        setClickAble(1);
        return ;
        // throw new Error("invalid file")
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
              bgcolor: "#edf2f4",
            }}
            className={poppins.className}

          >
          <Button
              component="label"
              sx={{
                width: "15rem",
                height: "4.5rem",
                bgcolor: "#2b2d42"
              }}>
              <label 
                htmlFor="file-upload" 
                className="custom-button"
                style={{ 
                  cursor: "pointer",
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "1.3rem",
                  color: "#edf2f4",
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
            color: "#8d99ae"
          }}>{file?.name}
          </Typography>
          {
            inValidFileType === 1 && <Typography color="error">Invalid file type. Please upload a PDF.</Typography>
          }
          <Button 
            onClick={handleUpload} 
            variant="outlined" 
            sx={{
              mt: 2,
              width: "15rem",
              height: "3.5rem",
              color: "#0aa09e",
              borderColor: "#0aa09e",
              background: "none"
          }}>
            {statOfProcessing !== 1 && <p>Scan</p>}
            {statOfProcessing === 1 && <Processing />}
          </Button>
          {uploadId && <Results uploadId={uploadId} setStatOfProcessing={setStatOfProcessing} setClicAble={setClickAble} />}     </Box>
      </main>
    </QueryClientProvider>
  );
}
