import React, { useState } from 'react';
import axios from 'axios';

function NoteModal({ onClose }) {
  const [noteData, setNoteData] = useState({
    title: '',
    description: '',
  });

  const [noteImg, setNoteImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData({
      ...noteData,
      [name]: value,
    });
  };

  const handleAddNotes = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', noteData.title);
    formData.append('description', noteData.description);
    formData.append('image', noteImg); // Append the image file

    try {
      await axios.post('http://localhost:3000/api/users/note/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Note added successfully!');
      setNoteData({
        title: '',
        description: '',
      });
      setNoteImage(null);
      onClose(); // Close the modal after successfully adding the note
    } catch (error) {
      console.error('Error adding note:', error);
      alert('Failed to add note.');
    }
  };

  const handleFileChange = (e) => {
    setNoteImage(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>

        <form onSubmit={handleAddNotes}>
          <input
            type="text"
            name="title"
            className="border m-2 w-full"
            placeholder="Title"
            value={noteData.title}
            onChange={handleChange}
            required
          />

          <textarea
            type="text"
            name="description"
            className="border w-full h-32 m-2"
            placeholder="Description"
            value={noteData.description}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border m-2"
          />

          <div>
            <button
              className="py-1 px-4 bg-blue-500 text-white rounded-md items-center"
              type="submit"
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
