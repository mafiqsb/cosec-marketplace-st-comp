'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { services as allServices } from '@/app/data/Data';
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
  const [displayedServices, setDisplayedServices] = useState(allServices);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');

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
    let filtered = [...allServices];

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

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
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

              <div className="flex flex-col flex-grow justify-between">
                <CardHeader>
                  <div className="flex flex-col gap-1 mb-6">
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

                <CardContent className="text-start flex-grow">
                  <p className="text-md font-bold mb-6">
                    {service.description}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Complete in{' '}
                    <span className="font-semibold text-black">
                      {service.completionTime}
                    </span>{' '}
                    working days
                  </p>
                </CardContent>

                <div className="flex justify-between items-center px-6 mt-auto mb-4">
                  <p className="text-lg xl:text-2xl font-bold">
                    {service.price}
                  </p>
                  <p className="text-sm text-gray-500">({service.clients})</p>
                </div>

                <CardFooter className="flex justify-between space-x-2 mt-4 mb-4 w-full px-6">
                  <Button className="text-sm px-4 py-2 bg-[#2a2b2c] rounded-full w-[50%]">
                    Message
                  </Button>
                  <Button className="text-sm px-4 py-2 bg-[#1e3a8a] rounded-full w-[50%]">
                    Incorporate
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
