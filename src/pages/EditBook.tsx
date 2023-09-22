import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DatePickerWithPresets } from '@/components/ui/datePickerWithPreset';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the "id" parameter from the URL
import { useGetSingleBooksQuery, useUpdateBookMutation } from '@/redux/api/apiSlice';
import { calenderDate } from '@/lib/utils';

export default function EditBook() {
  const { id } = useParams(); // Get the "id" parameter from the URL
  const { toast } = useToast();
  const [bookInfo, setBookInfo] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
  });
  const [editableValue, setEditableValue] = useState(true);
  const { data: book, isLoading, error } = useGetSingleBooksQuery(id);
  console.log(isLoading, error );
  if(book && editableValue){
    setBookInfo({
      title: book?.data?.title,
      author: book?.data?.author,
      genre: book?.data?.genre,
      publicationDate: calenderDate(book?.data?.publicationDate)
    });
    setEditableValue(false)
  }

  const navigate = useNavigate()
  


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
      publicationDate: dateValue,
    }));
  };

  const [updateBook, options] = useUpdateBookMutation();
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
      id: id,
      data: { title: bookInfo.title, author:bookInfo.author, genre:bookInfo.genre, publicationDate:bookInfo.publicationDate },
    };

    const response = await updateBook(value);

    if ('data' in response) {
      toast({
        title: 'Success',
        description: "Book updated successfully",
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
    
    toast({
      title: 'Success',
      description: 'Book updated successfully.',
    });
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
      <div className="max-w-3xl w-full">
        <h1 className="mb-2">Edit Book Information</h1>
        <div className="h-[350px] border border-gray-300 rounded-md p-10 overflow-auto">
          <div className="flex gap-5">
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="book_title">Book Title</Label>
                <Input
                  type="text"
                  id="title"
                  className="mt-2"
                  onChange={handleInputChange}
                  value={bookInfo.title}
                />
              </div>
              <div>
                <Label htmlFor="author">Author</Label>
                <Input
                  type="text"
                  id="author"
                  className="mt-2"
                  onChange={handleInputChange}
                  value={bookInfo.author}
                />
              </div>
            </div>
            <div className="w-full space-y-5">
              <div>
                <Label htmlFor="genre">Genre</Label>
                <Input
                  type="text"
                  id="genre"
                  className="mt-2"
                  onChange={handleInputChange}
                  value={bookInfo.genre}
                />
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
          <div className="mt-8 text-center">
            <Button
              className="mt-5 bg-primary text-white py-2 px-4 rounded-md"
              onClick={handleSubmit}
            >
              Update Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
