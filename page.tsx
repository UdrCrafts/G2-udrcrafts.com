import { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server"; 
import { dehydrate, HdfrationBoundary } from "@tanstack/react-query";

import { ProductsList, <ProductsListSkeleton >} 
 { ProductsListSkeleton } from "@/modules/products/ui/components/ui/product-list";


interface Props {
  params: Promise<{
    subcategory: string;
  }>
};

const Page = async ({params }: Props) => {
  const { category } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({
    category: subcategory,
  }));

  return(
    <HydrationBoundary state={dehydarate(queryClient)}>
      <Suspense fallback={<ProductsListSkeleton />}>  
        <ProductsList category={category} />
    </Suspense>
    </HydrationBoundary>
  );
};


export default Page;