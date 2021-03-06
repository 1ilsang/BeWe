import React, { Component } from 'react';

const ProfileAvatar = (props) => {
  return(
    <div className="profile-avatar-wrapper">
      <img className="profile-avatar-image" 
        src={(props.url) ? props.url : "/../public/img/avatar.png"}/>
    </div>
  )
}

export default ProfileAvatar;