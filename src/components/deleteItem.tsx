import { Button } from '@/ui/button';
import React from 'react';
import { useItem } from '../hooks/use-item';
interface Props {
    id: number;
}
const DeleteItem: React.FC<Props> = ({id}) => {
const {removeItem} = useItem()

  return (
   <Button variant={"outline"} onClick={() => removeItem(id)}>Удалить видео</Button>
  );
};

export default DeleteItem;