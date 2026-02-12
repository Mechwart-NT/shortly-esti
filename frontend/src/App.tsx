import { useEffect, useState } from "react"
import { addNewLink, getLinks, type ShortenedLink } from "./services/linkService"

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
    {newUrl}
    <form onSubmit={sendFormData}>
      <input
          type="url" 
          value={newUrl}
          onChange={(e)=>setNewUrl(e.target.value)}
      />
      <button type="submit">ADD</button>
    </form>

    {links.map(link => <p key={link.id}>{link.originalURL}</p>)}
    
    </div>
  )
}

export default App