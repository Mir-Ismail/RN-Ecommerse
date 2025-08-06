import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function SignUpFlowScreen({ navigation, route }) {
  const { email, password } = route.params || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: email || "",
    phoneNumber: "",
    city: "",
    gender: "",
    month: "",
    day: "",
    year: "",
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { title: "Enter Your Name", field: "name", placeholder: "Name" },
    { title: "Enter Your Email", field: "email", placeholder: "Email" },
    {
      title: "Enter Your Phone Number",
      field: "phoneNumber",
      placeholder: "Phone",
    },
    { title: "City Of Residence", field: "city", placeholder: "Address" },
    { title: "Select Your Gender", field: "gender", placeholder: "Gender" },
    {
      title: "Date Of Birth",
      field: "dateOfBirth",
      placeholder: "Date of Birth",
    },
  ];

  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0:
        if (!formData.name.trim()) {
          newErrors.name = "Name is required";
        }
        break;
      case 1:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
        break;
      case 2:
        const phoneRegex = /^\d{10}$/;
        if (!formData.phoneNumber.trim()) {
          newErrors.phoneNumber = "Phone number is required";
        } else if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ""))) {
          newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
        }
        break;
      case 3:
        if (!formData.city.trim()) {
          newErrors.city = "City is required";
        }
        break;
      case 4:
        if (!formData.gender) {
          newErrors.gender = "Please select your gender";
        }
        break;
      case 5:
        if (!formData.month || !formData.day || !formData.year) {
          newErrors.dateOfBirth = "Please select your complete date of birth";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleCompleteSignUp();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleCompleteSignUp = () => {
    Alert.alert("Success!", "Account created successfully!", [
      {
        text: "OK",
        onPress: () => navigation.navigate("SignIn"),
      },
    ]);
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>
              Enter Your <Text style={styles.highlightedText}>Name</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.name && styles.inputError]}
              placeholder="Name"
              value={formData.name}
              onChangeText={(value) => updateFormData("name", value)}
              autoCapitalize="words"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>
              Enter Your <Text style={styles.highlightedText}>Email</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Email"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>
              Enter Your{" "}
              <Text style={styles.highlightedText}>Phone Number</Text>
            </Text>
            <View style={styles.phoneContainer}>
              <View style={styles.countryCodeContainer}>
                <Text style={styles.countryCode}>+92</Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
              </View>
              <TextInput
                style={[
                  styles.phoneInput,
                  errors.phoneNumber && styles.inputError,
                ]}
                placeholder="Phone"
                value={formData.phoneNumber}
                onChangeText={(value) => updateFormData("phoneNumber", value)}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber}</Text>
            )}
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>
              City Of <Text style={styles.highlightedText}>Residence</Text>
            </Text>
            <TextInput
              style={[styles.input, errors.city && styles.inputError]}
              placeholder="Address"
              value={formData.city}
              onChangeText={(value) => updateFormData("city", value)}
              autoCapitalize="words"
            />
            {errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>
              Select Your <Text style={styles.highlightedText}>Gender</Text>
            </Text>
            <TouchableOpacity
              style={[
                styles.genderButton,
                formData.gender === "Male" && styles.genderButtonSelected,
              ]}
              onPress={() => updateFormData("gender", "Male")}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  formData.gender === "Male" && styles.genderButtonTextSelected,
                ]}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                formData.gender === "Female" && styles.genderButtonSelected,
              ]}
              onPress={() => updateFormData("gender", "Female")}
            >
              <Text
                style={[
                  styles.genderButtonText,
                  formData.gender === "Female" &&
                    styles.genderButtonTextSelected,
                ]}
              >
                Female
              </Text>
            </TouchableOpacity>
            {errors.gender && (
              <Text style={styles.errorText}>{errors.gender}</Text>
            )}
          </View>
        );

      case 5:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>
              Date Of <Text style={styles.highlightedText}>Birth</Text>
            </Text>
            <View style={styles.dateContainer}>
              <View style={styles.datePickerContainer}>
                <View style={styles.datePickerField}>
                  <Text style={styles.datePickerText}>
                    {formData.month || "Month"}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </View>
                <Picker
                  selectedValue={formData.month}
                  onValueChange={(value) => updateFormData("month", value)}
                  style={styles.datePicker}
                >
                  <Picker.Item label="month" value="" />
                  {months.map((month, index) => (
                    <Picker.Item key={index} label={month} value={month} />
                  ))}
                </Picker>
              </View>
              <View style={styles.datePickerContainer}>
                <View style={styles.datePickerField}>
                  <Text style={styles.datePickerText}>
                    {formData.day || "Day"}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </View>
                <Picker
                  selectedValue={formData.day}
                  onValueChange={(value) => updateFormData("day", value)}
                  style={styles.datePicker}
                >
                  <Picker.Item label="day" value="" />
                  {days.map((day) => (
                    <Picker.Item key={day} label={day.toString()} value={day} />
                  ))}
                </Picker>
              </View>
              <View style={styles.datePickerContainer}>
                <View style={styles.datePickerField}>
                  <Text style={styles.datePickerText}>
                    {formData.year || "Year"}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </View>
                <Picker
                  selectedValue={formData.year}
                  onValueChange={(value) => updateFormData("year", value)}
                  style={styles.datePicker}
                >
                  <Picker.Item label="year" value="" />
                  {years.map((year) => (
                    <Picker.Item
                      key={year}
                      label={year.toString()}
                      value={year}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            {errors.dateOfBirth && (
              <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              {steps.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressBar,
                    index <= currentStep && styles.progressBarActive,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Step Content */}
          {renderStepContent()}

          {/* Continue Button */}
          <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
            <Text style={styles.continueButtonText}>
              {currentStep === steps.length - 1
                ? "Continue to Login"
                : "Continue"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 40,
  },
  backButton: {
    marginRight: 20,
    marginTop: 30,
  },
  progressContainer: {
    flexDirection: "row",
    flex: 1,
  },
  progressBar: {
    width: 30,
    height: 4,
    backgroundColor: "#E0E0E0",
    marginRight: 8,
    marginTop: 30,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: "#FF6B9D",
  },
  stepContainer: {
    flex: 1,
    justifyContent: "center",
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  highlightedText: {
    color: "#FF6B9D",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: "white",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "#FF6B6B",
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 14,
    marginBottom: 10,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginRight: 10,
    backgroundColor: "white",
  },
  countryCode: {
    fontSize: 16,
    marginRight: 5,
    color: "#333",
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: "white",
  },
  genderButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "white",
    alignItems: "center",
  },
  genderButtonSelected: {
    backgroundColor: "#FF6B9D",
    borderColor: "#FF6B9D",
  },
  genderButtonText: {
    fontSize: 16,
    color: "#666",
  },
  genderButtonTextSelected: {
    color: "white",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  datePickerContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  datePickerField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    height: 50,
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  datePicker: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0,
  },
  datePickerLabel: {
    paddingHorizontal: 5,
    paddingTop: 8,
    paddingBottom: 4,
  },
  datePickerLabelText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  continueButton: {
    backgroundColor: "#FF6B9D",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 30,
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
