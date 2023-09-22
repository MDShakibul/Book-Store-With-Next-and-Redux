import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import defaulBook from '@/assets/images/default_book.png';
import { Delete, Edit, List, Save } from 'lucide-react';
import Swal from 'sweetalert2';
import {
  useAddRunningListMutation,
  useAddWishListMutation,
  useDeleteBookMutation,
  useGetSingleBooksQuery,
  useIsCompletedMutation,
} from '@/redux/api/apiSlice';
import { certificateDate } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading, error } = useGetSingleBooksQuery(id);
  const [deleteBook, options] = useDeleteBookMutation();
  const [addWiseList, optionsWishList] = useAddWishListMutation();
  const [addContinueList, optionsContinueList] = useAddRunningListMutation();
  const [completed, optionsCompleteList] = useIsCompletedMutation();


  const { toast } = useToast();
  console.log(options, isLoading, error, optionsWishList, optionsContinueList, optionsCompleteList);
  const handelWishList = async () => {
    const response = await addWiseList(id);

    if ('data' in response) {
      toast({
        title: 'Success',
        description: 'This book add in wishlist',
      });
    } else if ('error' in response) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'This book already exist in you wish list',
      });
    }
  };
  const handelRunningList = async () => {
    const response = await addContinueList(id);

    if ('data' in response) {
      toast({
        title: 'Success',
        description: 'This book add in your Running List',
      });
    } else if ('error' in response) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'This book already exist in you Running List',
      });
    }
  };

  const handelComplete = async () => {
    const response = await completed(id);

    if ('data' in response) {
      toast({
        title: 'Success',
        description: 'Great you complete this book',
      });
    } else if ('error' in response) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Already completed',
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(id);
        deleteBook(id);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        navigate('/books');
      }
    });
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[40%]">
          <img src={defaulBook} alt="" />
        </div>
        <div className="w-[40%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.data?.title}</h1>
          <p className="text-xl">Author: {book?.data?.author}</p>
          <p className="text-xl">Genre: {book?.data?.genre}</p>
          <p className="text-xl">
            Publication Date: {certificateDate(book?.data?.publicationDate)}
          </p>
        </div>
        <div className="w-[20%] space-y-3 flex-row">
          {book?.data?.isOwner && (
            <>
              <Link to={`/edit-book/${book?.data?._id}`}>
                <Button className="flex">
                  <div className="flex items-center">
                    <Edit className="mr-2 h-3 w-3" /> Edit
                  </div>
                </Button>
              </Link>
              <Button
                className="flex"
                variant="destructive"
                onClick={handleDelete}
              >
                <div className="flex items-center">
                  <Delete className="mr-2 h-3 w-3" /> Delete
                </div>
              </Button>
            </>
          )}
          <Button className="flex" variant="outline" onClick={handelWishList}>
            <div className="flex items-center">
              <List className="mr-2 h-3 w-3" /> Add Wish List
            </div>
          </Button>
          <Button
            className="flex"
            variant="secondary"
            onClick={handelRunningList}
          >
            <div className="flex items-center">
              <List className="mr-2 h-3 w-3" /> Add Running List
            </div>
          </Button>
          {book?.data?.isComplete ? (
           <Badge variant="destructive">Completed</Badge>
          ) : (
            <Button className="flex" variant="link" onClick={handelComplete}>
              <div className="flex items-center">
                <Save className="mr-2 h-3 w-3" /> Complete
              </div>
            </Button>
          )}
        </div>
      </div>
      <BookReview id={id!} reviews={book?.data?.review} />
    </>
  );
}
