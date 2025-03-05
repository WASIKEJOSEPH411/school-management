import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import { 
  StudentsContainer, 
  Content, 
  StudentsContent, 
  StudentsHeader, 
  StudentList, 
  StudentItem, 
  AddStudentForm, 
  AddStudentInput, 
  AddStudentButton 
} from '../../styles/StudentsStyles';

const StudentSection = () => {
  const [newStudent, setNewStudent] = useState({ name: '', registrationNumber: '', grade: '' });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/students/getall');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/students', newStudent);
      setStudents([...students, response.data]); // Add new student dynamically
      setNewStudent({ name: '', registrationNumber: '', grade: '' }); // Clear form
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <StudentsContainer>
      <Sidebar />
      <Content>
        <StudentsContent>
          <StudentsHeader>Students</StudentsHeader>

          {/* Add Student Form */}
          <AddStudentForm onSubmit={handleAddStudent}>
            <AddStudentInput 
              type="text" 
              name="name" 
              value={newStudent.name} 
              onChange={handleInputChange} 
              placeholder="Enter student's name" 
              required 
            />
            <AddStudentInput 
              type="text" 
              name="registrationNumber" 
              value={newStudent.registrationNumber} 
              onChange={handleInputChange} 
              placeholder="Enter registration number" 
              required 
            />
            <AddStudentInput 
              type="text" 
              name="grade" 
              value={newStudent.grade} 
              onChange={handleInputChange} 
              placeholder="Enter grade" 
              required 
            />
            <AddStudentButton type="submit">Add Student</AddStudentButton>
          </AddStudentForm>

          {/* Display Students */}
          <StudentList>
            {students.map((student) => (
              <StudentItem key={student._id}>
                {student.name} - {student.registrationNumber} - {student.grade}
              </StudentItem>
            ))}
          </StudentList>

        </StudentsContent>
      </Content>
    </StudentsContainer>
  );
};

export default StudentSection;
