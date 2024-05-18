import MenuDrawer from "@/components/MenuDrawer";

export default function Header() {
    return (
        <div className="bg-zinc-950 dark:bg-white fixed top-0 left-0 right-0 z-50
        border-b-[.025em] rounded-lg p-3 flex flex-row gap-4 justify-around items-center 
        align-middle h-[4rem]">
            <a href="/">
                <img src="./src/assets/logo-iz0.png" className="h-8 w-8" alt="iz0 logo" />
            </a>
                <MenuDrawer></MenuDrawer>
        </div>
    )
}