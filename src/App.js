import './App.css';
import FileUploadPage from './Uploadfile.js'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/Layout";
import Docs from "./pages/Docs";
import Links from "./pages/Links";
import NoPage from "./pages/NoPage";
import mail from './icons/mail.png';
import phone from './icons/phone.png';

function Header(){
  return (<><p className='Header-text'><b>Családbarát, számviteli szolgáltatást végző betéti társaság a korrekt gazdaságért mozgalom jegyében.</b></p>
          <p className='Header-text'><img alt='mail' src={mail} className='Icon'></img>softmagicbt@gmail.com
          <img alt='phone' src={phone} className='Icon'></img>+36 70 314 5523</p></>)
}

function App() {
  return (<>
<div className='App-header'>
  <Header/>
</div>
<div className='App'>
<div className='Soft-magic'><font>Soft Magic</font></div>
<div className='Space'></div>
{ <BrowserRouter>
<Routes>
  <Route path='/' element={<Layout/>}/>
  <Route path='/softmagic/links' element = {<Links/>}/>
  <Route path='/softmagic/upload' element = {<FileUploadPage/>}/>
  <Route path='/softmagic/documents' element={<Docs/>}/>
  <Route path='*' element = {<NoPage/>}/>
</Routes>
</BrowserRouter>}
</div></>
  );
}

export default App;
