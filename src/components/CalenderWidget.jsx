import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalenderWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const days = ['S', 'M', 'T', 'W', 'Th', 'F', 'S'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayIndex = firstDay.getDay();
    
    return { daysInMonth, startingDayIndex };
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (year, month, day) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
  };

  const isSelected = (year, month, day) => {
    return selectedDate?.getDate() === day && 
           selectedDate?.getMonth() === month && 
           selectedDate?.getFullYear() === year;
  };

  const generateDays = () => {
    const { daysInMonth, startingDayIndex } = getDaysInMonth(currentDate);
    const days = [];
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    // Previous month days
    const prevMonth = new Date(currentYear, currentMonth - 1);
    const prevMonthDays = getDaysInMonth(prevMonth).daysInMonth;
    for (let i = 0; i < startingDayIndex; i++) {
      const day = prevMonthDays - startingDayIndex + i + 1;
      days.push(
        <button
          key={`prev-${i}`}
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth - 1, day))}
          className="text-gray-400 h-8 flex items-center justify-center text-sm hover:bg-gray-100 transition-colors border-r border-b border-gray-200 last:border-r-0"
        >
          {day}
        </button>
      );
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const isCurrentDay = isToday(currentYear, currentMonth, i);
      const isSelectedDay = isSelected(currentYear, currentMonth, i);
      
      days.push(
        <button
          key={`current-${i}`}
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth, i))}
          className={`h-8 flex items-center justify-center text-sm transition-colors border-r border-b border-gray-200 last:border-r-0
            ${isCurrentDay ? 'bg-blue-50 text-blue-800' : ''}
            ${isSelectedDay ? 'bg-red-50 text-red-800' : ''}
            ${!isCurrentDay && !isSelectedDay ? 'hover:bg-gray-100' : ''}
          `}
        >
          {i}
        </button>
      );
    }
    
    // Next month days
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <button
          key={`next-${i}`}
          onClick={() => setSelectedDate(new Date(currentYear, currentMonth + 1, i))}
          className="text-gray-400 h-8 flex items-center justify-center text-sm hover:bg-gray-100 transition-colors border-r border-b border-gray-200 last:border-r-0"
        >
          {i}
        </button>
      );
    }
    
    return days;
  };

  return (
    <div className="w-64 bg-black rounded-lg p-4 shadow-sm">
      <div className="flex justify-between text-white items-center mb-4">
        <div className="text-lg font-medium">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={goToPreviousMonth}
            className="p-1 hover:text-red-600 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button 
            onClick={goToNextMonth}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded">
        <div className="grid grid-cols-7">
          {days.map(day => (
            <div key={day} className="text-center text-sm text-white font-medium p-2 border-r border-b border-gray-200 last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        <div className="grid text-white  grid-cols-7">
          {generateDays()}
        </div>
      </div>
    </div>
  );
};

export default CalenderWidget;