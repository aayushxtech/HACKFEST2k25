import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';

export default function DonateNow() {
  const params = useLocalSearchParams();
  const { donationId, donationType, donationName } = params;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    items: '',
    message: '',
    timeSlot: '',
    topic: '',
  });

  const timeSlots = [
    "8 AM to 10 AM",
    "2 PM to 4 PM",
    "6 PM to 8 PM"
  ];

  const topics = [
    "General Topics",
    "Science",
    "Current Affairs",
    "Behaviours and Skills",
    "Art and Psychology",
    "Sports"
  ];

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Form submitted:', formData);
    router.back();
  };

  const renderFormFields = () => {
    if (donationName === "Education for Children") {
      return (
        <View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Time Slot</Text>
            <View style={styles.optionsContainer}>
              {timeSlots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    formData.timeSlot === slot && styles.optionButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, timeSlot: slot })}
                >
                  <Text style={[
                    styles.optionText,
                    formData.timeSlot === slot && styles.optionTextActive
                  ]}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Topic</Text>
            <View style={styles.optionsContainer}>
              {topics.map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    formData.topic === topic && styles.optionButtonActive
                  ]}
                  onPress={() => setFormData({ ...formData, topic: topic })}
                >
                  <Text style={[
                    styles.optionText,
                    formData.topic === topic && styles.optionTextActive
                  ]}>
                    {topic}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      );
    }

    switch (donationType) {
      case 'Money':
        return (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount (₹)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Enter amount"
              value={formData.amount}
              onChangeText={(text) => setFormData({ ...formData, amount: text })}
            />
          </View>
        );

      case 'Food':
      case 'Books':
      case 'Furniture':
        return (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Items Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              placeholder={`Describe the ${donationType.toLowerCase()} you want to donate`}
              value={formData.items}
              onChangeText={(text) => setFormData({ ...formData, items: text })}
            />
          </View>
        );

      case 'Volunteer':
        return (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              placeholder="Tell us about your volunteering interests"
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
            />
          </View>
        );
    }
  };

  return (
    <View style={styles.safeContainer}>
      <Stack.Screen 
        options={{
          title: 'Make a Donation',
          headerStyle: {
            backgroundColor: '#2874A6',
          },
          headerTintColor: '#fff',
        }} 
      />
      
      <ScrollView 
        style={styles.formContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.headerCard}>
          <Text style={styles.title}>{donationName}</Text>
          <Text style={styles.subtitle}>Type: {donationType}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
            />
          </View>

          {renderFormFields()}

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Donation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  formContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24, // Extra padding at bottom
  },
  headerCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2874A6',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
  },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20, // Add margin bottom to ensure space after form
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2874A6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8, // Add margin at bottom of button
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingBottom: 8, // Add padding at bottom of options
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    marginBottom: 8,
    minWidth: '45%',
  },
  optionButtonActive: {
    backgroundColor: '#2874A6',
    borderColor: '#2874A6',
  },
  optionText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
  },
  optionTextActive: {
    color: '#fff',
    fontWeight: '500',
  },
});
