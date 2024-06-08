import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddContact from './AddContact';
import EditContactModal from './EditContactModal';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = '/login';
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsEditing(true);
  };

  const handleDelete = async (contactId) => {
    const authToken = localStorage.getItem("authToken");
    const confirmed = window.confirm("Are you sure you want to delete this contact?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5001/api/contacts/${contactId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`
        },
      });

      if (response.ok) {
        alert("Deleted Successfully");
        fetchContacts();
      } else {
        console.error("Could not delete :(");
      }
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  const fetchContacts = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5001/api/contacts', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      setContacts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while fetching contacts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">ThugLifeLine</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Search gangstas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mr-2"
          />
          <button onClick={() => setSearchQuery("")} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600'>Clear</button>
        </div>
        <button
          onClick={() => {
            setSelectedContact({});
            setIsEditing(false);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Contact
        </button>
      </div>
      <ul className="space-y-4">
        {filteredContacts.length === 0 && <div className="text-gray-600">No Contacts</div>}
        {filteredContacts.map(contact => (
          <li key={contact._id} className="flex justify-between items-center bg-gray-100 p-4 rounded shadow">
            <div>
              <p className="font-semibold border-b border-gray-300 pb-2">Name: {contact.name}</p>
              <p className="border-b border-gray-300 pb-2">Email: {contact.email}</p>
              <p>Phone: {contact.phone}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleDelete(contact._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(contact)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <Link to="/">
          <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">
            Logout
          </button>
        </Link>
      </div>
      {selectedContact && (
        <EditContactModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onSubmit={fetchContacts}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default Contacts;
