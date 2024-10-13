import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";

export const AddEvent = () => {
  const [createdBy, setCreatedBy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryIds, setCategoryIds] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const eventData = {
      createdBy,
      title,
      description,
      image,
      startTime,
      endTime,
      categoryIds,
      location,
    };
    console.log(eventData);

    // Asynchrone fetch-aanroep om data naar je server te sturen
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("Event successfully submitted");
    } else {
      console.error("Failed to submit event");
    }
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

          <Input
            type="text"
            name="created-by"
            value={createdBy}
            onChange={(e) => setCreatedBy(e.target.value)}
            border="solid"
            borderColor="gray.600"
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Title</FormLabel>
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
          <FormLabel>Description</FormLabel>
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
          <FormLabel>Category</FormLabel>
          <Input
            type="text"
            name="categoryIds"
            value={categoryIds}
            onChange={(e) => setCategoryIds(e.target.value)}
            border="solid"
            borderColor="gray.600"
            required
          />
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
        <Button mt={4} type="submit" colorScheme="teal">
          Submit
        </Button>
      </Form>
    </Box>
  );
};
