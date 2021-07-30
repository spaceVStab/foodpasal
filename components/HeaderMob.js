export const HeaderMob = () => {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <p>Call Us</p>
                <p>Order History</p>
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