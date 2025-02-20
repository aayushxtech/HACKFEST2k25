import { useState, useEffect } from "react";  // Add useEffect to imports
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    ngoRegistrationNumber: "", // New field for NGO
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    ngoRegistrationNumber: "", // New field for NGO
  });

  // Add this state at the top of your component
  const [userType, setUserType] = useState('USER'); // 'USER' or 'NGO'

  // Add useEffect for logging
  useEffect(() => {
    console.log("Form Data:", formData);
    console.log("Errors:", errors);
    console.log("Is Loading:", isLoading);
  }, [formData, errors, isLoading]);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      ngoRegistrationNumber: "",
    };

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.name) newErrors.name = "Name is required";

    // Add phone validation
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Please enter a valid 10-digit phone number";

    if (userType === 'NGO' && !formData.ngoRegistrationNumber) {
      newErrors.ngoRegistrationNumber = "Registration number is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Your signup logic here
      // await signUp(formData);
    } catch (error) {
      Alert.alert("Error", "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paper}>
        <Text style={styles.title}>Create Account</Text>
        
        <View style={styles.userTypeContainer}>
          <TouchableOpacity 
            style={[
              styles.userTypeButton, 
              userType === 'USER' && styles.userTypeButtonActive
            ]}
            onPress={() => setUserType('USER')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'USER' && styles.userTypeTextActive
            ]}>USER</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.userTypeButton, 
              userType === 'NGO' && styles.userTypeButtonActive
            ]}
            onPress={() => setUserType('NGO')}
          >
            <Text style={[
              styles.userTypeText,
              userType === 'NGO' && styles.userTypeTextActive
            ]}>NGO</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={userType === 'NGO' ? "NGO Name" : "Full Name"}
            placeholderTextColor="#A9A6A7"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
          
          {userType === 'NGO' && (
            <>
              <TextInput
                style={styles.input}
                placeholder="NGO Registration Number"
                placeholderTextColor="#A9A6A7"
                value={formData.ngoRegistrationNumber}
                onChangeText={(text) => setFormData({ ...formData, ngoRegistrationNumber: text })}
              />
              {errors.ngoRegistrationNumber ? (
                <Text style={styles.errorText}>{errors.ngoRegistrationNumber}</Text>
              ) : null}
            </>
          )}

          <TextInput
            style={styles.input}
            placeholder={userType === 'NGO' ? "NGO Email Address" : "Email Address"}
            placeholderTextColor="#A9A6A7"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder={userType === 'NGO' ? "NGO Phone Number" : "Phone Number"}
            placeholderTextColor="#A9A6A7"
            keyboardType="phone-pad"
            value={formData.phone}
            maxLength={10}
            onChangeText={(text) => setFormData({ ...formData, phone: text.replace(/[^0-9]/g, '') })}
          />
          {errors.phone ? (
            <Text style={styles.errorText}>{errors.phone}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A9A6A7"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#A9A6A7"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) =>
              setFormData({ ...formData, confirmPassword: text })
            }
          />
          {errors.confirmPassword ? (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          ) : null}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Sign Up</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Link href="/auth/login" style={styles.link}>
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F7FF",  // Soft blue background
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    backgroundColor: "white",
    padding: 32,  // Increased padding
    borderRadius: 16,
    width: "90%",  // Slightly wider container
    maxWidth: 450,  // Increased max width
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    color: "#2E3E5C",  // Deep blue
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  form: {
    width: "100%",
    marginTop: 8,  // Added margin top
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,  // Increased padding
    marginBottom: 20,  // Increased margin bottom
    fontSize: 16,
    color: "#A9A6A7",  // Updated text color for input values
    width: '100%',  // Ensure full width
  },
  button: {
    backgroundColor: "#4A90E2",  // Bright blue
    padding: 16,
    borderRadius: 12,
    marginTop: 24,  // Increased margin top
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',  // Full width
    alignItems: 'center',  // Center button text
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  buttonDisabled: {
    backgroundColor: "#B8D2F2",
  },
  footer: {
    marginTop: 32,  // Increased margin
    alignItems: "center",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    width: '100%',  // Full width
  },
  footerText: {
    color: "#64748B",  // Slate
    fontSize: 15,
  },
  link: {
    color: "#4A90E2",
    fontWeight: "600",
  },
  errorText: {
    color: "#EF4444",  // Red
    marginBottom: 12,
    fontSize: 13,
    marginLeft: 4,
  },
  userTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',  // Changed from center
    marginBottom: 24,  // Increased margin
    padding: 4,
    backgroundColor: '#F0F7FF',
    borderRadius: 12,
    width: '100%',  // Full width
  },
  userTypeButton: {
    flex: 1,  // Take equal space
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginHorizontal: 4,  // Reduced margin
    alignItems: 'center',  // Center text
    justifyContent: 'center',  // Center text vertically
  },
  userTypeButtonActive: {
    backgroundColor: '#4A90E2',
  },
  userTypeText: {
    fontSize: 16,
    color: '#2E3E5C',
  },
  userTypeTextActive: {
    color: 'white',
  },
});
