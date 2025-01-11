import React, { useState , useEffect} from "react";
import "./EventPage.css";
import { useWalletClient,useAccount } from "wagmi";
import { useNavigate } from 'react-router-dom';
import eventAbi from '../../abi/eventAbi.json'
import{ethers} from 'ethers'

const EventPage = () => {
    const navigate = useNavigate(); 
  const [selectedOption, setSelectedOption] = useState("");
  const [eventData , setEventData] = useState({
      name: '',
      description: '',
      entryFee : 0,
      isPublic: true,
      startTime : "",
      endTime : "",
  });

  const { data : walletClient, error, isLoading } = useWalletClient();
  const {address , isconnected  } = useAccount();



  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    };
    loadEvents();
  }, [fetchEvents]);



  async function initializeContract() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const myContractAddress = "0xd7B63981A38ACEB507354DF5b51945bacbe28414";
        const contract = new ethers.Contract(
          myContractAddress,
          eventAbi,
          signer
        );
        console.log(contract);
        return { provider, signer, address, contract };
      } else {
        throw new Error("MetaMask not found");
      }
    } catch (error) {
      console.error('Error initializing contract:', error);
      throw error;
    }
  }







 //  const contractaddress ="0xd7B63981A38ACEB507354DF5b51945bacbe28414"
  



  const handleChange = ( e) =>{
    const {name , value} = e.target;
    setEventData(
       (prev) =>({...prev,[name] : value})
    )
   }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const CreateEvent = async () => {
    

    try {
        const tx = await contract.CreateEvent(
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

const registerForEvent = async (eventId, entryFee) => {
  if (!contract) return;
  try {
    const tx = await contract.registerForEvent(eventId, { value: ethers.utils.parseEther(entryFee) });
    await tx.wait();
    console.log("Registered for event successfully");
  } catch (error) {
    console.error("Error registering for event:", error);
  }
};


const fetchEvents = async () => {
  if (!contract) return;
  try {
    const eventCount = await contract.eventCount();
    const events = [];
    for (let i = 1; i <= eventCount; i++) {
      const eventDetails = await contract.Events(i);
      events.push({
        id: i,
        name: eventDetails.name,
        description: eventDetails.description,
        entryFee: ethers.utils.formatEther(eventDetails.entryFee),
        isPublic: eventDetails.isPublic,
        creator: eventDetails.creator,
        startTime: new Date(eventDetails.startTime * 1000).toLocaleString(),
        endTime: new Date(eventDetails.endTime * 1000).toLocaleString(),
      });
    }
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

  return (
    <div className="menu-container">
      <div className="top-bar">
        <div className="logo">EON FORGE</div>
        <div className="menu-bar">
        <button
            className="menu-button"
            onClick={() => navigate('/')}  
          >
            Home
          </button>
          <button className="menu-button"  onClick={() => navigate('/home')}  >Marketplace</button>
          <button className="menu-button" onClick={() => navigate('/profile')}>Profile</button>
          <button className="menu-button" onClick={() => navigate('/Event')}>Meet the Team</button>
          
        </div>
      </div>
      <div className="event-page">
        <h1 className="heading">Event Page</h1>
        <div className="options">
          <button
            className={`option-button ${selectedOption === "conduct" ? "active" : ""}`}
            onClick={() => handleOptionClick("conduct")}
          >
            Conduct Event
          </button>
          <button
            className={`option-button ${selectedOption === "view" ? "active" : ""}`}
            onClick={() => handleOptionClick("view")}
          >
            View Events
          </button>
        </div>
        {selectedOption === "conduct" && (
          <div className="event-conduct">
            <h2>Conduct Your Event</h2>
            <form onSubmit={CreateEvent}>
              <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input name="name" onChange={handleChange} placeholder="Event Name" className="textone" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Event Description</label>
                <input name="description" onChange={handleChange} placeholder="Description" className="textone" />
              </div>

             <div className="form-group"><label htmlFor="entryFee"   /><input name="entryFee" onChange={handleChange} placeholder="Entry Fee (ETH)" type="number" className="textone" />
                        </div> 


              <div className="form-group ">
                <label htmlFor="date">Event Start Time</label>
                <input name="startTime" onChange={handleChange} type="datetime-local" className="textone"  />
              </div>


              <div className="form-group">
                <label htmlFor="date">Event End Time </label>
                <input name="endTime" onChange={handleChange} type="datetime-local"  className="textone"/>
              </div>



              <button type="submit" onClick={CreateEvent} className="submit-button">
                Create  Event
              </button>
            </form>
          </div>
        )}
        {selectedOption === "view" && (
          <div className="event-view">
            <h2>View Available Events</h2>
            {eventData.length === 0 ? (
              <p>No events available. Create an event to display here.</p>
            ) : (
              <ul className="event-list">
                {eventData.map((eventData, index) => (
                  <li key={index} className="event-item">
                    <h3>{eventData.name}</h3>
                    <p>
                      <strong>Description:</strong> {eventData.description}
                    </p>
                    <p>
                      <strong>Date:</strong> {eventData.startTime}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="marquee">
  <div className=" marquee__group">
    <span>
      TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
    </span>
    <span>
      TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
    </span>
    <span>
      TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
    </span>
  </div>
  <div className="marquee__group" aria-hidden="true">
    <span>
      TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
    </span>
    <span>
      TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
    </span>
    <span>
      TO HELP CREATORS JOIN THE NFT REVOLUTION TODAY!
    </span>
  </div>
</div>
    </div>
  );
};

export default EventPage;
