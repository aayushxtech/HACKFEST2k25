import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { MotiView, AnimatePresence } from "moti";
import Animated, { FadeInUp, FadeInRight } from "react-native-reanimated";
import Skills from '@/components/Skills';
import { SharedElement } from 'react-navigation-shared-element';
import { LinearGradient } from 'expo-linear-gradient';

const iconColors = {
  cash: "#38A169",
  location: "#D69E2E",
  call: "#3182CE",
  bookmark: "#FFFFFF",
  person: "#FFFFFF",
  chat: "#FFFFFF"
};

interface JobListing {
  id: string;
  name: string;
  jobTitle: string;
  description: string;
  salary: string;
  location: string;
  contact: string;
  postedDate: string;
  urgent?: boolean;
}

const jobListings: JobListing[] = [
  {
    id: "1",
    name: "Mrs. Sharma",
    jobTitle: "Babysitter Needed",
    description: "Looking for an experienced babysitter for 2-year-old. Timings: 9 AM - 6 PM, Mon-Fri.",
    salary: "₹18,000/month",
    location: "Adyar, Chennai",
    contact: "+91 98765 43210",
    postedDate: "2 days ago",
    urgent: true
  },
  {
    id: "2",
    name: "Mr. Raghavan",
    jobTitle: "Elder Care Assistant",
    description: "Need a patient and caring person to assist elderly parent. Basic medical knowledge preferred.",
    salary: "₹22,000/month",
    location: "T Nagar, Chennai",
    contact: "+91 98765 43211",
    postedDate: "1 day ago"
  },
  {
    id: "3",
    name: "Mrs. Lakshmi",
    jobTitle: "Experienced Cook Required",
    description: "Looking for a cook who can prepare South Indian and North Indian dishes. Working hours: 7 AM - 2 PM.",
    salary: "₹20,000/month",
    location: "Velachery, Chennai",
    contact: "+91 98765 43212",
    postedDate: "3 days ago"
  },
  {
    id: "4",
    name: "Mr. Kumar",
    jobTitle: "Driver for School Pickup",
    description: "Need a reliable driver with 5+ years experience for school children pickup and drop. Must have clean driving record.",
    salary: "₹16,000/month",
    location: "Anna Nagar, Chennai",
    contact: "+91 98765 43213",
    postedDate: "1 day ago",
    urgent: true
  },
  {
    id: "5",
    name: "Coffee House Chennai",
    jobTitle: "Website Developer Needed",
    description: "Looking for a freelance web developer to create and maintain our cafe's website. Knowledge of React required.",
    salary: "₹40,000 (Project based)",
    location: "Nungambakkam, Chennai",
    contact: "+91 98765 43214",
    postedDate: "4 days ago"
  },
  {
    id: "6",
    name: "Dr. Subramanian",
    jobTitle: "Home Nurse Required",
    description: "Seeking experienced home nurse for post-surgery care of elderly patient. Night shift (8 PM - 8 AM).",
    salary: "₹25,000/month",
    location: "Mylapore, Chennai",
    contact: "+91 98765 43215",
    postedDate: "2 days ago",
    urgent: true
  },
  {
    id: "7",
    name: "Green Gardens Society",
    jobTitle: "Garden Maintenance",
    description: "Need gardener for maintaining society garden. Experience in plant care and landscaping preferred.",
    salary: "₹15,000/month",
    location: "ECR, Chennai",
    contact: "+91 98765 43216",
    postedDate: "5 days ago"
  },
  {
    id: "8",
    name: "Mrs. Priya",
    jobTitle: "Math Tutor",
    description: "Looking for math tutor for 8th grade student. Weekend classes preferred.",
    salary: "₹8,000/month",
    location: "Besant Nagar, Chennai",
    contact: "+91 98765 43217",
    postedDate: "1 day ago"
  },
  {
    id: "9",
    name: "Chennai Pet Care",
    jobTitle: "Pet Sitter",
    description: "Need experienced pet sitter for dog walking and basic care. Part-time role.",
    salary: "₹12,000/month",
    location: "Thiruvanmiyur, Chennai",
    contact: "+91 98765 43218",
    postedDate: "3 days ago"
  },
  {
    id: "10",
    name: "Mr. Rajesh",
    jobTitle: "House Painter",
    description: "Required skilled painter for 3BHK apartment. One month project.",
    salary: "₹35,000 (Project based)",
    location: "Porur, Chennai",
    contact: "+91 98765 43219",
    postedDate: "2 days ago"
  },
  {
    id: "11",
    name: "Chennai Dance Academy",
    jobTitle: "Dance Instructor",
    description: "Looking for Bharatanatyam instructor for weekend classes. Minimum 3 years teaching experience.",
    salary: "₹20,000/month",
    location: "T Nagar, Chennai",
    contact: "+91 98765 43220",
    postedDate: "4 days ago"
  },
  {
    id: "12",
    name: "Mrs. Devi",
    jobTitle: "Event Decorator",
    description: "Need creative decorator for small family functions and events. Part-time basis.",
    salary: "₹5,000/event",
    location: "KK Nagar, Chennai",
    contact: "+91 98765 43221",
    postedDate: "1 day ago"
  }
];

