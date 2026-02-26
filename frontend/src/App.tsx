import { useEffect, useState } from "react"
import { addNewLink, getLinks, type ShortenedLink } from "./services/linkService"
import Login from "./components/Login"

const App = () => {
  const [links, setLinks] = useState<ShortenedLink[]>([])
  const [newUrl, setNewUrl] = useState("")
  useEffect(()=>{
    getLinks().then(data => setLinks(data))
  },[])

  const sendFormData = (event: React.SubmitEvent) => {
    event.preventDefault()
    if(newUrl.length > 0)
      addNewLink(newUrl).then(data => {if(data){setLinks([...links, data])}})
    setNewUrl("")
  }

  return (
    <div>
      <Login/>

    {newUrl}
    <form onSubmit={sendFormData}>
      <input
          type="url" 
          value={newUrl}
          onChange={(e)=>setNewUrl(e.target.value)}
      />
      <button type="submit">ADD</button>
    </form>

    {links.map(link => <a key={link.id} href={link.originalURL}>
      Link {link.id}
    </a>)}
  
    </div>
  )
}

export default App