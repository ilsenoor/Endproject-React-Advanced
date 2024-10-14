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

  // Ophalen van evenementen
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:3000/events");
      const eventsData = await response.json();
      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  // Ophalen van categorieën
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3000/categories");
      const categoriesData = await response.json();
      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Unknown Category";
  };

  // Filteren van evenementen op basis van de zoekterm en de geselecteerde categorie
  const matchedEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchField.toLowerCase());
    const matchesCategory = selectedCategory
      ? event.categoryId === Number(selectedCategory)
      : true; // Als geen categorie is geselecteerd, laat dan alle events zien
    return matchesSearch && matchesCategory;
  });

  // Functie voor zoekveld
  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  // Functie voor het selecteren van een categorie
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

      {/* Zoekveld */}
      <Center>
        <Input
          type="text"
          w={["90vw", "60vw", "60vw", "30vw"]}
          onChange={handleSearchChange}
          placeholder="Search events..."
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
          Event not found, please change searchinput
        </Text>
      ) : (
        <Box>
          {matchedEvents.map((event) => (
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
                <Image
                  src={event.image}
                  alt={event.title}
                  style={{ maxWidth: "100%", height: "auto" }}
                  borderRadius="10px"
                />
                <Text>Starting time: {event.startTime}</Text>
                <Text>End time: {event.endTime}</Text>
                <Text>Category: {getCategoryName(event.categoryId)}</Text>
              </Card>
            </Link>
          ))}
        </Box>
      )}
      <Box border="solid" borderRadius="10px" padding="10px" margin="5px">
        <Link to={`/add-event`}>Add Event</Link>
      </Box>
    </Box>
  );
};
