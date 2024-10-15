import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  FormLabel,
  Checkbox,
  useToast,
  Select,
} from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";

// Form om event te editten
export const EditEvent = ({ isOpen, onClose, event, eventId, onDelete }) => {
  // State voor alle eventvelden
  const [title, setTitle] = useState(event.title || "");
  const [description, setDescription] = useState(event.description || "");
  const [image, setImage] = useState(event.image || "");
  const [startTime, setStartTime] = useState(event.startTime || "");
  const [endTime, setEndTime] = useState(event.endTime || "");
  const [selectedCategories, setSelectedCategories] = useState(
    event.categoryIds || [] // Aangenomen dat categoryIds een array is
  );
  const [createdBy, setCreatedBy] = useState(event.createdBy || "");

  // State voor de lijst van gebruikers en categorieën
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  // Initialiseer de toast
  const toast = useToast();
  const navigate = useNavigate(); // Gebruik de useNavigate hook

  // Bij het openen van de modal, zorg ervoor dat de velden worden gevuld met de bestaande data
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setImage(event.image);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setCreatedBy(event.createdBy);
    }
  }, [event]);

  // Haal de lijst van gebruikers op
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const usersData = await response.json();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  // Haal de lijst van categorieën op
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categoriesData = await response.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  // Update event handler
  const handleUpdateEvent = async () => {
    const updatedEvent = {
      ...event,
      title,
      description,
      image,
      startTime,
      endTime,
      categoryIds: selectedCategories, // Aangepaste categoryIds
      createdBy,
    };

    // API-aanroep om het evenement bij te werken
    try {
      await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      // Toon toast melding bij succesvol updaten
      toast({
        title: "Event updated.",
        description: "The event was successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose(); // Sluit de modal na het opslaan
    } catch (error) {
      // Toon een foutmelding bij een probleem
      toast({
        title: "Error.",
        description: "An error occurred while updating the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Functie om het evenement te verwijderen
  const handleDeleteEvent = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmDelete) {
      try {
        await fetch(`http://localhost:3000/events/${eventId}`, {
          method: "DELETE",
        });

        // Toon toast melding bij succesvol verwijderen
        toast({
          title: "Event deleted.",
          description: "The event was successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        onDelete(eventId); // Verwijder het evenement uit de weergave
        navigate("/"); // Navigeer terug naar de homepage
        onClose(); // Sluit de modal
      } catch (error) {
        // Toon een foutmelding bij een probleem
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

  // Functie om de checkboxstatus bij te werken
  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Verwijder als al geselecteerd
          : [...prev, categoryId] // Voeg toe als niet geselecteerd
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalCloseButton />
        <Form>
          <ModalBody>
            <FormLabel>Title:</FormLabel>
            <Input
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              mb={4}
            />
            <FormLabel>Description:</FormLabel>
            <Input
              placeholder="Event Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              mb={4}
            />
            <FormLabel>Image URL:</FormLabel>
            <Input
              placeholder="Event Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              mb={4}
            />
            <FormLabel>Start Time:</FormLabel>
            <Input
              placeholder="Start Time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              mb={4}
            />
            <FormLabel>End Time:</FormLabel>
            <Input
              placeholder="End Time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              mb={4}
            />

            <FormLabel>Categories:</FormLabel>
            {categories.map((cat) => (
              <Checkbox
                key={cat.id}
                value={cat.id}
                isChecked={selectedCategories.includes(cat.id)}
                onChange={() => handleCheckboxChange(cat.id)}
                mb={2}
              >
                {cat.name}
              </Checkbox>
            ))}

            <FormLabel>Created By:</FormLabel>
            <Select
              placeholder="Select Creator"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              mb={4}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
          </ModalBody>
        </Form>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdateEvent}>
            Save Changes
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={handleDeleteEvent}>
            Delete Event
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
