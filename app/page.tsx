'use client';

import { useState } from 'react';
import { services as allServices } from './data/Data';
import SearchComponent from '@/component/Home/SearchComponent';
import CompaniesDisplay from '@/component/Home/CompaniesDisplay';

interface SearchFilters {
  companyType: string;
  region: string;
  dateOfCompletion: string;
}

export default function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    companyType: '',
    region: '',
    dateOfCompletion: '',
  });

  const filteredServices = allServices.filter((service) => {
    return (
      service.type.toLowerCase().includes(filters.companyType.toLowerCase()) &&
      service.region.toLowerCase().includes(filters.region.toLowerCase()) &&
      service.dateOfCompletion
        .toLowerCase()
        .includes(filters.dateOfCompletion.toLowerCase())
    );
  });

  return (
    <main className="p-6 space-y-8">
      <SearchComponent filters={filters} onSearch={setFilters} />
      <CompaniesDisplay services={filteredServices} />
    </main>
  );
}
