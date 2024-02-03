import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import {useState, useEffect} from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import ContentNotFound from './components/ContentNotFound';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';
import { useNavigate  } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

async function fetch_data(request){
  //fetch from server and get the response
  let url = process.env.PROXY_API || process.env.REACT_APP_API_CONNECTION 
  const response = await fetch(url || 'http://localhost:9000/dirs', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(request), // body data type must match "Content-Type" header
    
  });
  return response.json();
}
function hashToLink(hash){
  // Sample hash: folder_1#folder_2#folder_3
  let link = "/";
  let folders = hash.split("#");
  for (let i = 0; i < folders.length; i++){
    link += folders[i] + "/";
  }
  return link;
}

function Content() {
  const params = useParams();
  let hash = params.hash;
  console.log(hash);
  const [response, setResponse] = useState({});
  let navigate = useNavigate();
  //dealing with url and router
  useEffect(() => {
    async function getResponse() {
        const response = await fetch_data({"hash": hash});
        setResponse(response);
    }
    getResponse();
  }, []);
  console.log(response);
  if (response.names != undefined){
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{minHeight:'100vh', position:'relative'}}>
            <Header />
            <Main names={response.names} links={response.links}/>
            <Footer />
          </div>
        </ThemeProvider>
      );
  }
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Content />}/>
        <Route path="/folders/:hash" element={<Content />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
