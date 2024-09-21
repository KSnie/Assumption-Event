import MyAttendeeComponent from '@/app/components/MyAttendeeComponent'
import { FiHome } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function attendee() {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/signin");
    }
    
    return (
        <div className = "custom-margin">
            <div className="flex items-center mt-10">
                <FiHome className = "text-lg mr-2" />
                <h1 className = "text-lg font-light">/ Manager / Attendee</h1>
            </div>
            <h1 className = "text-2xl font-bold">Attendee</h1>
            <MyAttendeeComponent />
        </div>
    )
}