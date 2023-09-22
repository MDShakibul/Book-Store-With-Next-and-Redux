import BookCard from '@/components/BookCard';
import { IBook } from '@/types/globalTypes';
import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePickerWithPresets } from '@/components/ui/datePickerWithPreset';
import { Button } from '@/components/ui/button';
import { useGetAllBooksQuery } from '@/redux/api/apiSlice';

export default function Products() {
/*   const [data, setData] = useState<IBook[]>([]);
  useEffect(() => {
    fetch('./data.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []); */

  const [searchInfo, setSearchInfo] = useState({
    searchTerm: '',
    genre: '',
    publicationYear: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handleDateChange = (dateValue: string) => {
    setSearchInfo((prevInfo) => ({
      ...prevInfo,
      publicationYear: dateValue,
    }));
  };


  const { data, isLoading, error, refetch } = useGetAllBooksQuery(searchInfo);
  console.log(isLoading, error);

  // Call the query hook whenever the component mounts
  const handleSubmit = () => {
    refetch();
    console.log('adas');
  };

  return (
    <div className="container">
      <div className="flex gap-5 my-5 mx-12">
        <div className="w-full">
          <Label htmlFor="searchTerm">Search Item</Label>
          <Input
            type="text"
            id="searchTerm"
            className="mt-3"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <Label htmlFor="genre">Genre</Label>
          <Input
            type="text"
            id="genre"
            className="mt-3"
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full flex flex-col mt-2">
          <Label className="mb-3" htmlFor="name">
            Date
          </Label>
          <DatePickerWithPresets
                  onChange={handleDateChange}
                  id="publicationDate"
                  value={searchInfo.publicationYear}
                />
        </div>
      </div>
      <div className="text-end mb-8 mx-12">
        <Button onClick={handleSubmit} >Search</Button>
      </div>
      <div className="container grid grid-cols-4 gap-12 pb-20">
        {data?.data?.map((book: IBook, index: number) => (
          <BookCard book={book} key={index}/>
        ))}
      </div>
    </div>
  );
}
