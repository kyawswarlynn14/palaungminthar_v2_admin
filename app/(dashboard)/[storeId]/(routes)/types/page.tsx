import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { TypeColumn } from "./components/columns"
import { TypesClient } from "./components/client";

const TypesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const types = await prismadb.type.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedTypes: TypeColumn[] = types.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TypesClient data={formattedTypes} />
      </div>
    </div>
  );
};

export default TypesPage;