import React, { useState } from "react";
import "./EventPage.css";
import { useNavigate } from 'react-router-dom';

const EventPage = () => {
    const navigate = useNavigate(); 
  const [selectedOption, setSelectedOption] = useState("");
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [events, setEvents] = useState([]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the new event to the events list
    setEvents([...events, eventDetails]);
    setEventDetails({ title: "", description: "", date: "" });
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
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={eventDetails.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Event Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={eventDetails.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="date">Event Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={eventDetails.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Submit Event
              </button>
            </form>
          </div>
        )}
        {selectedOption === "view" && (
          <div className="event-view">
            <h2>View Available Events</h2>
            {events.length === 0 ? (
              <p>No events available. Create an event to display here.</p>
            ) : (
              <ul className="event-list">
                {events.map((event, index) => (
                  <li key={index} className="event-item">
                    <h3>{event.title}</h3>
                    <p>
                      <strong>Description:</strong> {event.description}
                    </p>
                    <p>
                      <strong>Date:</strong> {event.date}
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
