import {useAuth } from "../context/AuthContext.jsx";

function NavBarApp() {

    const { isLoggedIn, logout } = useAuth();

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
            <div className="ml-auto flex items-center gap-3">
                {isLoggedIn && (
                    <button className="text-white text-sm" type="button" onClick={logout}>
                        Log out
                    </button>
                )}
                <button type="button" onClick={()=> console.log("profile button clicked.")}>
                    <img className="size-8" src="/user-wh.svg" alt="userlogo" />
                </button>
            </div>
        </div>
    );
}

export default NavBarApp;