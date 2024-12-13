import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit2 } from 'lucide-react';
import axios from 'axios';
import NoteModal from './NoteModal';

const MemoriesGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [memories, setMemories] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [newMemory, setNewMemory] = useState({
    title: '',
    description: '',
    image: null,
  });

  // Fetch Notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users/note/mynotes', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.data.success) {
        setMemories(response.data.note || []);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Handle Add Note
  const handleAddMemory = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newMemory.title);
      formData.append('description', newMemory.description);
      formData.append('image', newMemory.image);

      const response = axios.post('http://localhost:3000/api/users/note/add', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setIsModalOpen(false);
        setNewMemory({ title: '', description: '', image: null });
        fetchNotes();
      }
    } catch (error) {
      console.error('Error adding memory:', error);
    }
  };

  // Handle Delete Note
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/note/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchNotes(); // Refresh the notes
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  // Handle Edit Note
  const handleEdit = (memory) => {
    setNewMemory({
      title: memory.title,
      description: memory.description,
      image: null, // Don't set the existing image file
    });
    setEditingId(memory._id);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  // Handle Update Note
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('title', newMemory.title);
      formData.append('description', newMemory.description);
      if (newMemory.image) {
        formData.append('image', newMemory.image);
      }

      await axios.put(`http://localhost:3000/api/users/note/update/${editingId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsModalOpen(false);
      setNewMemory({ title: '', description: '', image: null });
      setEditingId(null);
      setIsEditing(false);
      fetchNotes(); // Refresh the notes
    } catch (error) {
      console.error('Error updating memory:', error);
    }
  };

  const handleModalOpen = () => {
    setIsEditing(false);
    setEditingId(null);
    setNewMemory({ title: '', description: '', image: null });
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    setNewMemory({ ...newMemory, image: e.target.files[0] });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      memories.filter((memory) => memory.title.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, memories]);

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="mb-6 sticky top-0 z-10 p-2 bg-white">
        <input
          type="text"
          placeholder="Search memories..."
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-red-700"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/* Add Memory Card - Moved to top */}
        <div
          onClick={handleModalOpen}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:bg-gray-50 flex items-center justify-center h-[272px]"
        >
          <div className="p-4 text-center">
            <PlusCircle className="w-12 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-gray-500">Add new memory</p>
          </div>
        </div>

        {filteredNotes.length > 0 ? (
          filteredNotes.map((memory) => (
            <div
              key={memory._id}
              className="bg-white rounded-lg shadow-md overflow-hidden group relative"
            >
              <img
                src={memory.image ? `http://localhost:3000/${memory.image}` : '/api/placeholder/300/200'}
                alt={memory.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-500">{memory.date}</p>
                <h3 className="font-medium mt-1">{memory.title}</h3>
              </div>
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(memory)}
                  className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <Edit2 className="w-4 h-4 text-blue-500" />
                </button>
                <button
                  onClick={() => handleDelete(memory._id)}
                  className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center col-span-2">
            
            <p className="text-gray-500">No memories found. Start by adding one!</p>
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <NoteModal
            onSave={isEditing ? handleUpdate : handleAddMemory}
            onClose={() => setIsModalOpen(false)}
            newMemory={newMemory}
            setNewMemory={setNewMemory}
            handleFileChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
};

export default MemoriesGrid;
