import React from "react";
import { Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Box, Center, Input, Text } from "@chakra-ui/react";

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
      <Heading
        textAlign="center"
        size={["lg", "xl", "2xl"]}
        textColor="blue.500"
      >
        Welcome to our eventspage
      </Heading>

      <Center>
        <Input
          type="text"
          w={["90vw", "60vw", "60vw", "30vw"]}
          //onChange={handleChange}
          placeholder="Search events..."
          bg="gray.200"
          margin="20px"
        />
      </Center>

      <Box>
        {events.map((event) => (
          <Link to={`/event/${event.id}`} key={event.id}>
            <Card
              key={event.id}
              border="solid"
              borderColor="blackAlpha.900"
              p={4}
              m={4}
              width="50%"
              alignItems="center"
            >
              <Text>Event: {event.title}</Text>
              <Text>Description: {event.description}</Text>
              <Text>
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Text>
              <Text>Starting time: {event.startTime}</Text>
              <Text>End time: {event.endTime}</Text>
            </Card>
          </Link>
        ))}
      </Box>
      <Box border="solid" borderRadius="10px" padding="10px" margin="5px">
        <Link to={`/add-event`}>Add Event</Link>
      </Box>
    </Box>
  );
};
