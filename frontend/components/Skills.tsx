import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

interface Skill {
  id: string;
  name: string;
  experience: string;
  category: string;
}

const initialSkills: Skill[] = [
  { id: '1', name: 'Babysitting', experience: '2 years', category: 'Childcare' },
  { id: '2', name: 'Elder Care', experience: '3 years', category: 'Healthcare' },
  { id: '3', name: 'Cooking', experience: '5 years', category: 'Household' },
  { id: '4', name: 'Web Development', experience: '2 years', category: 'Technical' },
  { id: '5', name: 'Driving', experience: '8 years', category: 'Transportation' },
];

export default function Skills({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [newSkill, setNewSkill] = useState({ name: '', experience: '', category: '' });

  const addSkill = () => {
    if (newSkill.name && newSkill.experience && newSkill.category) {
      setSkills([
        ...skills,
        { ...newSkill, id: Date.now().toString() }
      ]);
      setNewSkill({ name: '', experience: '', category: '' });
    }
  };

  const removeSkill = (id: string) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <MotiView 
          from={{ translateY: 100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          style={styles.modalContent}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Skills</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Add New Skill Form */}
          <View style={styles.addSkillForm}>
            <TextInput
              style={styles.input}
              placeholder="Skill name"
              value={newSkill.name}
              onChangeText={text => setNewSkill({ ...newSkill, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Years of experience"
              value={newSkill.experience}
              onChangeText={text => setNewSkill({ ...newSkill, experience: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Category"
              value={newSkill.category}
              onChangeText={text => setNewSkill({ ...newSkill, category: text })}
            />
            <TouchableOpacity style={styles.addButton} onPress={addSkill}>
              <Text style={styles.addButtonText}>Add Skill</Text>
            </TouchableOpacity>
          </View>

          {/* Skills List */}
          <ScrollView style={styles.skillsList}>
            {skills.map((skill, index) => (
              <MotiView
                key={skill.id}
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 100 }}
                style={styles.skillCard}
              >
                <View style={styles.skillInfo}>
                  <Text style={styles.skillName}>{skill.name}</Text>
                  <Text style={styles.skillDetails}>
                    {skill.experience} • {skill.category}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeSkill(skill.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </MotiView>
            ))}
          </ScrollView>
        </MotiView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: '80%',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A365D',
  },
  closeButton: {
    padding: 4,
  },
  addSkillForm: {
    marginBottom: 20,
    gap: 12,
  },
  input: {
    backgroundColor: '#F1F5F9',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2874A6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  skillsList: {
    flex: 1,
  },
  skillCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  skillInfo: {
    flex: 1,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A365D',
    marginBottom: 4,
  },
  skillDetails: {
    fontSize: 14,
    color: '#64748B',
  },
  removeButton: {
    padding: 8,
  },
});
