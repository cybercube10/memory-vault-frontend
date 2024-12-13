import React from 'react';

const Homer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <div className="h-48 bg-purple-200 relative">
        {/* Profile Picture - Positioned at bottom of banner, overlapping */}
        <div className="absolute -bottom-10 left-10 w-24 h-24 bg-purple-400 rounded-full border-4 border-white">
          {/* Profile picture would go here */}
        </div>
      </div>

      {/* Quote Section */}
      <div className="bg-gray-100 p-4 text-center text-gray-600 italic">
        "The only way to do great work is to love what you do." - Steve Jobs
      </div>

      {/* Main Content - Now full height after banner and quote */}
      <div className="flex gap-4 p-4 h-screen">
        {/* Left Column */}
        <div className="w-1/4 flex flex-col gap-4">
          <div className="bg-red-200 flex-1 rounded-lg shadow-md">
            Left Top
          </div>
          <div className="bg-green flex-1 rounded-lg shadow-md">
            Left Bottom
          </div>
        </div>

        {/* Middle Column - Takes up more space */}
        <div className="w-2/4 flex flex-col gap-4">
          <div className="bg-blue-200 flex-1 rounded-lg shadow-md">
            Middle Top
          </div>
          <div className="bg-blue-300 flex-1 rounded-lg shadow-md">
            Middle Bottom
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/4 flex flex-col gap-4">
          <div className="bg-green-200 flex-1 rounded-lg shadow-md">
            Right Top
          </div>
          <div className="bg-green-300 flex-1 rounded-lg shadow-md">
            Right Bottom
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homer;