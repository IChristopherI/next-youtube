  
import { prisma } from '@/prisma/prisma-client';

export default async function Filter() {
  const categories = await prisma.category.findMany();

  return (
    <div className="flex gap-3 m-4">
      {categories.map((category) => (
        <div key={category.id}>
          <p className="bg-gray-100 p-1 rounded-md hover:cursor-pointer">{category.name}</p>
        </div>
      ))}
    </div>
  );
}
