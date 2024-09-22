import Link from 'next/link';
import { useState, useEffect } from "react";

export default function EventPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchAllEvents();
    }, []);

    const fetchAllEvents = async () => {
        try {
            const res = await fetch("/api/event");
            const data = await res.json();
            setEvents(data);
        } catch (error) {
            // console.error("Failed to fetch events", error);
        }
    };

    // console.log(events);

    return (
        <div className="p-4">
            <div className="flex flex-wrap gap-3 xl:gap-20 md:gap-2">
                {events?.map(event => (
                    <div key={event._id} className="relative w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96">
                        <img 
                            src={event.image} 
                            alt="Event Image" 
                            className="w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96 rounded-3xl" 
                        />
                        
                        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white w-full h-16 sm:h-12 md:h-14">
                            <h1 className="font-semibold ml-2">{event.title}</h1>
                            <h1 className="font-light text-xs ml-2">
                                Date & Time: {new Date(event.date).toLocaleString()}
                            </h1>
                        </div>
                        
                        <Link 
                            href={`/details/${event._id}` }
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-rose-200/80 w-full text-center content-center h-12 rounded-bl-3xl rounded-br-3xl font-light cursor-pointer"
                        >
                            MORE DETAILS
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
