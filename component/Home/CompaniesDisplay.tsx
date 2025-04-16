import { Button } from '@/components/ui/button';
import { services } from '@/app/data/Data';
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
          <Select>
            <SelectTrigger className="border rounded px-2 py-1">
              <SelectValue placeholder="Sort by: Ratings" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-md rounded-md">
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
          <Button variant="ghost" className="font-semibold">
            Filter
            <IoFilterSharp />
          </Button>
        </div>
      </div>

      {/* Grid of Cards */}
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
                    <span className="mr-2 text-sm font-bold">
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
                Complete in
                <span className="font-semibold text-black">
                  {service.completionTime}
                </span>
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
