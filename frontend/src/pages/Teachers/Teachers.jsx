import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { 
  TeachersContainer, 
  Content, 
  TeachersContent, 
  TeachersHeader, 
  TeacherList, 
  TeacherItem, 
  AddTeacherForm, 
  AddTeacherInput, 
  AddTeacherButton 
} from '../../styles/TeachersStyles';

const TeacherSection = () => {
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/teachers/getall');
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/teachers', newTeacher);
      setTeachers([...teachers, response.data]); // Add new teacher to list dynamically
      setNewTeacher({ name: '', email: '', subject: '' }); // Clear form after submission
    } catch (error) {
      console.error('Error adding teacher:', error);
    }
  };

  return (
    <TeachersContainer>
      <Sidebar />
      <Content>
        <TeachersContent>
          <TeachersHeader>Teachers</TeachersHeader>
          
          {/* Add Teacher Form */}
          <AddTeacherForm onSubmit={handleAddTeacher}>
            <AddTeacherInput 
              type="text" 
              name="name" 
              value={newTeacher.name} 
              onChange={handleInputChange} 
              placeholder="Enter teacher's name" 
              required 
            />
            <AddTeacherInput 
              type="email" 
              name="email" 
              value={newTeacher.email} 
              onChange={handleInputChange} 
              placeholder="Enter teacher's email" 
              required 
            />
            <AddTeacherInput 
              type="text" 
              name="subject" 
              value={newTeacher.subject} 
              onChange={handleInputChange} 
              placeholder="Enter subject" 
              required 
            />
            <AddTeacherButton type="submit">Add Teacher</AddTeacherButton>
          </AddTeacherForm>

          {/* Display Teachers */}
          <TeacherList>
            {teachers.map((teacher) => (
              <TeacherItem key={teacher._id}>
                {teacher.name} - {teacher.email} - {teacher.subject}
              </TeacherItem>
            ))}
          </TeacherList>

        </TeachersContent>
      </Content>
    </TeachersContainer>
  );
};

export default TeacherSection;
