import Link from "next/link";
import { useUser } from "@/utils/useUser";

export const HeaderMob = () => {
    const { user, signOut } = useUser();

    return (
        <div className="flex flex-col">
            <div className="flex flex-row m-2 justify-between p-0.5">
                <p className="border-2 border-red-500 rounded-full text-lg pl-3 pr-3">Call Us</p>
                <Link href='/orders'>
                    <p className="border-2 border-red-500 rounded-full text-lg pl-3 pr-3">Order History</p>
                </Link>
                { user && <p onClick={() => signOut()} className="border-2 border-red-500 rounded-full text-lg pl-3 pr-3">Logout</p>}
            </div>
            <p className="self-center text-2xl font-medium">Nepali Khaja Ghar</p>
            <div className="max-h-40 overflow-hidden">
                <img
                    src="/restro.jpg"
                />
            </div>
        </div>
    )
}

export default HeaderMob;