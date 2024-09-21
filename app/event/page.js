import Navbar from '@/app/components/Navigation'
import MyEventComponent from '@/app/components/MyEvent'
import { FiHome } from "react-icons/fi";

export default function EventPage() {
    return (
        <div className = "custom-margin">
            <div className="flex items-center mt-10">
                <FiHome className = "text-lg mr-2" />
                <h1 className = "text-lg font-light">/ Manager / Event</h1>
            </div>
            <h1 className = "text-2xl font-bold">Event</h1>
            {/* <Navbar /> */}
            <MyEventComponent />
        </div>
    )
}