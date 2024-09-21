"use client";
import { FiHome } from "react-icons/fi";
import Announcement from "./Announcement";
import Event from "./EventPage";

export default function Home() {

    return (
        <div className = "custom-margin">
            <div className="flex items-center mt-10">
                <FiHome className = "text-lg mr-2" />
                <h1 className = "text-lg font-light">/ Pages / Home</h1>
            </div>
            <h1 className = "text-2xl font-bold">HOME</h1>

            <h1 className = "font-light mt-6">ANNOUNCEMENT</h1>
            
            <Announcement/>

            <h1 className = "font-light mt-6 mb-5">EVENT</h1>
            
            <Event />
        </div>
    );
}