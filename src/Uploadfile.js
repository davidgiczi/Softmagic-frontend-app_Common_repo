import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const MAX_SIZE = 10 * 1024 * 1024;
let foldername = "-";
let clientName = "-";

function FileUploadPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [infoText, setInfoText] = useState(
    "3) Válasszon dokumentumokat a küldéshez."
  );
  const [folderNames, setFolderNames] = useState([]);
  const [clientNames, setClientNames] = useState([]);

  useEffect(() => {

    if(Cookies.get('isVerified')){
     
      fetch("https://backend.softmagic.hu/softmagic/foldernames", {
        method: "GET",
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then((folderNames) => setFolderNames(folderNames));
      fetch("https://backend.softmagic.hu/softmagic/clients", {
        method: "GET",
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then((clientNames) => setClientNames(clientNames));
      return;
    }

    let inputData = prompt("Adja meg a jelszót:");
    if (inputData !== null) {
      const formData = new FormData();
      formData.append("identifier", inputData);
      fetch("https://backend.softmagic.hu/softmagic/getPermission", {
        method: "POST",
        cache: "no-cache",
        body: formData,
      })
        .then((response) => response.text())
        .then((permission) => isValid(permission));
    } else if(inputData === null){
      window.location.href = window.origin;
      return;
    }
  }, []);

  const isValid = (permission) => {

    if (permission === "true") {
      createCookie();
      fetch("https://backend.softmagic.hu/softmagic/foldernames", {
        method: "GET",
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then((folderNames) => setFolderNames(folderNames));
      fetch("https://backend.softmagic.hu/softmagic/clients", {
        method: "GET",
        cache: "no-cache",
      })
        .then((response) => response.json())
        .then((clientNames) => setClientNames(clientNames));
    } else {
      alert("Helytelen jelszó!");
      window.location.reload();
    }
  };

  const changeHandler = (event) => {
    if (event.target.files.length !== 0) {
      const store = [...event.target.files];
      setSelectedFiles(store);
      setIsFileSelected(true);
    } else {
      setDisabled(true);
      setSelectedFiles([]);
      setInfoText("3) Válasszon a dokumentumokat a küldéshez.");
      window.location.reload();
      return;
    }

    if (foldername === "-" || clientName === "-") {
      alert("A fájlok küldése előtt cég-, és mappanév választása szükséges.");
    } else {
      setDisabled(false);
    }
  };

  const chosenClientName = (event) => {
    clientName = event.target.value;
    if (foldername !== "-" && clientName !== "-" && isFileSelected) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const chosenfoldername = (event) => {
    foldername = event.target.value;
    if (foldername !== "-" && clientName !== "-" && isFileSelected) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleSubmission = () => {
    const formData = new FormData();
    for (const key of Object.keys(selectedFiles)) {
      formData.append("file", selectedFiles[key]);
    }
    formData.append("foldername", foldername);
    formData.append("clientname", clientName);
    sendFiles(formData);
  };

  return (
    <div className="File-list">
      <h4>1) Válasszon céget.</h4>
      <div className="Item-field">
        <SelectionField names={clientNames} onChange={chosenClientName} />
      </div>
      <h4>2) Válasszon mappát.</h4>
      {isFileSelected ? (
        <div className="Item-field">
          <SelectionField
            selected={foldername}
            names={folderNames}
            onChange={chosenfoldername}
          />
          <FileList list={selectedFiles} />
          <UploadAbleFileInfo files={selectedFiles} />
        </div>
      ) : (
        <div>
          <SelectionField
            selected={foldername}
            names={folderNames}
            onChange={chosenfoldername}
          />
          <InfoText info={infoText} color="black" />
        </div>
      )}
      <input
        className="Choose-file"
        type="file"
        name="file"
        accept=".txt, .pdf, .doc, .docx, .xls, .xlsx, .jpg, .JPG"
        onChange={changeHandler}
        multiple
      ></input>
      <div>
        <button
          onClick={handleSubmission}
          className="Send-btn"
          disabled={disabled}
        >
          Küldés
        </button>
      </div>
      <Home/>
    </div>
  );
}

function Home(){
  return(<p onClick={goHome} className='Go-home'>Kezdőoldalra</p>);
}

function goHome(){
  document.location.href = '/';
  }

function createCookie(){
      let now = new Date();
      let time = now.getTime();
      let expireTime = time + 5 * 60 * 1000;
      now.setTime(expireTime);
      document.cookie = 'isVerified=true;expires=' + now.toUTCString() + ';path=/';
}

function InfoText(props) {
  return (
    <h4 className="Info-text" style={{ color: props.color }}>
      {props.info}
    </h4>
  );
}

function FileList(props) {
  const store = [...props.list];
  return (
    <ul>
      {store.map((file, index) => (
        <li key={index}>
          Fájl neve: <b>{file.name}</b> mérete: <b>{file.size}</b> byte
        </li>
      ))}
    </ul>
  );
}

function SelectionField(props) {
  return (
    <>
      <select
        className="Selection-field"
        onChange={props.onChange}
        defaultValue={props.selected}
      >
        {props.names.map((name, index) => (
          <option key={index}>{name}</option>
        ))}
      </select>
    </>
  );
}

function leftFileSize(files) {
  const store = [...files];
  let sum = 0;
  store.map((file) => (sum += parseInt(file.size)));
  const deltaByte = (MAX_SIZE - sum) / (1024 * 1024);
  return deltaByte.toFixed(1);
}

function UploadAbleFileInfo(props) {
  let infoText;
  let deltaByte = leftFileSize(props.files);
  if (deltaByte >= 0) {
    infoText = "Még feltölthető " + deltaByte + " Mbyte.";
  } else {
    infoText =
      "A dokumentumok nem küldhetők el, mivel egyszerre 5MB adat tölthető fel.";
  }
  return deltaByte >= 0 ? (
    <InfoText info={infoText} color="green" />
  ) : (
    <InfoText info={infoText} color="red" />
  );
}

async function sendFiles(fileList) {
  await fetch("https://backend.softmagic.hu/softmagic/upload", {
    method: "POST",
    body: fileList,
    cache: "no-cache"
  })
    .then((response) => response.text())
    .then((text) => {
      alert(text);
    })
    .catch((error) => {
      alert("Fájlok küldése sikertelen.");
    });
    window.location.reload();
}

export {Home};
export default FileUploadPage;
