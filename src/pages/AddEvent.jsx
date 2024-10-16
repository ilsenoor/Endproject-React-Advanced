import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import { Form, useNavigate } from "react-router-dom";

export const AddEvent = () => {
  const navigate = useNavigate();
  const [createdBy, setCreatedBy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categoriesData = await response.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/users");
      const usersData = await response.json();
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventData = {
      createdBy,
      title,
      description,
      image,
      startTime,
      endTime,
      categoryIds: selectedCategories,
      location,
    };

    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Event successfully submitted");
      navigate("/");
    } else {
      console.error("Failed to submit event");
    }
  };

  const handleCancel = () => {
    navigate("/");
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
      <Heading size={["lg", "xl", "2xl"]} textColor="blue.500" margin="20px">
        Add a New Event
      </Heading>
      <Form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel>Created by</FormLabel>
          <Select
            placeholder="Select Creator"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            border="solid"
            borderColor="gray.600"
            required
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Title of event</FormLabel>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            border="solid"
            borderColor="gray.600"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description of event</FormLabel>
          <Input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            border="solid"
            borderColor="gray.600"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Image URL</FormLabel>
          <Input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            border="solid"
            borderColor="gray.600"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Start Time</FormLabel>
          <Input
            type="datetime-local"
            name="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            border="solid"
            borderColor="gray.600"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>End Time</FormLabel>
          <Input
            type="datetime-local"
            name="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            border="solid"
            borderColor="gray.600"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Categories:</FormLabel>
          {categories.map((cat) => (
            <Checkbox
              key={cat.id}
              value={cat.id}
              isChecked={selectedCategories.includes(cat.id)}
              onChange={() => handleCheckboxChange(cat.id)}
              borderColor="blackAlpha.900"
              margin="10px"
            >
              {cat.name}
            </Checkbox>
          ))}
        </FormControl>
        <FormControl>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            border="solid"
            borderColor="gray.600"
            required
          />
        </FormControl>
        <Button mt={4} type="submit" colorScheme="teal" mr={4}>
          Submit
        </Button>
        <Button mt={4} colorScheme="red" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </Box>
  );
};
