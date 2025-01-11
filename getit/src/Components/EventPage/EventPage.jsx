import React, { useState } from "react";
import "./EventPage.css";
import { useNavigate } from 'react-router-dom';

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
                <input name="name" onChange={handleChange} placeholder="Event Name" />
              </div>
              <div className="form-group">
                <label htmlFor="description">Event Description</label>
                <input name="description" onChange={handleChange} placeholder="Description" />
              </div>

             <div className="form-group"><label htmlFor="entryFee"   /><input name="entryFee" onChange={handleChange} placeholder="Entry Fee (ETH)" type="number" />
                        </div> 


              <div className="form-group">
                <label htmlFor="date">Event Start Time</label>
                <input name="startTime" onChange={handleChange} type="datetime-local" />
              </div>


              <div className="form-group">
                <label htmlFor="date">Event End Time </label>
                <input name="endTime" onChange={handleChange} type="datetime-local" />
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
                {eventData.map((event, index) => (
                  <li key={index} className="event-item">
                    <h3>{event.name}</h3>
                    <p>
                      <strong>Description:</strong> {event.description}
                    </p>
                    <p>
                      <strong>Date:</strong> {event.startTime}
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