export default function ServicesScreen() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  
  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#E1F5FE', '#F0F8FF', '#FFFFFF']}
        style={StyleSheet.absoluteFillObject}
      />

      <MotiView 
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 800 }}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Services</Text>
        <View style={styles.headerRight}>
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'timing', duration: 600, delay: 200 }}
          >
            <TouchableOpacity 
              style={styles.skillButton}
              onPress={() => setShowSkills(true)}
            >
              <Ionicons name="bookmark-outline" size={20} color={iconColors.bookmark} />
              <Text style={styles.skillButtonText}>My Skills</Text>
            </TouchableOpacity>
          </MotiView>

          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'timing', duration: 600, delay: 400 }}
          >
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => router.push("/(tabs)/profile")}
            >
              <Ionicons name="person-circle" size={28} color={iconColors.person} />
            </TouchableOpacity>
          </MotiView>
        </View>
      </MotiView>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {jobListings.map((job, index) => (
          <Animated.View
            key={job.id}
            entering={FadeInUp.delay(index * 100).springify()}
            style={styles.jobCard}
          >
            <View style={styles.jobHeader}>
              <View>
                <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                <Text style={styles.employerName}>{job.name}</Text>
              </View>
              {job.urgent && (
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentText}>Urgent</Text>
                </View>
              )}
            </View>
            
            <Text style={styles.description}>{job.description}</Text>
            
            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Ionicons name="cash-outline" size={16} color={iconColors.cash} />
                <Text style={styles.detailText}>{job.salary}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={16} color={iconColors.location} />
                <Text style={styles.detailText}>{job.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="call-outline" size={16} color={iconColors.call} />
                <Text style={styles.detailText}>{job.contact}</Text>
              </View>
            </View>
            
            <View style={styles.cardFooter}>
              <Text style={styles.postedDate}>{job.postedDate}</Text>
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Chatbot Button */}
      <MotiView
        from={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          delay: 500,
        }}
        style={styles.chatbotButton}
      >
        <TouchableOpacity onPress={() => setShowChatbot(!showChatbot)}>
          <Ionicons name="chatbubbles" size={24} color={iconColors.chat} />
        </TouchableOpacity>
      </MotiView>

      <Skills visible={showSkills} onClose={() => setShowSkills(false)} />
    </View>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#4A90E2",
    borderBottomWidth: 0,
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  skillButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  skillButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  profileButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  jobCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    transform: [{ scale: 1 }],
    ...Platform.select({
      ios: {
        shadowColor: "#4A90E2",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2D3748",
    marginBottom: 4,
  },
  employerName: {
    fontSize: 14,
    color: "#64748B",
    fontWeight: "500",
  },
  urgentBadge: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  urgentText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "600",
  },
  description: {
    color: "#4A5568",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  detailsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F7FAFC",
    padding: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  detailText: {
    color: "#4A5568",
    fontSize: 14,
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  postedDate: {
    color: "#64748B",
    fontSize: 12,
  },
  applyButton: {
    backgroundColor: "#2874A6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 3,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  chatbotButton: {
    position: "absolute",
    left: 20,
    bottom: 20,
    backgroundColor: "#4A90E2",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
