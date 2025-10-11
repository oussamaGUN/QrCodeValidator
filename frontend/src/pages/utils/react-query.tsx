import { useState, useEffect } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CountUp from "react-countup";



export const Results = ({
  uploadId,
  setStatOfProcessing,
  setClicAble}: {
  uploadId: string;
  setStatOfProcessing: React.Dispatch<React.SetStateAction<number>>;
  setClicAble: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [dataNums, setDataNums] = useState(1);
  const [valid, setValid] = useState(0);
  const [invalid, setInvalid] = useState(0);
  const [unreadable, setUnreadable] = useState(0);
  const [duplicates, setDuplicates] = useState(0);
  const fetchResults = async () => {
    const res = await fetch(`http://localhost:3001/api/get-data/${uploadId}`);
    if (!res.ok) 
      throw new Error("Failed to fetch");
    return res.json();
  };

  const { data, isLoading } = useQuery({
    queryKey: ["uploadResults", uploadId],
    queryFn: fetchResults,
    refetchInterval: 1000,
  });

  // console.log(data);
  useEffect(() => {
    if (data) {
      setStatOfProcessing(2);
      setDataNums(1);
    }
  }, [data]);

  if (isLoading) 
    return <p>Loading...</p>;

  if (!dataNums)
    return null;

  return (
    <>
      {dataNums && (
        <main>
          <Box
            onClick={() => {
              setDataNums(0)
              setValid(0)
              setInvalid(0)
              setDuplicates(0)
              setUnreadable(0)
            }}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "100%",
              height: "100vh",
              bgcolor: "black",
              opacity: "40%",
            }}
          ></Box>
          <Box
            sx={{
              bgcolor: "#edf2f4",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "50%",
              height: "50vh",
              borderRadius: "20px"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                m: "20px",
              }}
            >
              <CloseIcon
                onClick={() => {
                  setDataNums(0)
                  setValid(0)
                  setInvalid(0)
                  setDuplicates(0)
                  setUnreadable(0)
                  setClicAble(1)
                }}
                sx={{
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box
              sx={{
                height: "30vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{fontFamily: "Poppins, sans-serif"}}>VALID</Typography>
                <Typography
                  sx={{
                    fontSize: "3.5rem",
                    fontFamily: "Orbitron, sans-serif",
                    color: "#2b2d42",
                  }}
                >
                  <CountUp end={data.valid} duration={3} onEnd={() => {setValid(1)}}/>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{fontFamily: "Poppins, sans-serif"}}>INVALID</Typography>
                <Typography
                  sx={{
                    fontSize: "3.5rem",
                    color: "#2b2d42",
                    fontFamily: "Orbitron, sans-serif"
                  }}
                >
                  <CountUp end={data.invalid} duration={3} onEnd={() => {setInvalid(1)}}/>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{fontFamily: "Poppins, sans-serif"}}>UNREADABLE</Typography>
                <Typography
                  sx={{
                    fontSize: "3.5rem",
                    color: "#2b2d42",
                    fontFamily: "Orbitron, sans-serif"
                  }}
                >
                  <CountUp end={data.unreadable} duration={3} onEnd={() => {setUnreadable(1)}}/>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography sx={{fontFamily: "Poppins, sans-serif"}}>DUPLICATES</Typography>
                <Typography
                  sx={{
                    fontSize: "3.5rem",
                    color: "#2b2d42",
                    fontFamily: "Orbitron, sans-serif"
                  }}
                >
                  <CountUp end={data.duplicates} duration={3} onEnd={() => {setDuplicates(1)}}/>
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
              {(valid === 1 && invalid  === 1 && unreadable === 1 && duplicates  === 1) && 
                <Button variant="contained" color="success" onClick={() => {
                  setDataNums(0)
                  setValid(0)
                  setInvalid(0)
                  setDuplicates(0)
                  setUnreadable(0)
                  setClicAble(1)
                }}
                  sx={{
                    width: "6rem"
                  }}>
                  DONE
                </Button>
              }
            </Box>
          </Box>
        </main>
      )}
    </>
  );
};
