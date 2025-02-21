import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';

export default function ApplyNow() {
  const params = useLocalSearchParams();
  const { jobId, jobTitle, employerName, salary, location, contact } = params;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    skills: '',
    availability: '',
    message: '',
  });

  const handleSubmit = () => {
    console.log('Application submitted:', formData);
    router.back();
  };

  return (
    <View style={styles.safeContainer}>
      <Stack.Screen 
        options={{
          title: 'Apply for Job',
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
          <Text style={styles.title}>{jobTitle}</Text>
          <Text style={styles.subtitle}>Employer: {employerName}</Text>
          
          {/* Add job details section */}
          <View style={styles.jobDetails}>
            <Text style={styles.detailText}>Salary: {salary}</Text>
            <Text style={styles.detailText}>Location: {location}</Text>
            <Text style={styles.detailText}>Contact: {contact}</Text>
          </View>
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

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Experience</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={3}
              placeholder="Describe your relevant experience"
              value={formData.experience}
              onChangeText={(text) => setFormData({ ...formData, experience: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Education</Text>
            <TextInput
              style={styles.input}
              placeholder="Your highest education qualification"
              value={formData.education}
              onChangeText={(text) => setFormData({ ...formData, education: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Skills</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={3}
              placeholder="List your relevant skills"
              value={formData.skills}
              onChangeText={(text) => setFormData({ ...formData, skills: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Availability</Text>
            <TextInput
              style={styles.input}
              placeholder="When can you start?"
              value={formData.availability}
              onChangeText={(text) => setFormData({ ...formData, availability: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cover Letter</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              numberOfLines={4}
              placeholder="Why should you be hired for this position?"
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Application</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ...same styles as donatenow.tsx with minor adjustments...
  safeContainer: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  formContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
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
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  form: {
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
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#2874A6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  jobDetails: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 4,
  },
  // ...rest of the styles same as donatenow.tsx...
});
