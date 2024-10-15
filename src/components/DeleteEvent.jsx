// DeleteEvent.jsx
import React from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const DeleteEvent = ({ eventId, onDelete, onClose }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/events/${eventId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete the event");
        }

        toast({
          title: "Event deleted.",
          description: "The event was successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        onDelete(eventId);
        navigate("/");
        onClose();
      } catch (error) {
        toast({
          title: "Error.",
          description: "An error occurred while deleting the event.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Button colorScheme="red" onClick={handleDeleteEvent}>
      Delete Event
    </Button>
  );
};

export default DeleteEvent;
