import React, { useState, useContext } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import {
  ProfileContainer,
  Title,
  Input,
  SaveButton,
} from "../components/profile.styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { AuthenticationContext } from "../../../services/authentification/auth.context";
import { ProfileContext } from "../../../services/saveProfile/profile.context";
import { GOOGLE_API_KEY } from "@env";

export const ConfigProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const { onSignOut } = useContext(AuthenticationContext);
  const { saveProfile } = useContext(ProfileContext);

  const extractAddressComponents = (details) => {
    let street = "";
    let city = "";
    let country = "";
    let postalCode = "";

    if (details.address_components) {
      details.address_components.forEach((component) => {
        if (component.types.includes("street_number")) {
          street += component.long_name + " ";
        } else if (component.types.includes("route")) {
          street += component.long_name;
        } else if (component.types.includes("locality")) {
          city = component.long_name;
        } else if (component.types.includes("country")) {
          country = component.long_name;
        } else if (component.types.includes("postal_code")) {
          postalCode = component.long_name;
        }
      });
    }

    return { street, city, country, postalCode };
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => onSignOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
      <Title>Mon profil</Title>
      <ProfileContainer>
        <Input
          placeholder="Nom"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <Input
          placeholder="Prénom"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <GooglePlacesAutocomplete
          placeholder="Adresse"
          onPress={(data, details = null) => {
            console.log(data, details);
            const { street, city, country, postalCode } =
              extractAddressComponents(details);
            setStreet(street);
            setCity(city);
            setCountry(country);
            setPostalCode(parseInt(postalCode));
          }}
          query={{ key: GOOGLE_API_KEY, language: "fr" }}
          fetchDetails={true}
          onFail={() =>
            Alert.alert(
              "Erreur",
              "Une erreur est survenue lors de la saisie de l'adresse. Veuillez réessayer."
            )
          }
          onNotFound={() => Alert.alert("Aucun résultat")}
          listEmptyComponent={() => (
            <View style={{ flex: 1 }}>
              <Text>Aucun résultat trouver</Text>
            </View>
          )}
          styles={{
            container: {
              width: "100%",
            },
            textInputContainer: {
              marginHorizontal: 20,
              marginBottom: 10,
              backgroundColor: "transparent",
            },
            textInput: {
              height: 40,
              margin: 12,
              padding: 10,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 4,
              backgroundColor: "#fff",
            },
          }}
        />
        <SaveButton
          mode="contained"
          onPress={() => {
            if (
              firstName &&
              lastName &&
              street &&
              city &&
              country &&
              postalCode
            ) {
              console.log(firstName);
              saveProfile(
                firstName,
                lastName,
                street,
                city,
                country,
                postalCode
              );
            } else {
              Alert.alert("Erreur", "Veuillez remplir tous les champs");
            }
          }}
        >
          Enregistrer
        </SaveButton>
      </ProfileContainer>
    </SafeAreaView>
  );
};
