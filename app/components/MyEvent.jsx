"use client";
import { useState , useEffect } from "react";
import { CiCirclePlus } from "react-icons/ci"; // Correct for react-icons
import { FaPlus } from "react-icons/fa"; // Correct for react-icons
import { Modal } from "flowbite-react"; // Correct for flowbite-react
import { useSession } from "next-auth/react"; // Importing authentication hooks
import { useRouter } from "next/navigation"; // Importing navigation hooks

export default function Myevent() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";
  
  useEffect(() => {
    if (!loading && session) {
      fetchMyEvents();
    }
  }, [loading, session]);
  
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "", // Ensure initial value is correct
    maxjoin: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
  const [mode, setMode] = useState("create"); // To track the mode (create/update)
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [Myevents, setMyevents] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!session || !session.user) {
      console.error("No user session available.");
      router.push("/signin");
      return; // or handle this case appropriately
    }

    // Validation
    let formErrors = {};
    if (!formData.title) formErrors.title = "Event name is required.";
    if (!formData.date) formErrors.date = "Date & Time are required.";
    if (!formData.maxjoin) formErrors.maxjoin = "Max count is required.";
    if (!formData.description) formErrors.description = "Description is required.";

    if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
    }

    const submitData = {
        ...formData,
        Owner_id: session.user.id,
        image: "/DetailBanner.png",
    };

    if (mode === "create") {
        // Create event
        console.log("Submitting Form Data:", submitData);
        fetch("/api/myevent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to submit form");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Form Data Submitted:", data);
                fetchMyEvents();
            })
            .catch((error) => {
                console.error("Form Data Error:", error);
            });
    } else {
        // Update event
        submitData.id = selectedEvent._id; // Add the event ID to the data
        fetch(`/api/myevent`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update event");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Form Data Updated:", data);
                fetchMyEvents();
            })
            .catch((error) => {
                console.error("Update Error:", error);
            });
    }
      setFormData({
          title: "",
          date: "",
          maxjoin: "",
          description: "",
      });
          setErrors({});
          setOpenModal(false);
    };

  const handleReset = () => {
    setFormData({
      title: "",
      date: "",
      maxjoin: "",
      description: ""
    });
    setErrors({});
    setOpenModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditClick = (event) => {
    setFormData({
      title: event.title,
      date: event.date, // Ensure date format is correct for the input
      maxjoin: event.maxjoin,
      description: event.description
    });
    setSelectedEvent(event);
    setMode("update");
    setOpenModal(true);
  };

  async function fetchMyEvents() {
    if (!session || !session.user) {
      console.error("No user session available.");
      router.push("/signin");
      return; // or handle this case appropriately
    }
    console.log(session.user.id); // Log the Owner_id
    const response = await fetch(`/api/myevent?id=${session.user.id}`);

    if (response.status === 404) {
      console.log("No events found.");
      setMyevents([]);
      return; // or handle this case appropriately
    }

    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    console.log("Fetched Events:", data);
    setMyevents(data);
    return data;
  }

  const deleteById = () => {
    if (!selectedEvent) return;
    if (!confirm("Are you sure you want to delete this event?")) return;

    fetch(`/api/myevent`, {
      method: "DELETE",
      body: JSON.stringify(selectedEvent)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete event");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Event Deleted:", data);
        fetchMyEvents();
        handleReset();
      })
      .catch((error) => {
        console.error("Delete Error:", error);
      });
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-3 xl:gap-20 md:gap-6">
        {Myevents.map(event => (
          <div key={event._id} className="relative w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96">
            <img src={event.image} alt="Event Image" className="w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96 rounded-3xl" />
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white w-full h-16 sm:h-12 md:h-14">
              <h1 className="font-semibold ml-2">{event.title}</h1>
              <h1 className="font-light text-xs ml-2">Date & Time : {event.date}</h1>
            </div>
            <button
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-rose-200/80 w-full text-center content-center h-12 rounded-bl-3xl rounded-br-3xl font-light cursor-pointer"
              onClick={() => handleEditClick(event)}
            >
              MORE DETAILS
            </button>
          </div>
        ))}

        <button className="relative w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96" onClick={() => {
          setMode("create");
          setOpenModal(true);
        }}>
          <div className="bg-rose-100 w-40 h-72 sm:w-72 sm:h-80 md:w-56 md:h-72 xl:w-72 xl:h-96 rounded-3xl flex justify-center items-center">
            <CiCirclePlus className="w-auto h-auto text-8xl text-white" />
          </div>
        </button>
      </div>

      <Modal show={openModal} size="3xl" onClose={handleReset} popup>
        <Modal.Body>
          <div className="flex justify-between">
            <h1 className="font-semibold mt-5 text-lg text-slate-400">{mode === "create" ? "CREATE EVENT" : "UPDATE EVENT"}</h1>
            { mode === "update" && (
              <button onClick={deleteById} className="text-rose-400 font-semibold">REMOVE EVENT</button>
            )}
          </div>

          <div className="space-y-6 mt-5">
            <form onSubmit={handleSubmit}>
              <div className="sm:flex justify-between items-center">
                <button type="button" className="mr-2 w-full sm:w-4/12 h-40 border-2 border-slate-300 rounded-3xl flex flex-col content-center items-center justify-center">
                  <FaPlus className="text-4xl text-customRed" />
                </button>

                <div>
                  <h1 className="font-semibold text-slate-500">Event name</h1>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="rounded-xl w-full border-2 border-slate-300 mt-3 sm:mt-0"
                    placeholder="EVENT NAME"
                  />
                  {errors.title && <p className="text-rose-400 text-sm">{errors.title}</p>}
                  <div className="sm:flex justify-between items-center mt-3">
                    <div>
                      <h1 className="font-semibold text-slate-500">Date & Time</h1>

                      <input
                        type="datetime-local"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="rounded-xl w-full border-2 border-slate-300 mr-2"
                        placeholder="DATE & TIME"
                      />
                    </div>

                    {errors.date && <p className="text-rose-400 text-sm">{errors.date}</p>}
                    <div className="sm:ml-2">
                      <h1 className="font-semibold text-slate-500">MaxJoin</h1>
                        <input
                        type="number"
                        name="maxjoin"
                        value={formData.maxjoin}
                        onChange={handleChange}
                        className="rounded-xl w-full border-2 border-slate-300 mt-3 sm:mt-0"
                        placeholder="MAX COUNT"
                      />
                    </div>
                    {errors.maxjoin && <p className="text-rose-400 text-sm">{errors.maxjoin}</p>}
                  </div>
                </div>
              </div>

              <div>
                <h1 className="mt-4 mb-1 font-semibold text-slate-500">Description</h1>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="DESCRIPTION"
                  className=" w-full h-32 p-2 border-2 border-slate-300 rounded-xl resize-none"
                ></textarea>
                {errors.description && <p className="text-rose-400 text-sm">{errors.description}</p>}
              </div>

              <div className="flex flex-col content-center items-center justify-center mt-2">
                <div className="w-6/12 h-9">
                  <button type="submit" className="rounded-2xl text-lg font-semibold w-full h-full bg-customRed text-white">
                    {mode === "create" ? "Submit form" : "Update form"}
                  </button>
                </div>
                <div>
                  <button type="button" onClick={handleReset} className="underline font-light text-sm">Close form</button>
                  
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
