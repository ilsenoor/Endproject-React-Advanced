import React from "react";
import { Link } from "react-router-dom";
import { Text, Box } from "@chakra-ui/react";
import { AddEvent } from "../pages/AddEvent";

export const Navigation = () => {
  return (
    <Box
      width="100vw"
      display="flex"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="center"
      padding="20px"
      backgroundColor="blue.100"
    >
      <Text border="solid" borderRadius="10px" padding="10px" margin="5px">
        <Link to="/">Home</Link>
      </Text>
      <Text border="solid" borderRadius="10px" padding="10px" margin="5px">
        <Link to="/event/1">Event</Link>
      </Text>
      <Text border="solid" borderRadius="10px" padding="10px" margin="5px">
        <Link to="/add-event" element={<AddEvent />}>
          Add Event
        </Link>
      </Text>
    </Box>
  );
};
