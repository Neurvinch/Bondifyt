import React, { useState, useEffect, useCallback } from "react";
import "./EventPage.css";
import { useWalletClient, useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import eventAbi from "../../abi/eventAbi.json";
import { ethers } from "ethers";

const EventPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    entryFee: 0,
    isPublic: true,
    startTime: "",
    endTime: "",
  });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();

  const contract = walletClient
    ? new ethers.Contract(contractAddress, eventAbi, walletClient)
    : null;

  const fetchEvents = useCallback(async () => {
    if (!contract) return;
    setLoading(true);
    setError("");

    try {
      const eventCount = await contract.eventCount();
      const fetchedEvents = [];
      for (let i = 1; i <= eventCount; i++) {
        const eventDetails = await contract.Events(i);
        fetchedEvents.push({
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
      setEvents(fetchedEvents);
    } catch (err) {
      setError("Failed to fetch events. Please try again.");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  useEffect(() => {
    if (isConnected) {
      fetchEvents();
    }
  }, [isConnected, fetchEvents]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const CreateEvent = async (e) => {
    e.preventDefault();
    if (!contract) return;
    setLoading(true);
    setError("");

    try {
      const tx = await contract.CreateEvent(
        eventData.name,
        eventData.description,
        ethers.utils.parseEther(eventData.entryFee.toString()),
        eventData.isPublic,
        Math.floor(new Date(eventData.startTime).getTime() / 1000),
        Math.floor(new Date(eventData.endTime).getTime() / 1000)
      );
      await tx.wait();
      alert("Event created successfully!");
      fetchEvents(); // Refresh events after creation
    } catch (err) {
      setError("Failed to create event. Please check your inputs.");
      console.error("Error creating event:", err);
    } finally {
      setLoading(false);
    }
  };

  const registerForEvent = async (eventId, entryFee) => {
    if (!contract) return;
    setLoading(true);
    setError("");

    try {
      const tx = await contract.registerForEvent(eventId, {
        value: ethers.utils.parseEther(entryFee),
      });
      await tx.wait();
      alert("Registered for event successfully!");
    } catch (err) {
      setError("Failed to register for event. Please try again.");
      console.error("Error registering for event:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="menu-container">
      <div className="top-bar">
        <div className="logo">EON FORGE</div>
        <div className="menu-bar">
          <button className="menu-button" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="menu-button" onClick={() => navigate("/home")}>
            Marketplace
          </button>
          <button className="menu-button" onClick={() => navigate("/profile")}>
            Profile
          </button>
          <button className="menu-button" onClick={() => navigate("/Event")}>
            Meet the Team
          </button>
        </div>
      </div>
      <div className="event-page">
        <h1 className="heading">Event Page</h1>
        <div className="options">
          <button
            className={`option-button ${
              selectedOption === "conduct" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("conduct")}
          >
            Conduct Event
          </button>
          <button
            className={`option-button ${
              selectedOption === "view" ? "active" : ""
            }`}
            onClick={() => handleOptionClick("view")}
          >
            View Events
          </button>
        </div>
        {selectedOption === "conduct" && (
          <div className="event-conduct">
            <h2>Conduct Your Event</h2>
            <form onSubmit={CreateEvent}>
              <input name="name" onChange={handleChange} placeholder="Event Name" required className="textone" />
              <textarea name="description" onChange={handleChange} placeholder="Description" required  className="textone"/>
              <input name="entryFee" type="number" onChange={handleChange} placeholder="Entry Fee (ETH)" required className="textone" />
              <input name="startTime" type="datetime-local" onChange={handleChange} required  className="textone"/>
              <input name="endTime" type="datetime-local" onChange={handleChange} required className="textone" />
              <button type="submit" className="submit-button">
                Create Event
              </button>
            </form>
          </div>
        )}
        {selectedOption === "view" && (
          <div className="event-view">
            <h2>Available Events</h2>
            {loading ? (
              <p>Loading events...</p>
            ) : error ? (
              <p>{error}</p>
            ) : events.length === 0 ? (
              <p>No events available.</p>
            ) : (
              <ul>
                {events.map((event) => (
                  <li key={event.id}>
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                    <p>{event.startTime} - {event.endTime}</p>
                    <button onClick={() => registerForEvent(event.id, event.entryFee)}>
                      Register (Fee: {event.entryFee} ETH)
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
