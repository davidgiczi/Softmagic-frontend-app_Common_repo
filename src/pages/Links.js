import { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";


const Links = () => {
const[links, setLinks] = useState([]);

    useEffect(() => {
 
     fetch("https://backend.softmagic.hu/softmagic/links", {
         method: "GET",
         cache: "no-cache",
       })
       .then(response => response.json())
       .then(data =>setLinks(data))
       .catch((error) => {
        alert("Linkek betöltése sikertelen.");
      });
     }, [])

return (<div className="Link-group"><br/>
{links.map((link) =><p key={link.id}><Link href={link.href} target="_blank"><font  className="Link-row">{link.title}</font></Link></p>)}
</div>
)
}

export default Links;