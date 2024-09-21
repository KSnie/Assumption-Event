import Navbar from '@/app/components/Navigation'
import MyTicketsComponent from '@/app/components/MyTicketsComponent'
import { FiHome } from "react-icons/fi";

export default function TicketsPage() {
    return (
        <div className = "custom-margin">
            <div className="flex items-center mt-10">
                <FiHome className = "text-lg mr-2" />
                <h1 className = "text-lg font-light">/ Tickets / MyTickets</h1>
            </div>
            <h1 className = "text-2xl font-bold">Tickets</h1>
            {/* <Navbar /> */}
            <MyTicketsComponent />
        </div>
    )
}