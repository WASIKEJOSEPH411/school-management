import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // ✅ Import PropTypes
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  AssignmentsContainer,
  SidebarContainer,
  Content,
  AssignmentCard,
  AssignmentTitle,
  AssignmentDescription,
  AssignmentButton,
  AssignmentDoneMessage,
} from '../../styles/AssignmentsStyles'; // Import styled components

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/assignments/getall');
      setAssignments(response.data.assignments);
      setError(null);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setAssignments([]);
      setError('Failed to load assignments. Please try again.');
    }
  };

  const handleDoAssignment = async (id, opinion) => {
    try {
      await axios.post(`http://localhost:4000/api/v1/assignments/submit/${id}`, {
        opinion,
        studentId: 'student123', // Replace with actual student ID logic
      });

      // Update assignments state to reflect changes
      setAssignments((prevAssignments) =>
        prevAssignments.map((assignment) =>
          assignment.id === id ? { ...assignment, done: true } : assignment
        )
      );
    } catch (error) {
      console.error('Error submitting assignment:', error);
      setError('Failed to submit assignment. Please try again.');
    }
  };

  return (
    <AssignmentsContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <h1>Assignments</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <AssignmentCard key={assignment.id}>
              <AssignmentTitle>{assignment.title}</AssignmentTitle>
              <AssignmentDescription>{assignment.description}</AssignmentDescription>
              {!assignment.done ? (
                <AssignmentForm assignmentId={assignment.id} onDoAssignment={handleDoAssignment} />
              ) : (
                <AssignmentDoneMessage>Assignment Done</AssignmentDoneMessage>
              )}
            </AssignmentCard>
          ))
        ) : (
          <p>No assignments available.</p>
        )}
      </Content>
    </AssignmentsContainer>
  );
};

// ✅ Fix: Add PropTypes for props validation
const AssignmentForm = ({ assignmentId, onDoAssignment }) => {
  const [opinion, setOpinion] = useState('');

  const handleInputChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (opinion.trim() !== '') {
      onDoAssignment(assignmentId, opinion);
      setOpinion('');
    } else {
      alert('Please provide your opinion/assignment.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={opinion}
        onChange={handleInputChange}
        placeholder="Enter your opinion/assignment..."
        required
      />
      <AssignmentButton type="submit">Submit</AssignmentButton>
    </form>
  );
};

// ✅ Define expected prop types
AssignmentForm.propTypes = {
  assignmentId: PropTypes.string.isRequired,
  onDoAssignment: PropTypes.func.isRequired,
};

export default StudentAssignments;
