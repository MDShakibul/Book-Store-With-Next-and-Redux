import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DatePickerWithPresets } from '@/components/ui/datePickerWithPreset';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAddBookMutation } from '@/redux/api/apiSlice';
import { useNavigate } from 'react-router-dom';


export default function AddBook() {
  const { toast } = useToast();
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate:''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setBookInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handleDateChange = (dateValue: string) => {
    setBookInfo((prevInfo) => ({
      ...prevInfo,
      publicationDate: dateValue, // Use the dateValue received from the DatePicker
    }));
  };
  const navigate = useNavigate();
  const [addBook, options] = useAddBookMutation();
  console.log(options);
  const handleSubmit = async() => {
    if (bookInfo.title.trim() === '' || bookInfo.author.trim() === '' || bookInfo.genre.trim() === '' || bookInfo.publicationDate.trim() === '') {
      toast({
        variant: "destructive",
        title: 'Error',
        description: 'Please fill in all fields.'
      });
      return;
    }

    const value = {
      data: { title: bookInfo.title, author:bookInfo.author, genre:bookInfo.genre, publicationDate:bookInfo.publicationDate },
    };

    const response = await addBook(value);
    
    if ('data' in response) {
      toast({
        title: 'Success',
        description: "New Book Add Successfully",
      });
      navigate('/books')

      
      
    } else if ('error' in response) {
      console.log(response);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: "Something went wrong",
      });
    }
  };



  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
      <div className="max-w-3xl w-full">
        <h1 className="mb-2">Book Information</h1>
        <div className="h-[350px] border border-gray-300 rounded-md p-10 overflow-auto">
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="title">Book Title</Label>
                <Input type="text" id="title" className="mt-2" onChange={handleInputChange}/>
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input type="text" id="author" className="mt-2" onChange={handleInputChange}/>
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="genre">Genre</Label>
                <Input type="text" id="genre" className="mt-2" onChange={handleInputChange}/>
              </div>
              <div className="w-full flex flex-col mt-">
                <Label className="mb-4" htmlFor="name">
                  Publication Date
                </Label>
                <DatePickerWithPresets
                  onChange={handleDateChange}
                  id="publicationDate"
                  value={bookInfo.publicationDate}
                />
              </div>
            </div>
          </div>
          <div className='mt-8 text-center'>

          <Button className="mt-5 bg-primary text-white py-2 px-4 rounded-md"
          onClick={handleSubmit}>Add Book</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
