/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePostCommentMutation } from '@/redux/api/apiSlice';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { ChangeEvent, FormEvent, useState } from 'react';
import { certificateDate } from '@/lib/utils';



interface IProps {
  id: string;
  reviews: string[];
}

export default function ProductReview({ id, reviews }: IProps) {
  const [inputValue, setInputValue] = useState<string>('');
  const [postComment, options] =
  usePostCommentMutation();
  console.log(options);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(inputValue);

    const value = {
      id: id,
      data: { body: inputValue },
    };

    postComment(value);
    setInputValue('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>

      <div className="mt-10">
        {reviews?.length > 0 && reviews.map((comment: any, index) => (
          <div key={index} className="gap-3 items-center mb-5">
            <div className="flex gap-3 items-center mb-1">
              <h1 className="text-md font-semibold">{comment?.userEmail as string}</h1>
              <p>{certificateDate(comment?.createdAt)}</p>
            </div>
            <p>{comment?.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
