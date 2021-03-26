import axios from "axios";
import React, { useState } from "react";
import { Button, View, TouchableOpacity } from "react-native";
import { MARK_LOCATION_AS_LIKED } from "../../../apiLinks";
import SearchBar from "../../components/SearchBar";
import Typography from "../../components/Typography";
import styles from "./styles";
import { useSelector } from "react-redux";

const SearchScreen = () => {
  const [searchValue, setSearchValue] = useState();
  const [locations, setLocations] = useState([]);
  const token = useSelector((state) => state.person.token);

  function handleSearch() {
    console.log(searchValue);
    axios({
      method: "GET",
      url: "http://192.168.1.106:8080/api/location",
      params: {
        searchQuery: searchValue,
      },
    })
      .then((res) => setLocations(res.data.content))
      .catch((err) => console.log("error", err));
  }

  function handleLocationLike(locationId) {
    axios({
      method: "GET",
      url: MARK_LOCATION_AS_LIKED(locationId),
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log("error", err));
  }

  return (
    <View>
      <Typography>Search screen</Typography>
      <SearchBar
        value={searchValue}
        onChange={(newVal) => setSearchValue(newVal)}
      />
      <Button onPress={handleSearch} title="search" />
      {locations.map((location) => {
        return (
          <TouchableOpacity
            key={location.id}
            style={{ height: 200, margin: 20, backgroundColor: "#f8f6f6" }}
            onPress={() => handleLocationLike(location.id)}
          >
            <Typography>{location.title}</Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SearchScreen;
