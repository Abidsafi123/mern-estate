import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Contact = ({ listing }) => {
  const [landlord, setLandLord] = useState(null)
  const[message,setMessage] = useState("")
const onChange = (e)=>{
    setMessage(e.target.value)

}
  useEffect(() => {
    const fetchLandLord = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/user/${listing.userRef}`)
        setLandLord(res.data.user) // ✅ directly set the user object
      } catch (error) {
        console.log(error)
      }
    }
    fetchLandLord()
  }, [listing.userRef])

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.username} </span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
        

            <textarea className='w-full border p-3 rounded-lg' placeholder='enter your message' name='message' id= 'message' rows= '2' value={message} onChange={onChange}>
                 
            </textarea>
            <Link className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95' to={`mailto:${landlord.email}?subject = Regarding ${listing.name} &body = ${message}`}>Send message</Link>
         </div>
      )}
    </>
  )
}

export default Contact
