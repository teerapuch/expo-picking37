import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);

  // On Press Button
  let openImagePickerAsync = async () => {
    // Request Permissions For Camera And Photo
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    // If Permission Result Status = undetermined, denied is false
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // If Permission status = granted you can use ImagePicker
    // ImagePicker.launchImageLibraryAsync will call choose photo in your device
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    // if you cancle choose photo
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  // Open Sharing Image Dialog
  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
      return;
    }
    // Get Image Uri
    await Sharing.shareAsync(selectedImage.localUri);
  };

  // your image will show
  const ShowImage = (props) => {
    if (selectedImage !== null) {
      return (
        <View>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
          <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
            <Text style={styles.buttonText}>Share this photo</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <Image
          style={styles.logo}
          source={{
            uri: "https://teerapuch.com/wp-content/uploads/2020/08/morning-brew-7FvRXPYH0Yw-unsplash-600x400.jpg",
          }}
        />
      );
    }
  };

  // return to your screen
  return (
    <View style={styles.container}>
      <ShowImage />
      <Text style={styles.title}>Picking Photo</Text>
      <Text>Application On Expo SDK37</Text>
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

// your css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  buttonText: {
    padding: 20,
    color: "#fff",
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#258085",
    backgroundColor: "#258085",
  },
});
