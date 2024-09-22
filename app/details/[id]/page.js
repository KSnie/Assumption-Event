import Navbar from '@/app/components/Navigation';
import EventDetailsComponent from '@/app/components/EventDetailsComponent';
import { FiHome } from "react-icons/fi";

export default async function Details({ params }) {
    console.log(params.id);
    const res = await fetch(`/api/event/${params.id}`, { cache: "no-store" });

    // Check if the response is OK (status in the range 200-299)
    if (!res.ok) {
        const errorText = await res.text(); // Get the error message
        console.error('Error fetching data:', errorText);
        return <div className="xl:ml-72 lg:ml-72 md:ml-72 sm:ml-72 ml-3">Error fetching data. Please try again later.</div>;
    }

    const dataDetails = await res.json();
    console.log(dataDetails);

    return (
        <div className="xl:ml-72 lg:ml-72 md:ml-72 sm:ml-72 ml-3">
            <div className="flex items-center mt-10">
                <FiHome className="text-lg mr-2" />
                <h1 className="text-lg font-light">/ Pages / Home / EventDetails </h1>
            </div>
            <h1 className="text-2xl font-bold">Home</h1>
            {/* Uncomment the line below if you want to include the Navbar */}
            {/* <Navbar /> */}
            <EventDetailsComponent details={dataDetails} />
        </div>
    );
}
