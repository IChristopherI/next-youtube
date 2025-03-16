import { Button } from '@/ui/button';
import { Category } from '@prisma/client';

interface Props {
  categories: Category[];
  onSelectedCategory: (categoryId:number | null) => void;
}

export const Filter:React.FC<Props>  = ({categories,onSelectedCategory}) => {
  return (
    <div className="flex gap-3 m-4">
      <Button variant={'secondary'} onClick={() => onSelectedCategory(null)} className=" p-3 rounded-md hover:cursor-pointer">Все</Button>
      {categories.map((category) => (
        <div key={category.id}>
          <Button variant={'secondary'} onClick ={() => onSelectedCategory(category.id)}className=" p-3 rounded-md hover:cursor-pointer">{category.name}</Button>
        </div>
      ))}
    </div>
  );
}
