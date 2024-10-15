import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text, Image, Button, useDisclosure } from "@chakra-ui/react";
import { EditEvent } from "../components/EditEvent";

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState({
    categoryIds: [],
    createdBy: null,
  });
  const [categories, setCategories] = useState([]);
  const [createdByUser, setCreatedByUser] = useState(null);

  // Modaal controle voor bewerken
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Ophalen van event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const eventData = await response.json();
      setEvent(eventData);
    };
    fetchEventDetails();
  }, [eventId]);

  // Ophalen van categorieën
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categoriesData = await response.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  // Ophalen van gebruiker op basis van createdBy
  useEffect(() => {
    if (event.createdBy) {
      const fetchUserDetails = async () => {
        const response = await fetch(
          `http://localhost:3000/users/${event.createdBy}`
        );
        const userData = await response.json();
        setCreatedByUser(userData);
      };
      fetchUserDetails();
    }
  }, [event.createdBy]);

  // Functie om de categorieën te krijgen bij een event
  const getCategoryNames = (categoryIds) => {
    const eventCategories = categories.filter((category) =>
      categoryIds.includes(category.id)
    );
    return eventCategories.map((cat) => cat.name).join(", ");
  };

  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

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
      <Text fontSize="2xl">
        Category: {getCategoryNames(event.categoryIds)}
      </Text>
      {createdByUser && (
        <Box mt={5} textAlign="center">
          <Text fontSize="2xl">Created by: {createdByUser.name}</Text>
          <Image
            src={createdByUser.image}
            alt={createdByUser.name}
            boxSize="150px"
            borderRadius="full"
            mt={3}
          />
        </Box>
      )}

      <Button mt={4} onClick={onOpen} colorScheme="blue">
        Edit Event
      </Button>

      <EditEvent
        isOpen={isOpen} // Correcte referenties naar useDisclosure
        onClose={onClose}
        event={event} // Geef de huidige event door
        eventId={eventId} // Gebruik eventId direct
        onDelete={handleDeleteEvent} // Dit kan later verder uitgewerkt worden
      />
    </Box>
  );
};
