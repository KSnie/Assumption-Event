import Navbar from '@/app/components/Navigation'
import MyAttendeeComponent from '@/app/components/MyAttendeeComponent'
import { FiHome } from "react-icons/fi";

export default function attendee() {
    return (
        <div className = "custom-margin">
            <div className="flex items-center mt-10">
                <FiHome className = "text-lg mr-2" />
                <h1 className = "text-lg font-light">/ Manager / Attendee</h1>
            </div>
            <h1 className = "text-2xl font-bold">Attendee</h1>
            {/* <Navbar /> */}
            <MyAttendeeComponent />
        </div>
    )
}