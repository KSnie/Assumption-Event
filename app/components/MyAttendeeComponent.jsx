"use client";
import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { Table } from "flowbite-react";

const MyAttendee = [
  {
    id: 1,
    image: "/EventIMG.png",
    title: "AU FRESHY NIGHT",
    date: "22 August 2024",
    time: "16:00 - 22:30",
  },
  {
    id: 2,
    image: "/EventIMG.png",
    title: "AU FRESHY NIGHT",
    date: "22 August 2024",
    time: "16:00 - 22:30",
  },
];

const AttendeeList = [
  {
    id: 1,
    name: "John Doe",
    year: "1",
    faculty: "Engineering",
    phone: "0812345678",
    code: "AU2024",
    status: "REGISTERED",
  },
  {
    id: 2,
    name: "Jane Doe",
    year: "1",
    faculty: "Engineering",
    phone: "0812345678",
    code: "AU2024",
    status: "JOINED",
  },
  {
    id: 2,
    name: "Jane Doe",
    year: "1",
    faculty: "Engineering",
    phone: "0812345678",
    code: "AU2024",
    status: "JOINED",
  },
  {
    id: 2,
    name: "Jane Doe",
    year: "1",
    faculty: "Engineering",
    phone: "0812345678",
    code: "AU2024",
    status: "JOINED",
  },
  
];

export default function Myevent() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-3 xl:gap-20 md:gap-6">
        {MyAttendee.map((event) => (
          <div
            key={event.id}
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
                Date & Time : {event.date} / {event.time}
              </h1>
            </div>

            <button
              onClick={() => setOpenModal(true)}
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
                  <Table.Row key={attendee.id}>
                    <Table.Cell>
                      <div className="flex flex-col">
                        <span>{attendee.name}</span>
                        <span className="text-sm text-gray-500">
                          Year: {attendee.year} | Faculty: {attendee.faculty} | Phone: {attendee.phone}
                        </span>
                      </div>
                    </Table.Cell>
                    <Table.Cell>{attendee.code}</Table.Cell>
                    <Table.Cell>
                      <span
                        className={`${
                          attendee.status === "JOINED" ? "text-green-500" : "text-orange-500"
                        }`}
                      >
                        {attendee.status}
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
