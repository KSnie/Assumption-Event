"use client";
import Link from 'next/link';
import { useState } from "react";
import { MdPeopleAlt } from "react-icons/md";
import { Modal, Button, Select } from "flowbite-react";

export default function EventDetails({ details }) {

    console.log(details);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        year: "",
        faculty: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Registration Data:", formData);
        // Add form submission logic here
        setOpenModal(false);
    };

    const handleReset = () => {
        setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            year: "",
            faculty: ""
        });
        setOpenModal(false);
    };

    return (
        <div>
            {details.map((event) => (
                <div key={event._id} className="w-screen mb-10"> {/* Unique key and spacing */}
                    <div className="w-CustomW h-14 bg-slate-500 -ml-10 mt-5 -mr-96 lg:-mr-0 content-center">
                        <h1 className="font-bold text-white text-1xl ml-10">{event.title}</h1>
                        <h1 className="font-light text-white text-1xl ml-10">{event.date}</h1> {/* Format date */}
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-11/12 shadow mt-10 rounded-3xl flex flex-col items-center">
                            <h1 className="absolute lg:right-52 mt-3 flex items-center">
                                <MdPeopleAlt /> 0 / {event.maxjoin}
                            </h1>
                            <div className="flex flex-col xl:flex-row content-center justify-center lg:justify-between items-center">
                                <img src={event.image} alt="Event Image" className="w-8/12 lg:w-11/12 rounded-2xl mt-10 lg:m-10 lg:ml-16 -ml-5" />
                                <pre className="text-xxs md:text-xss lg:text-sm">{event.description.replace(/\n/g, "<br />")}</pre> {/* Preserve line breaks */}
                            </div>

                            <button className="mt-5 w-9/12 lg:w-11/12 h-10 lg:h-14 bg-customRed rounded-3xl" onClick={() => setOpenModal(true)}>
                                <h1 className="text-white font-bold">REGISTER</h1>
                            </button>

                            <Link href="/" className="text-black font-extralight text-xs underline mb-5 mt-2">
                                BACK TO HOMEPAGE
                            </Link>
                        </div>
                    </div>
                </div>
            ))}


            {/* Modal for Registration */}
            <Modal show={openModal} size="lg" onClose={() => setOpenModal(false)}>
                <Modal.Body>
                    <h1 className="font-semibold text-lg text-slate-400 mb-5">Event Registration</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex">
                        <div className="w-2/4 pr-2"> {/* Add padding-right to create space */}
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-400"
                                placeholder="FIRST NAME"
                                required
                            />
                        </div>
                        <div className="w-2/4">
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="LAST NAME"
                                className="w-full rounded-lg border border-slate-400"
                                required
                            />
                        </div>
                    </div>


                        <div>
                            <input
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                className="w-full rounded-lg border border-slate-400"
                                onChange={handleChange}
                                placeholder="PHONE NUMBER"
                                required
                            />
                        </div>
                        <div>
                            <Select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            >
                                <option value="">What year are you in?</option>
                                <option value="1">Year 1</option>
                                <option value="2">Year 2</option>
                                <option value="3">Year 3</option>
                                <option value="4">Year 4</option>
                            </Select>
                        </div>
                        <div>
                            <Select
                                name="faculty"
                                value={formData.faculty}
                                onChange={handleChange}
                                required
                            >
                                <option value="">FACULTY</option>
                                <option value="VMES">VMES</option>
                                <option value="BBA">BBA</option>
                                <option value="MUSIC">MUSIC</option>
                                <option value="CA">CA</option>
                            </Select>
                        </div>

                        <div className="flex flex-col justify-center mt-4">
                            <Button type="submit" className="bg-customRed text-white rounded-xl">Submit</Button>
                            <button type="button" onClick={handleReset} className="underline font-light text-sm mt-2">Close form</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
