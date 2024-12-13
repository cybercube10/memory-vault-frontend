import React, { useState } from 'react';
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import {  FaTrashAlt } from 'react-icons/fa';
import { FaAngleUp } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CiLink } from "react-icons/ci";

const predefinedIcons = {
  Instagram: <FaInstagram />,
  Email: <SiGmail />,
  LinkedIn: <FaLinkedin />,
  GitHub: <FaGithub />,
  YouTube: <FaYoutube />,
  Others: <CiLink />
};

const FavoriteSites = () => {
  const [url, setUrl] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [sites, setSites] = useState(() => {
    return JSON.parse(localStorage.getItem('favoriteSites')) || [];
  });
  const [isAdding, setIsAdding] = useState(false);

  // Max limit for favorite sites
  const MAX_SITES = 3;

  const handleAddSite = () => {
    if (!url || !selectedIcon) return;
    
    // Check if user already has 3 sites
    if (sites.length >= MAX_SITES) {
      alert(`You can only add up to ${MAX_SITES} sites.`);
      return;
    }

    const newSite = { url, icon: selectedIcon };
    const updatedSites = [...sites, newSite];
    setSites(updatedSites);
    localStorage.setItem('favoriteSites', JSON.stringify(updatedSites));
    setUrl('');
    setSelectedIcon('');
    setIsAdding(false); // Close the collapsible section after adding
  };

  const handleDeleteSite = (index) => {
    const updatedSites = sites.filter((_, i) => i !== index);
    setSites(updatedSites);
    localStorage.setItem('favoriteSites', JSON.stringify(updatedSites));
  };

  return (
    <div className="w-full mt-4">
      

      {/* Collapsible Add Icon Section */}
      <button
  className="bg-[#BA0021]  font-light italic text-gray-900 italic px-1  w-full text-left flex items-center"
  onClick={() => setIsAdding(!isAdding)}
>
  <span>quick links</span>
  <span className="ml-2">
    {isAdding ? <FaAngleUp /> : <FaAngleDown />}
  </span>
</button>

      {isAdding && (
        <div className="mt-4 p-4 border rounded-md bg-gray-50">
          {/* URL Input */}
          <input
            type="text"
            placeholder="Enter URL"
            className="p-2 border rounded-md w-full mb-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          {/* Icon Selector */}
          <select
            className="p-2 border rounded-md w-full mb-2"
            value={selectedIcon}
            onChange={(e) => setSelectedIcon(e.target.value)}
          >
            <option value="">Select Icon</option>
            {Object.keys(predefinedIcons).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>

          {/* Add Button */}
          <button
            onClick={handleAddSite}
            className="bg-gray-900 text-white p-2 rounded-md w-full"
          >
            Add
          </button>
        </div>
      )}

      {/* Sites List */}
      <ul className=" mt-4">
        {sites.map((site, index) => (
          <li
            key={index}
            className="flex items-center border border-black justify-around px-1 text-center"
          >
            {/* Icon */}
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              {predefinedIcons[site.icon]} {/* Render the selected icon */}
            </a>
            {/* Delete Button */}
            <button
              onClick={() => handleDeleteSite(index)}
              className=" text-red-600 p-1 rounded-md text-sm"
            >
              <RxCross2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteSites;
