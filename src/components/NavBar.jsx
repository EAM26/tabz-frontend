function NavBar() {
    return (
        <div className="flex bg-[#15472c] py-4">
            {/*<button className="pl-5">*/}
            {/*    <img className="size-9" src="/square-menu.svg" alt="menu"/>*/}
            {/*</button>*/}
            <img className="pl-4 size-22" src="/tabz-logo.svg" alt="tabzlogo"/>
            <h1 className="pl-1 pt-8 text-white font-montserrat font-semibold text-2xl">TABZ</h1>
            <img className="mr-0 ml-auto pr-5" src="/circle-user.svg" alt="userlogo"/>

        </div>
    );
}

export default NavBar;