import { useState, useEffect } from "react";

 function Docs(){
   const[docs, setDocs] = useState([]);

   useEffect(() => {

    fetch("https://backend.softmagic.hu/softmagic/docs", {
        method: "GET",
        cache: "no-cache"
      })
      .then(response => response.json())
      .then(data =>  setDocs(data))
      .catch((error) => {
      alert("Dokumentumok betöltése sikertelen.");
      });
    }, [])

    const download = (id, docName) => {

       if(window.confirm("Bizos, hogy letölti a(z) \"" + docName +"\" nevű dokumentumot?")){
        
       fetch("https://backend.softmagic.hu/softmagic/doc?docId=" + id, {
        method: "GET",
        cache: "no-cache"
      })
      .then(response => response.blob())
      .then(doc => { 
        if(doc.size === 0){
          alert("\"" + docName + "\" nevű fájl nem található.");
          return;
        }
        const link = document.createElement('a');
        link.href = URL.createObjectURL(doc);
        link.download = docName;
        document.body.append(link);
        link.click();
        link.remove();
      })
      }}
    return (<div className="Doc-group">
    {docs.map((doc) =><p key={doc.id} 
    onClick={() => download(doc.id, doc.title + '.' + doc.extension)} className="Doc-row">{doc.title + '.'}<b>{doc.extension}</b></p>)}
    </div>);
 } 

export default Docs;