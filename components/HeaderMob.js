export const HeaderMob = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between p-0.5">
                <p className="border-2 border-red-500 rounded-full text-lg pl-3 pr-3">Call Us</p>
                <p className="border-2 border-red-500 rounded-full text-lg pl-3 pr-3">Order History</p>
            </div>
            <div className="max-h-40 overflow-hidden">
                <img
                    src="/logo.png"
                />
            </div>
            <p className="self-center">Tama Foods</p>
        </div>
    )
}

export default HeaderMob;