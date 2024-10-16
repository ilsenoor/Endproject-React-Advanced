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
import { Form } from "react-router-dom";

export const EditEvent = ({ isOpen, onClose, event, eventId, onUpdate }) => {
  const [title, setTitle] = useState(event.title || "");
  const [description, setDescription] = useState(event.description || "");
  const [image, setImage] = useState(event.image || "");
  const [startTime, setStartTime] = useState(event.startTime || "");
  const [endTime, setEndTime] = useState(event.endTime || "");
  const [selectedCategories, setSelectedCategories] = useState(
    event.categoryIds || []
  );
  const [createdBy, setCreatedBy] = useState(event.createdBy || "");

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const toast = useToast();

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

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const usersData = await response.json();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categoriesData = await response.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const handleUpdateEvent = async () => {
    console.log("handleUpdateEvent called");
    const updatedEvent = {
      ...event,
      title,
      description,
      image,
      startTime,
      endTime,
      categoryIds: selectedCategories,
      createdBy,
    };

    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      toast({
        title: "Event updated.",
        description: "The event was successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onUpdate(updatedEvent);
      onClose();
    } catch (error) {
      toast({
        title: "Error.",
        description: "An error occurred while updating the event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
