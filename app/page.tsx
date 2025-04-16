import CompaniesDisplay from '@/component/Home/CompaniesDisplay';
import SearchComponent from '@/component/Home/SearchComponent';

export default function Home() {
  return (
    <main>
      <SearchComponent />
      <CompaniesDisplay />
    </main>
  );
}
