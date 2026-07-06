import EventDetailsComponent from '@/app/components/EventDetailsComponent';
import Myevent from '@/models/Myevent';
import connect from '@/lib/db';
import { FiHome } from "react-icons/fi";

export default async function Details({ params }) {
    let dataDetails = null;
    try {
        await connect();
        const event = await Myevent.findById(params.id).lean();
        if (event) {
            dataDetails = JSON.parse(JSON.stringify(event));
        }
    } catch (error) {
        dataDetails = null;
    }

    if (!dataDetails) {
        return <div className="custom-margin">Error fetching data. Please try again later.</div>;
    }

    return (
        <div className="custom-margin">
            <div className="flex items-center mt-10">
                <FiHome className="text-lg mr-2" />
                <h1 className="text-lg font-light">/ Pages / Home / EventDetails </h1>
            </div>
            <h1 className="text-2xl font-bold">Home</h1>
            <EventDetailsComponent details={dataDetails} />
        </div>
    );
}
