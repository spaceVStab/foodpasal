import Image from 'next/image'
import Link from 'next/link'
import { useUser } from '@/utils/useUser'

export const Header = () => {
    const { user, signOut } = useUser();

    return (
        <div className="flex bg-red-500 shadow-xl p-5 justify-around flex-row">
            {/* image */}
            <div className="flex flex-row gap-10">
                <Image 
                    className="rounded-xl"
                    src="/restro.jpg"
                    width={100}
                    height={100}
                />
                {/* shop name */}
                <p className="self-center text-4xl text-white font-semibold">Nepali Khaja Ghar</p>
            </div>
            {/* contact  */}
            <div className="flex flex-row gap-10">
                <div className="flex flex-col gap-1 self-center">
                    <p className="self-center text-white font-medium text-xl">Contact Us</p>
                    <p className="bg-white rounded-full text-center p-2 pl-4 pr-4 border-2 border-black font-semibold self-center">+9779810106632</p>
                </div>
                { !user && 
                <Link href='/login'>
                    <p className="bg-white cursor-pointer rounded-full text-center p-2 pl-4 pr-4 border-2 border-black font-semibold self-center">Login</p>
                </Link>    
                }
                { user && 
                <Link href='/orders'>
                    <p className="bg-white cursor-pointer rounded-full text-center p-2 pl-4 pr-4 border-2 border-black font-semibold self-center">Order History</p>
                </Link>}
                { user && <p onClick={() => signOut()} className="bg-white cursor-pointer rounded-full text-center p-2 pl-4 pr-4 border-2 border-black font-semibold self-center">Logout</p>}
            </div>
            {/* past history */}
            
        </div>
    )
}

export default Header