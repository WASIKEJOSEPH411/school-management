// ProfileSection.js
import React from 'react';
import Sidebar from './Sidebar';
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileHeader,
  ProfileInfo,
  ProfileDetail,
  Label,
  Value,
} from '../../styles/SettingsProfileStyles'; // Import styled components from ProfileSectionStyles.js

const ProfileSection = () => {
  // Sample student profile data
  const studentProfile = {
    name: 'Bilha Nanjala',
    age: 18,
    grade: '12th',
    school: 'St Victoos',
    email: 'earlodhiambo23@gmail.com'
  };

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile</ProfileHeader>
        <ProfileInfo>
          <ProfileDetail>
            <Label>Name:</Label>
            <Value>{studentProfile.name}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Age:</Label>
            <Value>{studentProfile.age}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Grade:</Label>
            <Value>{studentProfile.grade}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>School:</Label>
            <Value>{studentProfile.school}</Value>
          </ProfileDetail>
          <ProfileDetail>
            <Label>Email:</Label>
            <Value>{studentProfile.email}</Value>
          </ProfileDetail>
        </ProfileInfo>
      </Content>
    </ProfileContainer>
  );
};

export default ProfileSection;