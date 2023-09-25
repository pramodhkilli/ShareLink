import "./App.css";
import { useRef, useState, useEffect } from "react";
import { uploadFile } from "./services/api";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import * as React from "react";
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const fileInputRef = useRef();
  const copyLink = useRef();
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");
  console.log(file);

  useEffect(() => {
    copyLink.current.style.display = "block";
  }, [result]);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setResult(response.path);
      }
    };
    getImage();
  }, [file]);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="container">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloudUploadIcon
            style={{
              fontSize: "15em",
            }}
          />
        </div>
        <h1>Share your files at ease!!!</h1>
        <p>
          upload your files and share them with as many people as you want,
          click to upload files, as soon as you upload you will get a link that
          you can copy and share.
        </p>
        <div className="btnContainer">
          <div>
            <button
              className="upload"
              onClick={() => {
                fileInputRef.current.click();
              }}
            >
              Upload
              <FileUploadIcon style={{ marginLeft: "5px" }} />
            </button>
          </div>
          <div>
            <button
              className="copyLink"
              style={{ display: "none" }}
              ref={copyLink}
              onClick={() => {
                handleClick();
                navigator.clipboard.writeText(result);
              }}
            >
              Copy link
              <ContentCopyIcon
                style={{ fontSize: "0.9em", marginLeft: "5px" }}
              />
            </button>
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Link copied successfully
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default App;
