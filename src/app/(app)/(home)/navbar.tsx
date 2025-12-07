import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
export const Navbar = () => {
    const trpc = useTRPC();
    const session = useQuery(trpc.auth.session.queryOptions());

    {
        session.data?.user ? (
            <div className="hidden lg:flex">
                <Button
                    asChild
                    className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
                >
                    <Link href="/admin">
                        Dashboard
                    </Link>
                </Button>
            </div>
        ) : (
            
            )
    }


}
