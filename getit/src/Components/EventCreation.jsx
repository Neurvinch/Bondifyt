import React ,{useState}from 'react'
import { useWalletClient} from 'wagmi'

const EventCreation = () => {

const [eventData , setEventData] = useState({
    name: '',
    description: '',
    entryFee : 0,
    isPublic: true,
    startTime : "",
    endTime : "",
});
const handleChange = ( e) =>{
 const {name , value} = e.target;
 setEventData(
    (prev) =>({...prev,[name] : value})
 )
}


    const CreateEvent = async () => {
        const Contract =  new ethers.Contract()// bruh fill this

        try {
            const tx = await Contract.CreateEvent(
                eventData.name,
                eventData.description,
                ethers.utils.parseEther(eventData.entryFee.toString()),
                eventData.isPublic,
                Math.floor( new Date(eventData.startTime).getTime() / 1000),
                Math.floor(new Date (eventData.endTime).getTime() / 1000)
            )
            await tx.wait();
            alert(" Event created");
            
        } catch (error) {
             console.error(error);
        }
    }


  return (
    <div>
       <input name="name" onChange={handleChange} placeholder="Event Name" />
      <input name="description" onChange={handleChange} placeholder="Description" />
      <input name="entryFee" onChange={handleChange} placeholder="Entry Fee (ETH)" type="number" />
      <input name="startTime" onChange={handleChange} type="datetime-local" />
      <input name="endTime" onChange={handleChange} type="datetime-local" />
      <button onClick={createEvent}>Create Event</button>


    </div>
  )
}

export default EventCreation