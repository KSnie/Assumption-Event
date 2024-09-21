import SigninPage from "@/app/components/Signinpage";
import { FiHome } from "react-icons/fi";

export default function Signin() {
    return (
        <div className="relative h-screen custom-margin2">
            {/* Background image with 50% red overlay on top */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/registebg.png)' }}>
                <div className="h-full bg-red-500 bg-opacity-30"></div>
            </div>

            {/* Content on top of the background */}
            <div className="relative z-10 p-10">
                <div className="flex items-center mt-10">
                    <FiHome className="text-lg mr-2 text-white" />
                    <h1 className="text-lg font-light text-white">/ Signin</h1>
                </div>
                <h1 className="text-2xl font-bold text-white">Signin</h1>
                {/* <Navbar /> */}
                <SigninPage />
            </div>
        </div>
    );
}
