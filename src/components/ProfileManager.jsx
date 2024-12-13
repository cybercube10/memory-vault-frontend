// ProfileManager.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileManager = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProfilePic = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/users/profile-pic', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success && response.data.profilePicture) {
        setProfilePicture(response.data.profilePicture);
        localStorage.setItem('profilePic', response.data.profilePicture);
      }
    } catch (error) {
      console.error('Error fetching profile picture:', error);
      // Only use cached version if there's a network error
      if (error.response?.status === 404 || error.code === 'ERR_NETWORK') {
        const cachedPic = localStorage.getItem('profilePic');
        if (cachedPic) setProfilePicture(cachedPic);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleProfilePicUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', file);

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/add/upload-profile-pic',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success && response.data.imageUrl) {
        setProfilePicture(response.data.imageUrl);
        localStorage.setItem('profilePic', response.data.imageUrl);
        // Trigger a re-fetch to ensure consistency
        fetchProfilePic();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to upload profile picture');
      console.error('Profile picture upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile picture on mount and token change
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfilePic();
    }
  }, []);

  return {
    profilePicture,
    loading,
    error,
    handleProfilePicUpload,
    fetchProfilePic
  };
};

export default ProfileManager;