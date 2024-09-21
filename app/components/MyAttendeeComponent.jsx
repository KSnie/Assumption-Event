"use client";
import { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import { Table } from "flowbite-react";
import { useSession } from "next-auth/react"; // Importing authentication hooks
import { useRouter } from "next/navigation"; // Importing navigation hooks

export default function Myevent() {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const { data: session, status } = useSession();
  const [Myevents, setMyevents] = useState([]);
  const [AttendeeList, setAttendeeList] = useState([]);
  const loading = status === "loading";
  
  useEffect(() => {
    if (!loading && session) {
      fetchMyEvents();
      console.log(Myevents);
    }
  }, [loading, session]);

  async function fetchMyEvents() {
    if (!session || !session.user) {
      console.error("No user session available.");
      router.push("/signin");
      return;
    }
    console.log(session.user.id);
    const response = await fetch(`/api/myevent?id=${session.user.id}`);

    if (response.status === 404) {
      console.log("No events found.");
      setMyevents([]);
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    console.log("Fetched Events:", data);
    setMyevents(data);
    return data;
  }

  const handleMyAttendee = (Event_id) => {
    console.log("Fetching Attendee : ", Event_id);
    fetchMyAttendee(Event_id);
    setOpenModal(true)
  };

  async function fetchMyAttendee(Event_id) {
    if (!session || !session.user) {
      console.error("No user session available.");
      router.push("/signin");
      return;
    }
    console.log(session.user.id);
    const response = await fetch(`/api/myattendee?id=${Event_id}`);

    if (response.status === 404) {
      console.log("No Attendee found.");
      setAttendeeList([]);
      return;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch Attendee");
    }
    const data = await response.json();
    console.log("Fetched Attendee:", data);
    setAttendeeList(data);
    return data;
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-3 xl:gap-20 md:gap-6">
        {Myevents.map((event) => (
          <div
            key={event.Event_id}
            className="relative w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72  xl:w-72 xl:h-96"
          >
            <img
              src={event.image}
              alt="Event Image"
              className=" w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96 rounded-3xl"
            />

            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white w-full h-14 sm:h-12 md:h-14">
              <h1 className="font-semibold ml-2">{event.title}</h1>
              <h1 className="font-light text-xs ml-2">
                Date & Time : {event.date}
              </h1>
            </div>

            <button
              onClick={() => handleMyAttendee(event.Event_id)}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-rose-200/80 w-full text-center content-center h-12 rounded-bl-3xl rounded-br-3xl font-light cursor-pointer"
            >
              MORE DETAILS
            </button>
          </div>
        ))}
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Body>
          <h1 className="font-semibold text-lg text-slate-500 mb-5">Attendee</h1>

          <input
            type="text"
            className="w-full rounded-lg"
            placeholder="EVENT CODE"
          />
          <div className="overflow-x-auto mt-5 max-h-[350px] overflow-y-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>NAME</Table.HeadCell>
                <Table.HeadCell>CODE</Table.HeadCell>
                <Table.HeadCell>STATUS</Table.HeadCell>
                <Table.HeadCell>OPTION</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {AttendeeList.map((attendee) => (
                  <Table.Row key={attendee._doc.Attendee_id}>
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span>{attendee.ticket.Fname} {attendee.ticket.Lname}</span>
                        <span className="text-sm text-gray-500">
                          Year: {attendee.ticket.Year} | Faculty: {attendee.ticket.Faculty} | Phone: {attendee.ticket.Phonenumber}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{attendee.ticket.Code}</Table.Cell>
                    <Table.Cell>
                      <span
                        className={`${
                          attendee._doc.Status === "JOINED" ? "text-green-500" : "text-orange-500"
                        }`}
                      >
                        {attendee._doc.Status}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2">
                        <Button
                          size="xs"
                          color="success"
                          onClick={() => console.log("Joined")}
                        >
                          JOIN
                        </Button>
                        <Button
                          size="xs"
                          color="failure"
                          onClick={() => console.log("Deleted")}
                        >
                          DELETE
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex flex-col justify-center mt-4">
          <div className="flex flex-col justify-center w-3/4">
            <Button onClick={() => setOpenModal(false)} className="bg-customRed w-full">
              CLOSE
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
