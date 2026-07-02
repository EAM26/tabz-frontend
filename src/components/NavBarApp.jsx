function NavBarApp() {
    return (
        <div className="flex items-center bg-[#15472c] px-5 py-4">
            <button>
                <img className="size-9" src="/square-menu.svg" alt="menu"/>
            </button>

            <div className="ml-5 flex items-center gap-0">
                <img
                    className="size-12"
                    src="/tabz-logo.svg"
                    alt="TABZ logo"
                />

                <h2 className="mt-2 text-xl font-semibold text-white font-montserrat">
                    TABZ
                </h2>
            </div>

            <img
                className="ml-auto size-8"
                src="/user-wh.svg"
                alt="userlogo"
            />
        </div>
    );
}

export default NavBarApp;