import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SearchBar() {
    const [searchText, setSearchText] = useState("");
    const [results, setResults] = useState([]);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const debounceTimer = useRef(null);

    useEffect(() => {
        if (searchText) {
            setIsPopoverOpen(true);
        } else {
            setIsPopoverOpen(false);
        }

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        debounceTimer.current = setTimeout(() => {
            if (searchText) {
                fetchResults(searchText);
            }
        }, 500);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [searchText]);

    const fetchResults = async (query) => {
        try {
            const response = await fetch(`http://localhost:9000/u/search?q=${query}`);
            const data = await response.json();
            const resultsWithBlob = data.map(user => {
                if (user.userIcon) {
                    // Converte o buffer de imagem para Blob e cria um URL de objeto
                    const blob = new Blob([new Uint8Array(user.userIcon.data)], { type: 'image/png' });
                    user.userIcon = URL.createObjectURL(blob);
                }
                return user;
            });
            setResults(resultsWithBlob);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="flex flex-col justify-center items-center w-[50%] max-w-sm">
            <div className="relative w-[100%]">
                <Input
                    className="w-[100%] rounded-md border border-zinc-300 py-2 pl-10 pr-4 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                    placeholder="Search..."
                    type="search"
                    id="search"
                    value={searchText}
                    onChange={handleInputChange}
                />
                <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
            </div>
            <Popover id="popover-search" open={isPopoverOpen}>
                <PopoverTrigger asChild>
                    <div />
                </PopoverTrigger>
                <PopoverContent className="w-full max-h-[300px] overflow-auto rounded-md border border-zinc-300 bg-zinc-950 p-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                    <ScrollArea>
                        <div className="space-y-1">
                            {results.map((result, index) => (
                                <a href={`/u/${result.username}`} key={index} className="flex cursor-pointer items-center rounded-md px-3 py-2 transition ease-in-out duration-150 hover:bg-zinc-900 dark:hover:bg-zinc-700">
                                    <img src={result.userIcon} alt={result.username} className="h-5 w-5 mr-2 rounded-full" />
                                    <span className="text-sm text-zinc-50 dark:text-zinc-300">{result.username}</span>
                                </a>
                            ))}
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    );
}

function SearchIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}
