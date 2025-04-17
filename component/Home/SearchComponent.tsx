'use client';

import React, { useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { companyTypes, regions } from '@/app/data/Data';

import { Calendar } from '@/components/ui/calendar';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export interface SearchFilters {
  companyType: string;
  region: string;
  dateOfCompletion: string;
}

interface SearchComponentProps {
  filters: SearchFilters;
  onSearch: React.Dispatch<React.SetStateAction<SearchFilters>>;
}

export default function SearchComponent({
  filters,
  onSearch,
}: SearchComponentProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onSearch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setShowCalendar(false);

    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      onSearch((prev) => ({
        ...prev,
        dateOfCompletion: formattedDate,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search Filters:', filters);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-[95%] xl:w-[58%] bg-white rounded-2xl md:rounded-full border shadow-lg xl:pl-18 p-4 xl:p-0 xl:pr-2 xl:pt-2 xl:pb-2 flex flex-col"
      >
        <div className="flex flex-col md:flex-row gap-4 md:items-end relative w-full">
          {/* Company Type */}
          <div className="flex flex-col items-start w-full">
            <label className="font-medium md:text-sm xl:text-base">
              Company Type
            </label>
            <Select
              value={filters.companyType}
              onValueChange={(value) =>
                onSearch((prev) => ({ ...prev, companyType: value }))
              }
            >
              <SelectTrigger className="w-full max-w-xs bg-transparent px-0 py-2 shadow-none border-none ring-0 focus:ring-0 focus:outline-none">
                <SelectValue placeholder="Select company type" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-md rounded-md">
                {companyTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="hidden xl:block w-0.5 h-18 bg-[#1e3a8a] mx-2" />

          {/* Region */}
          <div className="flex flex-col items-start xl:items-start w-full">
            <label className="font-medium md:text-sm xl:text-base">
              Region
            </label>
            <Select
              value={filters.region}
              onValueChange={(value) =>
                onSearch((prev) => ({ ...prev, region: value }))
              }
            >
              <SelectTrigger className="w-full max-w-xs bg-transparent px-0 py-2 shadow-none border-none ring-0 focus:ring-0 focus:outline-none">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-md rounded-md">
                {regions.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="hidden xl:block w-0.5 h-18 bg-[#1e3a8a] mx-2" />

          {/* Date of Completion */}
          <div className="flex flex-col w-full items-start xl:items-start relative">
            <label className="font-medium md:text-sm xl:text-base ">
              Date of Completion
            </label>
            <Input
              type="text"
              name="dateOfCompletion"
              value={filters.dateOfCompletion}
              onChange={handleChange}
              onFocus={() => setShowCalendar(true)}
              placeholder="17th Feb (3 Days)"
              className="bg-transparent max-w-xs shadow-none border-none ring-0 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
            />
            {showCalendar && (
              <div className="absolute top-full z-10 mt-2 bg-white border rounded-md shadow-md">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  className="rounded-md"
                />
              </div>
            )}
          </div>

          <div className="flex w-full justify-center xl:justify-end items-center">
            <button
              type="submit"
              className="w-full md:w-auto bg-[#1e3a8a] text-white rounded-2xl md:rounded-full px-6 py-4 xl:px-10 xl:py-6 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
            >
              <PiMagnifyingGlass className="text-lg" />
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
