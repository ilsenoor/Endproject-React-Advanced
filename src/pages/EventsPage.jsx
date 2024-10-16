import React, { useEffect, useState } from "react";
import {
  Heading,
  Card,
  Box,
  Center,
  Input,
  Text,
  Select,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const eventsData = await response.json();
      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categoriesData = await response.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const getCategoryNames = (categoryIds) => {
    const eventCategories = categories.filter((category) =>
      categoryIds.includes(category.id)
    );
    return eventCategories.map((cat) => cat.name).join(", ");
  };

  const matchedEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchField.toLowerCase());
    const matchesCategory = selectedCategory
      ? event.categoryIds.includes(Number(selectedCategory))
      : true;
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
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
          onChange={handleSearchChange}
          placeholder="Search for events"
          bg="gray.200"
          margin="20px"
        />
      </Center>

      <Center>
        <Select
          placeholder="Filter by category"
          w={["90vw", "60vw", "60vw", "30vw"]}
          bg="gray.200"
          margin="20px"
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </Center>

      {matchedEvents.length === 0 ? (
        <Text fontSize="xl" color="black" mt={10}>
          Event not found, please change search input
        </Text>
      ) : (
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          justifyContent="center"
        >
          {matchedEvents.map((event) => (
            <Box key={event.id} margin="20px">
              <Link to={`/event/${event.id}`}>
                <Card
                  border="solid"
                  borderColor="blackAlpha.900"
                  p={4}
                  m={4}
                  width="300px" // Consistente breedte
                  height="450px" // Vaste hoogte voor gelijke grootte
                  display="flex" // Zorgt ervoor dat de inhoud zich gelijkmatig vult
                  flexDirection="column"
                  justifyContent="space-between" // Zorgt dat de items evenredig worden verdeeld
                  alignItems="center"
                  textAlign="center"
                >
                  <Text fontSize="2xl"> {event.title}</Text>
                  <Text>{event.description}</Text>
                  <Image
                    src={event.image}
                    alt={event.title}
                    style={{ maxWidth: "100%", height: "auto" }}
                    borderRadius="10px"
                  />
                  <Text> Start: {event.startTime}</Text>
                  <Text> End: {event.endTime}</Text>
                  <Text>Category: {getCategoryNames(event.categoryIds)}</Text>
                </Card>
              </Link>
            </Box>
          ))}
        </Box>
      )}
      <Box border="solid" borderRadius="10px" padding="10px" margin="5px">
        <Link to={`/add-event`}>Add Event</Link>
      </Box>
    </Box>
  );
};
