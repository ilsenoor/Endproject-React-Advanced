import React from "react";
import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const events = await response.json();
      setEvents(events);
    };
    fetchEvents();
  }, []);

  return (
    <div className="eventsPage">
      <Heading>List of events</Heading>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {events.map((event) => (
          <Link to={`/event/${event.id}`} key={event.id}>
            <Card
              key={event.id}
              border="solid"
              borderColor="blackAlpha.900"
              p={4}
              m={4}
            >
              <li>Event: {event.title}</li>
              <li>Description: {event.description}</li>
              <li>
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </li>
              <li>Starting time: {event.startTime}</li>
              <li>End time: {event.endTime}</li>
            </Card>
          </Link>
        ))}
      </ul>
    </div>
  );
};
