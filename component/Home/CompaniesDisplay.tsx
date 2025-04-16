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

export default function CompaniesDisplay() {
  const [services, setServices] = useState(allServices);
  const [sortBy, setSortBy] = useState('');
  const [filterBy, setFilterBy] = useState('');

  const handleSortChange = (value: string) => {
    setSortBy(value);
    let sortedServices = [...services];
    switch (value) {
      case 'ratings':
        sortedServices.sort((a, b) => b.rating - a.rating);
        break;
      case 'priceLowToHigh':
        sortedServices.sort(
          (a, b) =>
            parseFloat(a.price.replace('RM', '').replace(',', '')) -
            parseFloat(b.price.replace('RM', '').replace(',', ''))
        );
        break;
      case 'priceHighToLow':
        sortedServices.sort(
          (a, b) =>
            parseFloat(b.price.replace('RM', '').replace(',', '')) -
            parseFloat(a.price.replace('RM', '').replace(',', ''))
        );
        break;
      case 'completionTimeFastest':
        sortedServices.sort(
          (a, b) =>
            parseInt(a.completionTime.split('-')[0]) -
            parseInt(b.completionTime.split('-')[0])
        );
        break;
      case 'completionTimeSlowest':
        sortedServices.sort(
          (a, b) =>
            parseInt(b.completionTime.split('-')[0]) -
            parseInt(a.completionTime.split('-')[0])
        );
        break;
      case 'mostClients':
        sortedServices.sort(
          (a, b) =>
            parseInt(b.clients.replace(',', '')) -
            parseInt(a.clients.replace(',', ''))
        );
        break;
      case 'nameAZ':
        sortedServices.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameZA':
        sortedServices.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setServices(sortedServices);
  };

  const handleFilterChange = (value: string) => {
    setFilterBy(value);
    let filteredServices = [...allServices];
    switch (value) {
      case 'types':
        filteredServices = allServices.filter((service) =>
          service.type.includes('Incorporation')
        );
        break;
      case 'priceRange':
        filteredServices = allServices.filter(
          (service) =>
            parseFloat(service.price.replace('RM', '').replace(',', '')) < 2000
        );
        break;
      case 'rating':
        filteredServices = allServices.filter(
          (service) => service.rating >= 4.0
        );
        break;
      case 'deliveryTime':
        filteredServices = allServices.filter(
          (service) => parseInt(service.completionTime.split('-')[0]) <= 5
        );
        break;
      default:
        break;
    }
    setServices(filteredServices);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <h1 className="text-xl md:text-2xl xl:text-4xl font-bold leading-snug">
          Incorporate new company <br className="hidden md:block" />
          <p className="font-normal text-sm">
            OVER 350 Secretaries ready to assist you!
          </p>
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="px-2 py-1 font-bold text-black focus:outline-none focus:ring-0 border-none shadow-none">
              <SelectValue
                placeholder="Sort by: Ratings"
                className="text-black font-bold"
              />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md rounded-md text-black">
              <SelectItem value="ratings">Sort by: Ratings</SelectItem>
              <SelectItem value="priceLowToHigh">
                Sort by: Price (Low to High)
              </SelectItem>
              <SelectItem value="priceHighToLow">
                Sort by: Price (High to Low)
              </SelectItem>
              <SelectItem value="completionTimeFastest">
                Sort by: Completion Time (Fastest)
              </SelectItem>
              <SelectItem value="completionTimeSlowest">
                Sort by: Completion Time (Slowest)
              </SelectItem>
              <SelectItem value="mostClients">Sort by: Most Clients</SelectItem>
              <SelectItem value="nameAZ">Sort by: Name (A-Z)</SelectItem>
              <SelectItem value="nameZA">Sort by: Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterBy} onValueChange={handleFilterChange}>
            <SelectTrigger className="inline-flex items-center gap-2 font-semibold text-black px-3 py-2 rounded-md bg-transparent border-none shadow-none hover:bg-gray-100 transition appearance-none">
              <SelectValue placeholder="Filter" />
              <IoFilterSharp className="text-lg" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md rounded-md text-black">
              <SelectItem value="types">Types</SelectItem>
              <SelectItem value="priceRange">Price Range</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="deliveryTime">Delivery Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            className="flex flex-col h-full p-0 rounded-4xl overflow-hidden"
          >
            <img
              src={service.logo}
              alt={service.name}
              className="w-full object-cover rounded-t-lg"
            />
            <CardHeader>
              <div className="flex flex-col gap-1 m-0">
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

                <p className="text-sm m-0 leading-none">{service.type}</p>
              </div>
            </CardHeader>
            <CardContent className="text-start">
              <p className="text-md font-bold">{service.description}</p>
              <p className="text-sm text-gray-500">
                Complete in {''}
                <span className="font-semibold text-black">
                  {service.completionTime}
                </span>{' '}
                working days
              </p>

              <div className="flex justify-between items-center mt-4">
                <p className="text-lg xl:text-2xl font-bold mt-2">
                  {service.price}
                </p>
                <p className="text-xxs md:text-sm text-gray-500">
                  ({service.clients})
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center space-x-2 mb-4">
              <Button className="text-sm px-4 py-2 bg-[#2a2b2c]">
                Message
              </Button>
              <Button className="text-sm px-4 py-2 bg-[#1e3a8a]">
                Incorporate
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
