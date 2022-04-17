import { useState, useEffect } from "react";

 function Docs(){
   const[docs, setDocs] = useState([]);

   useEffect(() => {

    fetch("https://backend.softmagic.hu/softmagic/docs", {
        method: "GET",
        cache: "no-cache",
      })
      .then(response => response.json())
      .then(data =>  setDocs(data));
    }, [])

    const download = () => {
       if(window.confirm("Bizos, hogy letölti a dokumentumot?")){
           alert("A dokumentumok letöltése funkció fejlesztés alatt.")
       };
    }
    return (<div className="Doc-group">
    {docs.map((doc) =><p key={doc.id} onClick={download} className="Doc-row">{doc.title + '.'}<b>{doc.extension}</b></p>)}
    </div>);
 }

export default Docs;