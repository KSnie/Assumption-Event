"use client";
import { useState, useEffect } from "react";
import { Button, Modal, Select } from "flowbite-react";
import { useSession } from "next-auth/react";

export default function Myevent() {
  const { data: session, status } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [showUsedTickets, setShowUsedTickets] = useState(false);
  const [fade, setFade] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    Phonenumber: "",
    Year: "",
    Faculty: ""
  });

  const handleTicketChange = (isUsed) => {
    setFade(false);
    setTimeout(() => {
      setShowUsedTickets(isUsed);
      setFade(true);
    }, 300);
  };

  async function fetchTickets() {
    try {
      const response = await fetch(`/api/myticket?id=${session.user.id}`);
      const data = await response.json();
      setTickets(data);
    } catch (error) {
      // console.error("Failed to fetch tickets:", error);
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchTickets();
    }
  }, [status]);

  const MyTickets = Array.isArray(tickets) ? tickets.filter((ticket) => ticket.Status !== "JOINED") : [];
  const UsedTickets = Array.isArray(tickets) ? tickets.filter((ticket) => ticket.Status === "JOINED") : [];
  
  // Update form data when a field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Populate the form when a ticket is selected
  const openTicketModal = (ticket) => {
    setSelectedTicket(ticket);
    setFormData({
      Fname: ticket.Fname || "",
      Lname: ticket.Lname || "",
      Phonenumber: ticket.Phonenumber || "",
      Year: ticket.Year || "",
      Faculty: ticket.Faculty || ""
    });
    setOpenModal(true);
  };

  // Handle the form submission to update the ticket
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/myticket`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: selectedTicket.T_ID, // Ticket ID
          ...formData // Updated ticket data
        })
      });

      if (response.ok) {
        const updatedTicket = await response.json();
        // console.log("Ticket updated successfully:", updatedTicket);
        // Optionally, you can refresh the tickets after update
        fetchTickets();
        setOpenModal(false); // Close modal after update
      } else {
        // console.error("Failed to update ticket");
      }
    } catch (error) {
      // console.error("Error while updating ticket:", error);
    }
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

      {/* Ticket Display */}
      <div className={`flex flex-wrap gap-3 xl:gap-20 md:gap-6 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'} z-50`}>
        {(showUsedTickets ? UsedTickets : MyTickets).map((event) => (
          <div key={event.T_ID} className="relative w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96">
            <div className={`absolute top-0 left-0 right-0 h-full ${showUsedTickets ? 'bg-black/50 z-50' : ''} rounded-3xl`} />

            <img
              src={event.EventDetails.image}
              alt="Event Image"
              className="w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96 rounded-3xl"
            />

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white w-full h-16 sm:h-12 md:h-14">
              <h1 className="font-semibold ml-2">{event.EventDetails.title}</h1>
              <h1 className="font-light text-xs ml-2">Date & Time: {new Date(event.EventDetails.date).toLocaleString()}</h1>
            </div>

            <button
              onClick={() => openTicketModal(event)}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-rose-200/80 w-full text-center content-center h-12 rounded-bl-3xl rounded-br-3xl font-light cursor-pointer"
            >
              MORE DETAILS
            </button>

            <div className="absolute top-10 right-0 bg-white w-3/12 sm:w-2/12 content-center flex justify-center items-center rounded-s-full">
              <h1 className="text-gray-600 font-bold">x {event.Amount}</h1>
            </div>
          </div>
        ))}
      </div>

      {/* Update Ticket Modal */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <h1 className="font-semibold text-lg text-slate-500 mb-5">TICKETS</h1>
          <h1 className="font-semibold text-slate-500">CODE</h1>
          <h1 className="w-auto border text-center h-11 content-center text-slate-500 rounded-xl tracking-Custom font-bold">
            {selectedTicket.Code}
          </h1>
          <form onSubmit={handleUpdateSubmit}>
            <div className="flex flex-row gap-4 mt-4">
              <div className="w-1/2">
                <h1 className="font-semibold text-slate-500">Firstname</h1>
                <input
                  type="text"
                  name="Fname"
                  className="w-full rounded-lg border-slate-300"
                  value={formData.Fname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2">
                <h1 className="font-semibold text-slate-500">Lastname</h1>
                <input
                  type="text"
                  name="Lname"
                  className="w-full rounded-lg border-slate-300"
                  value={formData.Lname}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <h1 className="font-semibold text-slate-500 mt-3">Phone number</h1>
            <input
              type="text"
              name="Phonenumber"
              className="w-full rounded-lg border-slate-300"
              value={formData.Phonenumber}
              onChange={handleInputChange}
            />
            <div className="mt-3">
              <h1 className="font-semibold text-slate-500">What year are you in?</h1>
              <Select
                name="Year"
                value={formData.Year}
                onChange={(e) => setFormData({ ...formData, Year: e.target.value })}
                required
              >
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
                <option value="4">Year 4</option>
              </Select>
            </div>
            <div className="mt-3">
              <h1 className="font-semibold text-slate-500">Faculty</h1>
              <Select
                name="Faculty"
                value={formData.Faculty}
                onChange={(e) => setFormData({ ...formData, Faculty: e.target.value })}
                required
              >
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
              </Select>
            </div>
            <Button type="submit" className="mt-4 w-full bg-rose-200/80 text-slate-500">
              Update
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
