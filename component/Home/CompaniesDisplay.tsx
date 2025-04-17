'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star } from 'lucide-react';
import { IoFilterSharp } from 'react-icons/io5';

interface CompaniesDisplayProps {
  services: {
    logo: string;
    name: string;
    rating: number;
    type: string;
    description: string;
    completionTime: string;
    price: string;
    clients: string;
    region: string;
    dateOfCompletion: string;
  }[];
}

export default function CompaniesDisplay({ services }: CompaniesDisplayProps) {
  const [displayedServices, setDisplayedServices] = useState(services);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [currentCompany, setCurrentCompany] = useState('');

  const parsePrice = (price: string) =>
    parseFloat(price.replace('RM', '').replace(',', ''));

  const parseClients = (clients: string) => parseInt(clients.replace(',', ''));

  const parseDays = (completionTime: string) =>
    parseInt(completionTime.split('-')[0]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sorted = [...displayedServices];

    switch (value) {
      case 'ratings':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'priceLowToHigh':
        sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'priceHighToLow':
        sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'completionTimeFastest':
        sorted.sort(
          (a, b) => parseDays(a.completionTime) - parseDays(b.completionTime)
        );
        break;
      case 'completionTimeSlowest':
        sorted.sort(
          (a, b) => parseDays(b.completionTime) - parseDays(a.completionTime)
        );
        break;
      case 'mostClients':
        sorted.sort(
          (a, b) => parseClients(b.clients) - parseClients(a.clients)
        );
        break;
      case 'nameAZ':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZA':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setDisplayedServices(sorted);
  };

  const handleFilterChange = (value: string) => {
    setFilterBy(value);
    let filtered = [...services];

    switch (value) {
      case 'types':
        filtered = filtered.filter((service) =>
          service.type.includes('Incorporation')
        );
        break;
      case 'priceRange':
        filtered = filtered.filter(
          (service) => parsePrice(service.price) < 2000
        );
        break;
      case 'rating':
        filtered = filtered.filter((service) => service.rating >= 4.0);
        break;
      case 'deliveryTime':
        filtered = filtered.filter(
          (service) => parseDays(service.completionTime) <= 5
        );
        break;
      default:
        break;
    }

    setDisplayedServices(filtered);
    setSortBy('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold leading-snug">
            Incorporate new company
          </h1>
          <p className="font-normal text-sm text-gray-600">
            OVER 350 Secretaries ready to assist you!
          </p>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="px-2 py-1 font-bold text-black border-none shadow-none">
              <SelectValue placeholder="Sort by: Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ratings">Ratings</SelectItem>
              <SelectItem value="priceLowToHigh">
                Price (Low to High)
              </SelectItem>
              <SelectItem value="priceHighToLow">
                Price (High to Low)
              </SelectItem>
              <SelectItem value="completionTimeFastest">
                Fastest Completion
              </SelectItem>
              <SelectItem value="completionTimeSlowest">
                Slowest Completion
              </SelectItem>
              <SelectItem value="mostClients">Most Clients</SelectItem>
              <SelectItem value="nameAZ">Name (A-Z)</SelectItem>
              <SelectItem value="nameZA">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterBy} onValueChange={handleFilterChange}>
            <SelectTrigger className="inline-flex items-center gap-2 font-semibold text-black px-3 py-2 rounded-md hover:bg-gray-100 border-none shadow-none">
              <SelectValue placeholder="Filter" />
              <IoFilterSharp className="text-lg" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="types">Types</SelectItem>
              <SelectItem value="priceRange">Price Range</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="deliveryTime">Delivery Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {displayedServices.length === 0 ? (
        <div className="text-center text-gray-500">
          No services match your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedServices.map((service, index) => (
            <Card
              key={index}
              className="flex flex-col h-full p-0 rounded-4xl overflow-hidden"
            >
              <img
                src={service.logo}
                alt={service.name || 'Company Logo'}
                className="w-full object-cover rounded-t-lg"
              />

              <div className="flex flex-col flex-1 justify-between">
                <CardHeader>
                  <div className="flex flex-col gap-1 mb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-start text-base md:text-lg">
                        {service.name}
                      </CardTitle>
                      <div className="flex items-center">
                        <span className="mr-2 text-sm text-[#1e3a8a] font-bold">
                          {service.rating}
                        </span>
                        <Star className="w-5 h-5 text-[#1e3a8a] fill-current" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{service.type}</p>
                  </div>
                </CardHeader>

                <CardContent className="text-start flex-1 flex flex-col justify-between">
                  <p className="text-md font-bold mb-4 line-clamp-4">
                    {service.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-auto">
                    Complete in{' '}
                    <span className="font-semibold text-black">
                      {service.completionTime}
                    </span>{' '}
                    working days
                  </p>
                </CardContent>

                <div className="flex justify-between items-center px-6 mt-2 mb-8">
                  <p className="text-sm xl:text-2xl font-bold">
                    {service.price}
                  </p>
                  <p className="text-sm text-gray-500">({service.clients})</p>
                </div>

                <CardFooter className="flex justify-between space-x-2 mt-auto mb-4 w-full px-6">
                  <Button
                    className="md:text-xs xl:text-sm px-4 py-2 xl:px-6 xl:py-6 bg-[#2a2b2c] rounded-full w-[50%] hover:bg-[#393a3b] transition"
                    onClick={() => {
                      setCurrentCompany(service.name);
                      setShowChat(true);
                    }}
                  >
                    Message
                  </Button>
                  <Button
                    className="md:text-xs xl:text-sm px-4 py-2  bg-[#1e3a8a] xl:px-6 xl:py-6 rounded-full w-[50%] hover:bg-[#002255] transition"
                    onClick={() => setShowCard(true)}
                  >
                    Incorporate
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Card Popup */}
      {showCard && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowCard(false)}
              className="absolute top-3 right-4 text-black text-xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Incorporate Your Company
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Company Name"
                className="border p-2 rounded"
              />
              <select className="border p-2 rounded">
                <option value="">Business Type</option>
                <option value="sdn-bhd">Sdn Bhd</option>
                <option value="sole">Sole Proprietor</option>
                <option value="partnership">Partnership</option>
              </select>
              <input
                type="text"
                placeholder="Director Name"
                className="border p-2 rounded"
              />
              <input
                type="text"
                placeholder="Address"
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-[#003366] text-white py-2 rounded cursor-pointer hover:bg-[#002255] transition duration-300 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Chat Popup */}
      {showChat && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-xl shadow-lg p-4 w-full max-w-md relative flex flex-col">
            <button
              onClick={() => setShowChat(false)}
              className="absolute top-3 right-4 text-black text-xl font-bold cursor-pointer"
            >
              &times;
            </button>

            <h2 className="text-lg font-semibold mb-4">
              Chat with {currentCompany}
            </h2>

            <div className="flex-1 overflow-y-auto border p-4 rounded mb-4 space-y-2 bg-gray-50 text-sm max-h-[300px]">
              <div className="text-right">
                <p className="inline-block bg-blue-500 text-white p-2 rounded-lg">
                  Hi, I’m interested in your services.
                </p>
              </div>
              <div className="text-left">
                <p className="inline-block bg-gray-200 text-black p-2 rounded-lg">
                  Hi there! Thanks for reaching out. How can we assist you?
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border p-2 rounded"
              />
              <button className="bg-[#1e3a8a] text-white px-4 py-2 rounded hover:bg-[#002255] transition">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
