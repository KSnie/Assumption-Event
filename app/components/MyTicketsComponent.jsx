"use client";
import { useState } from "react";
import { Button, Modal, Select } from "flowbite-react";

const MyTickets = [
  {
    id: 1,
    image: "/EventIMG.png",
    title: "AU FRESHY NIGHT",
    date: "22 August 2024",
    time: "16:00 - 22:30",
    Fname: "Jane",
    Lname: "Doe",
    year: "3",
    faculty: "MUSIC",
    phone: "0812345678",
    code: "AU2024",
    amount: "1"
  },
  // Other tickets...
];

const UsedTickets = [
  {
    id: 1,
    image: "/EventIMG.png",
    title: "AU FRESHY NIGHT",
    date: "22 August 2024",
    time: "16:00 - 22:30",
    amount: "0"
  },
  // Other used tickets...
];

export default function Myevent() {
  const [openModal, setOpenModal] = useState(false);
  const [showUsedTickets, setShowUsedTickets] = useState(false);
  const [fade, setFade] = useState(true); // To control fading animation

  // Function to handle the transition with fade effect
  const handleTicketChange = (isUsed) => {
    setFade(false); // Start fade-out
    setTimeout(() => {
      setShowUsedTickets(isUsed);
      setFade(true); // Fade-in after state change
    }, 300); // Timeout for the transition effect duration
  };

  return (
    <div className="p-4">
      {/* Toggle Buttons */}
      <div className="w-11/12 bg-slate-100 rounded-full h-16 mb-10 content-center flex justify-center items-center z-0">
        <button 
          onClick={() => handleTicketChange(false)}
          className={`w-2/4 mr-3 ml-2 h-14 rounded-s-full content-center flex justify-center items-center z-10 ${!showUsedTickets ? 'bg-red-100' : 'bg-slate-100'}`}
        >
          <h1 className="font-bold text-white">MY TICKETS</h1>
        </button>

        <button 
          onClick={() => handleTicketChange(true)}
          className={`w-2/4 mr-2 h-14 rounded-e-full content-center flex justify-center items-center z-10 ${showUsedTickets ? 'bg-red-100' : 'bg-slate-100'}`}
        >
          <h1 className="font-bold text-white">USED TICKETS</h1>
        </button>
      </div>

      {/* Ticket Display with Fade Animation */}
      <div className={`flex flex-wrap gap-3 xl:gap-20 md:gap-6 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'} z-50`}>
        {(showUsedTickets ? UsedTickets : MyTickets).map(event => (
          <div 
            key={event.id} 
            className={`relative w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96`}
          >
            <div className={`absolute top-0 left-0 right-0 h-full ${showUsedTickets ? 'bg-black/50 z-50' : ''} rounded-3xl`} />

            <img 
              src={event.image} 
              alt="Event Image" 
              className="w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96 rounded-3xl" 
            />

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white w-full h-16 sm:h-12 md:h-14">
              <h1 className="font-semibold ml-2">{event.title}</h1>
              <h1 className="font-light text-xs ml-2">Date & Time: {event.date} / {event.time}</h1>
            </div>

            <button 
              onClick={() => setOpenModal(true)} 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-rose-200/80 w-full text-center content-center h-12 rounded-bl-3xl rounded-br-3xl font-light cursor-pointer"
            >
              MORE DETAILS
            </button>

            <div className="absolute top-10 right-0 bg-white w-3/12 sm:w-2/12 content-center flex justify-center items-center rounded-s-full">
              <h1 className="text-gray-600 font-bold">x {event.amount}</h1>
            </div>
          </div>
        ))}
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <h1 className="font-semibold text-lg text-slate-500 mb-5">TICKETS</h1>
          <h1 className="font-semibold text-slate-500">CODE</h1>
          <h1 className="w-auto border text-center h-11 content-center text-slate-500 rounded-xl tracking-Custom font-bold">
            {MyTickets[0].code}
          </h1>
          <form>
            <div className="flex flex-row gap-4 mt-4">
              <div className="w-1/2">
                <h1 className="font-semibold text-slate-500">Firstname</h1>
                <input type="text" className="w-full rounded-lg border-slate-300" value={MyTickets[0].Fname}/>
              </div>
              <div className="w-1/2">
                <h1 className="font-semibold text-slate-500">Lastname</h1>
                <input type="text" className="w-full rounded-lg border-slate-300" value={MyTickets[0].Lname}/>
              </div>
            </div>
            <h1 className="font-semibold text-slate-500 mt-3">Phone number</h1>
            <input type="text" className="w-full rounded-lg border-slate-300" value={MyTickets[0].phone}/>
            <div className="mt-3">
              <h1 className="font-semibold text-slate-500">What year are you in?</h1>
              <Select name="year" value={MyTickets[0].year} required>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </Select>
            </div>
            <div className="mt-3">
              <h1 className="font-semibold text-slate-500">Faculty</h1>
              <Select name="faculty" value={MyTickets[0].faculty} required>
                <option value="VMES">VMES</option>
                <option value="BBA">BBA</option>
                <option value="MUSIC">MUSIC</option>
                <option value="CA">CA</option>
              </Select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="flex flex-col justify-center mt-4">
          <div className="flex flex-col justify-center w-3/4">
            <Button onClick={() => setOpenModal(false)} className="bg-customRed w-full">
              UPDATE
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
