import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  Button,
  useDisclosure,
  Flex,
} from "@chakra-ui/react";
import { EditEvent } from "../components/EditEvent";
import { DeleteEvent } from "../components/DeleteEvent";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    categoryIds: [],
    createdBy: null,
  });
  const [categories, setCategories] = useState([]);
  const [createdByUser, setCreatedByUser] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await fetch(`http://localhost:3000/events/${eventId}`);
      const eventData = await response.json();
      setEvent(eventData);
    };
    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categoriesData = await response.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

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

  const getCategoryNames = (categoryIds) => {
    const eventCategories = categories.filter((category) =>
      categoryIds.includes(category.id)
    );
    return eventCategories.map((cat) => cat.name).join(", ");
  };

  const handleDeleteEvent = (eventId) => {
    navigate("/");
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEvent(updatedEvent);
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
      <Box textAlign="center">
        <Text fontSize="4xl" textDecoration="underline">
          {event.title}
        </Text>
        <Text fontSize="2xl"> {event.description}</Text>
      </Box>

      <Flex
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box
          flex="1"
          display="flex"
          justifyContent="flex-end"
          marginRight="20px"
        >
          <Image
            src={event.image}
            alt={event.title}
            style={{ maxWidth: "100%", height: "auto" }}
            margin="20px"
            borderRadius="10px"
            width="500px"
            height="400px"
            objectFit="cover"
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="left"
          alignItems="left"
          textAlign="left"
          width="50%"
          padding="20px"
        >
          <Text fontSize="2xl">Starting time: {event.startTime}</Text>
          <Text fontSize="2xl">End time: {event.endTime}</Text>
          <Text fontSize="2xl">
            Category: {getCategoryNames(event.categoryIds)}
          </Text>
          {createdByUser && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="left"
              alignItems="left"
              textAlign="left"
            >
              <Text fontSize="2xl">Created by: {createdByUser.name}</Text>
              <Image
                src={createdByUser.image}
                alt={createdByUser.name}
                boxSize="150px"
                borderRadius="full"
                margin="15px"
              />
            </Box>
          )}
        </Box>
      </Flex>

      <Flex flexDirection="row" marginTop="20px">
        <Button onClick={onOpen} colorScheme="blue" marginRight="10px">
          Edit Event
        </Button>

        <EditEvent
          isOpen={isOpen}
          onClose={onClose}
          event={event}
          eventId={eventId}
          onUpdate={handleUpdateEvent} // Callback doorgeven
        />

        <DeleteEvent
          eventId={eventId}
          onDelete={handleDeleteEvent}
          onClose={onClose}
        />
      </Flex>
    </Box>
  );
};
