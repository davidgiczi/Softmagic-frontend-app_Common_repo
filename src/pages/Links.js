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
       .then(data =>  setLinks(data));
     }, [])

return (<div className="Link-group"><br/>
{links.map((link) =><p><Link href={link.href} target="_blank"><font  className="Link-row">{link.title}</font></Link></p>)}
</div>
)
}

export default Links;