import Image from 'next/image'

export const Header = () => {
    return (
        <div className="flex bg-red-500 p-5 justify-evenly flex-row">
            {/* image */}
            <div className="flex flex-row gap-10">
                <Image 
                    className="rounded-xl"
                    src="/logo.png"
                    width={100}
                    height={100}
                />
                {/* shop name */}
                <p className="self-center text-4xl text-white font-semibold">Tama Foods</p>
            </div>
            {/* contact  */}
            <div className="flex flex-col gap-1 self-center">
                <p className="self-center text-white font-medium text-xl">Contact Us</p>
                <p className="bg-white rounded-full text-center p-2 pl-4 pr-4 border-2 border-black font-semibold self-center">+9779810106632</p>
            </div>
            {/* past history */}
            <p className="bg-white rounded-full text-center p-2 pl-4 pr-4 border-2 border-black font-semibold self-center">Order History</p>
        </div>
    )
}

export default Header