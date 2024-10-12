import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const EventPage = () => {
  const { id } = useParams();
  const [eventDetails, setEventDetails] = useState([null]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await fetch(`http://localhost:3000/events/${id}`);
      const eventDetails = await response.json();
      setEventDetails(events);
    };
    fetchEventDetails();
  }, [id]);

  return (
    <div>
      <h1>Event Detail Page</h1>
      <h2>{event.title}</h2>
      <p>Description: {event.description}</p>
      <img
        src={event.image}
        alt={event.title}
        style={{ maxWidth: "50%", height: "50%" }}
      />
      <p>Starting time: {event.startTime}</p>
      <p>End time: {event.endTime}</p>
      <p>Created by: {event.createdBy}</p>
    </div>
  );
};
