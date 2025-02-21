import { useState, useEffect } from "react";
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
import { Link, router } from "expo-router";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function SignUp() {
  const db = getFirestore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    ngoRegistrationNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    ngoRegistrationNumber: "",
  });

  const [userType, setUserType] = useState("USER");

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
    // Removed the complex password validation

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.name) newErrors.name = "Name is required";

    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Please enter a valid 10-digit phone number";

    if (userType === "NGO" && !formData.ngoRegistrationNumber) {
      newErrors.ngoRegistrationNumber = "Registration number is required";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update user profile
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        userType: userType,
        ngoRegistrationNumber:
          userType === "NGO" ? formData.ngoRegistrationNumber : null,
        createdAt: new Date().toISOString(),
      });

      // Clear loading state immediately after operations are complete
      setIsLoading(false);

      // Show success message and navigate
      Alert.alert(
        "Success",
        "Account created successfully!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/auth/login"),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Signup error:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to create account";
      // Clear loading state before showing error
      setIsLoading(false);
      Alert.alert("Error", errorMessage);
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
              userType === "USER" && styles.userTypeButtonActive,
            ]}
            onPress={() => setUserType("USER")}
          >
            <Text
              style={[
                styles.userTypeText,
                userType === "USER" && styles.userTypeTextActive,
              ]}
            >
              USER
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.userTypeButton,
              userType === "NGO" && styles.userTypeButtonActive,
            ]}
            onPress={() => setUserType("NGO")}
          >
            <Text
              style={[
                styles.userTypeText,
                userType === "NGO" && styles.userTypeTextActive,
              ]}
            >
              NGO
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={userType === "NGO" ? "NGO Name" : "Full Name"}
            placeholderTextColor="#A9A6A7"
            value={formData.name}
            onChangeText={(text) =>
              setFormData({ ...formData, name: text.trim() })
            }
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}

          {userType === "NGO" && (
            <>
              <TextInput
                style={styles.input}
                placeholder="NGO Registration Number"
                placeholderTextColor="#A9A6A7"
                value={formData.ngoRegistrationNumber}
                onChangeText={(text) =>
                  setFormData({
                    ...formData,
                    ngoRegistrationNumber: text.trim(),
                  })
                }
              />
              {errors.ngoRegistrationNumber ? (
                <Text style={styles.errorText}>
                  {errors.ngoRegistrationNumber}
                </Text>
              ) : null}
            </>
          )}

          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#A9A6A7"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) =>
              setFormData({ ...formData, email: text.trim() })
            }
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}

          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            placeholderTextColor="#A9A6A7"
            keyboardType="phone-pad"
            value={formData.phone}
            maxLength={10}
            onChangeText={(text) =>
              setFormData({ ...formData, phone: text.replace(/[^0-9]/g, "") })
            }
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
            activeOpacity={isLoading ? 1 : 0.7}
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
    backgroundColor: "#F7F9FC",
    padding: 20,
  },
  paper: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1A1B1E",
    textAlign: "center",
    marginBottom: 25,
  },
  form: {
    width: "100%",
    gap: 10,
  },
  userTypeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 25,
  },
  userTypeButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#2563EB",
    minWidth: 100,
    alignItems: "center",
  },
  userTypeButtonActive: {
    backgroundColor: "#2563EB",
  },
  userTypeText: {
    color: "#2563EB",
    fontSize: 16,
    fontWeight: "600",
  },
  userTypeTextActive: {
    color: "white",
  },
  input: {
    height: 55,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#93C5FD",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    marginTop: 25,
    alignItems: "center",
  },
  footerText: {
    color: "#64748B",
    fontSize: 15,
  },
  link: {
    color: "#2563EB",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 13,
    marginBottom: 8,
    marginTop: -2,
    paddingLeft: 4,
  },
});
