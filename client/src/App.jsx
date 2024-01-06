import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import {useState, useEffect} from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import ContentNotFound from './components/ContentNotFound';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, createTheme } from '@mui/material';


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

async function fetch_data(request){
  //fetch from server and get the response
  let url = process.env.REACT_APP_API_CONNECTION
  const response = await fetch(url, {
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

function Content() {

  const [response, setResponse] = useState({});

  //dealing with url and router
  const params= useParams();
  let a = params.link_1, b = params.link_2, c = params.link_3;
  let link = a;
  if (b != undefined) {link = link + "/" + b;}
  if (c != undefined) {link = link + "/" + c;}
  console.log(link);


  useEffect(() => {
    async function getResponse() {
        const response = await fetch_data({"link": link});
        setResponse(response);
    }
    getResponse();
  }, []);
console.log(response);
  if (response.names != undefined){
    if (response.file == null){
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
}
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:link_1/:link_2/:link_3/:link_4" element={<Content />}/>
        <Route path="/:link_1/:link_2/:link_3" element={<Content />}/>
        <Route path="/:link_1/:link_2" element={<Content />}/>
        <Route path="/:link_1" element={<Content />}/>
        <Route path="" element={<Content />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
