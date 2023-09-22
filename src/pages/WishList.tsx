import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetListQuery } from '@/redux/api/apiSlice';

export default function WishList() {
  const { data, isLoading, error } = useGetListQuery(undefined);
  console.log(isLoading, error);
  return (
    <div className="flex justify-center items-center h-[calc(100vh-80px)] gap-10 text-primary">
      <div className="max-w-3xl w-full">
        <h1 className="mb-2">Wish Lists</h1>
        <div className="h-[60vh] border border-gray-300 rounded-md p-10 overflow-auto">
          <Table>
            <TableCaption>A list of your Wish List.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                data?.data?.wishList?.map((list: any, index: any) =>
                <TableRow key={index}>
                <TableCell className="font-medium">{index+1}</TableCell>
                <TableCell>{list.book_name}</TableCell>
                <TableCell>{list.author}</TableCell>
              </TableRow>
                )
              }
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
