import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const event = await response.json();
      setEvent(event);
    };
    fetchEventDetails();
  }, [eventId]);

  return (
    <Box
      width="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      padding="20px"
      backgroundColor="blue.100"
    >
      <Text fontSize="3xl">Event Detail Page</Text>
      <Text fontSize="2xl">{event.title}</Text>
      <Text fontSize="2xl">Description: {event.description}</Text>
      <img
        src={event.image}
        alt={event.title}
        style={{ maxWidth: "50%", height: "50%" }}
      />
      <Text fontSize="2xl">Starting time: {event.startTime}</Text>
      <Text fontSize="2xl">End time: {event.endTime}</Text>
      <Text fontSize="2xl">Created by: {event.createdBy}</Text>
    </Box>
  );
};
