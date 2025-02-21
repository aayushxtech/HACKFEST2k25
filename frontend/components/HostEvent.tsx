import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

interface EventData {
  eventName: string;
  description: string;
  date: Date;
  time: Date;
  imageUrl?: string;
}

interface HostEventsProps {
  visible: boolean;
  onClose: () => void;
}

const HostEvents: React.FC<HostEventsProps> = ({ visible, onClose }) => {
  const [eventData, setEventData] = useState<EventData>({
    eventName: "",
    description: "",
    date: new Date(),
    time: new Date(),
    imageUrl: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof EventData, value: string) => {
    setEventData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!eventData.eventName.trim())
      newErrors.eventName = "Event name is required";
    if (!eventData.description.trim())
      newErrors.description = "Description is required";

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (eventData.date < today) newErrors.date = "Date cannot be in the past";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "We need access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setEventData((prev) => ({ ...prev, imageUrl: result.assets[0].uri }));
    }
  };

  const uploadImage = async (uri: string, eventName: string) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `eventImages/${eventName}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image.");
    }
  };

  const handleSubmit = async () => {
    if (!validateForm() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      let uploadedImageUrl = eventData.imageUrl;

      if (eventData.imageUrl) {
        uploadedImageUrl = (await uploadImage(
          eventData.imageUrl,
          eventData.eventName
        )) as string;
      }

      const combinedDateTime = new Date(eventData.date);
      combinedDateTime.setHours(eventData.time.getHours());
      combinedDateTime.setMinutes(eventData.time.getMinutes());

      await addDoc(collection(db, "events"), {
        eventName: eventData.eventName.trim(),
        description: eventData.description.trim(),
        date: combinedDateTime.toISOString(),
        time: eventData.time.toLocaleTimeString(),
        imageUrl: uploadedImageUrl,
        createdAt: new Date().toISOString(),
      });

      setEventData({
        eventName: "",
        description: "",
        date: new Date(),
        time: new Date(),
        imageUrl: "",
      });

      onClose();
      Alert.alert("Success", "Event hosted successfully!");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEventData((prev) => ({ ...prev, date: selectedDate }));
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setEventData((prev) => ({ ...prev, time: selectedTime }));
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.modalContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Host an Event</Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* Event Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Event Name</Text>
              <TextInput
                style={[styles.input, errors.eventName && styles.inputError]}
                placeholder="Enter event name"
                value={eventData.eventName}
                onChangeText={(text) => handleInputChange("eventName", text)}
                placeholderTextColor="#999"
              />

              {errors.eventName && (
                <Text style={styles.errorText}>{errors.eventName}</Text>
              )}
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter event description"
                multiline
                numberOfLines={4}
                value={eventData.description}
                onChangeText={(text) => handleInputChange("description", text)}
                placeholderTextColor="#999"
              />
            </View>

            {/* Date Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Date</Text>
              <TouchableOpacity
                style={[styles.dateButton, errors.date && styles.inputError]}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{eventData.date.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={eventData.date}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  minimumDate={new Date()}
                />
              )}
            </View>

            {/* Time Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Time</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Text>{eventData.time.toLocaleTimeString()}</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={eventData.time}
                  mode="time"
                  display="default"
                  onChange={onTimeChange}
                />
              )}
            </View>

            {/* Image Picker */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Event Poster</Text>
              <TouchableOpacity
                onPress={pickImage}
                style={styles.imagePickerButton}
              >
                {eventData.imageUrl ? (
                  <Image
                    source={{ uri: eventData.imageUrl }}
                    style={styles.previewImage}
                  />
                ) : (
                  <Text>Add Event Poster</Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Buttons */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.submitButton,
                isSubmitting && styles.disabledButton,
              ]}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? "Submitting..." : "Host Event"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },
  container: {
    width: "90%",
    maxHeight: "90%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    paddingBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2874A6",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#000",
  },
  inputError: {
    borderColor: "#FF3B30",
    borderWidth: 1.5,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
  dateButton: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  imagePickerButton: {
    height: 200,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    resizeMode: "cover",
  },
  submitButton: {
    backgroundColor: "#2874A6",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  cancelButtonText: {
    color: "#2874A6",
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: "#99a4ad",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#444",
  },
  scrollContent: {
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  buttonGroup: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
});

export default HostEvents;
