# Assumption Event System

Event Tickets System
This website offers a complete event ticketing solution. 
It features a ticket inventory management system and the ability to generate tickets. 
Users can create and manage their own events after registering and logging in. 
For more details on the functionality, refer to the documentation provided.

* **Create By:** Kasidis Chuayprasert.
* **I'm studying:** Assumption University
* **Student ID:** 6510348
* **Subject:** WAD Section 543

## Image Ref

```
Image Ref : From AUSO ABAC
```


## How to use video

```
* [How-to-use](https://edgestore.dev/) <- Click this link to see how to use
```

## Vercel link

```
https://abac-event.vercel.app/home
```

## Package Using

* [edgestore](https://edgestore.dev/) Image Store
* [bcryptjs](https://www.npmjs.com/package/bcryptjs) Encryption Decryption Password
* [flowbite-react](https://flowbite-react.com/) UI Template
* [mongoose](https://mongoosejs.com/) Database with mongodb
* [next-auth](https://next-auth.js.org/) Login Register System
* [react-icons](https://react-icons.github.io/react-icons/) Icon in this project
* [tailwindcss](https://tailwindcss.com/) Base css


## 3 Data Models

[ Myevents ]
Fields: title, description, date, maxjoin, image, Event_id, Owner_id
Operations: Add new event, update event details, delete event, list all events

[ Myattendees ]
Fields: Event_id, Attendee_id, Tickets_ID, Status
Operations: Register new attendee, update attendee details, delete attendee, list all attendees

[ Mytickets ]
Fields: T_ID, Attendee_id, Onwer_id, Event_id, Fname, Lname, Phonenumber, Year, Faculty, Code, Amount
Operations: Issue new ticket, update ticket status, cancel ticket, list all tickets


## How to install

1. Clone this project.
```
git clone https://github.com/KSnie/Assumption-Event.git
```

2. Install package in project
```
npm i
```

3. Create Your .env

```
MONGODB_URI = 
NEXT_PUBLIC_API_URL= https://abac-event.vercel.app // Your Vercel link
NEXTAUTH_SECRET=

EDGE_STORE_ACCESS_KEY= // key from EDGE Website
EDGE_STORE_SECRET_KEY= // key from EDGE Website
```

## Models Code

1. Myevent

```
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    maxjoin: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    Event_id: {
        type: String,
        required: true
    },
    Owner_id: {
        type: String,
        required: true
    }
});

// Ensure you're using the same model name consistently
const Myevent = mongoose.models.Myevent || mongoose.model("Myevent", eventSchema);

export default Myevent;
```

2.Myattendee

```
import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
    Event_id: {
        type: String,
        required: true
    },
    Attendee_id: {
        type: String,
        required: true
    },
    Tickets_ID : {
        type: String,
        required: true
    },
    Status : {
        type: String,
        required: true
    }
});

const Myattendee = mongoose.models.Myattendee || mongoose.model("Myattendee", attendeeSchema);

export default Myattendee;
```

3. Mytickets

```
import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    T_ID: {
        type: String,
        required: true
    },
    Attendee_id: {
        type: String,
        required: true
    },
    Onwer_id: {
        type: String,
        required: true
    },
    Event_id: {
        type: String,
        required: true
    },
    Fname: {
        type: String,
        required: true
    },
    Lname: {
        type: String,
        required: true
    },
    Phonenumber: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Faculty: {
        type: String,
        required: true
    },
    Code: {
        type: String,
        required: true
    },
    Amount: {
        type: String,
        required: true
    },
});

const Myticket = mongoose.models.Myticket || mongoose.model("Myticket", ticketSchema);

export default Myticket;
```

## Call API CODE

1. Myevent CRUD
```
    // Get

    const response = await fetch(`/api/myevent?id=${session.user.id}`, { cache: "no-store" });

    // Create When Create Event Attendee will Create too.

    fetch("/api/myevent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
    })

    // Update 

    fetch(`/api/myevent`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
    })

    // Delete

    fetch(`/api/myevent`, {
      method: "DELETE",
      body: JSON.stringify(selectedEvent)
    })
```

2. Myevent

```
    // Create 

    fetch("/api/myticket", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(submitDatax),
    })

    // Get

    const response = await fetch(`/api/myticket?id=${session.user.id}`, { cache: "no-store" });

    // Update

    const response = await fetch(`/api/myticket`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id: selectedTicket.T_ID, // Ticket ID
        ...formData // Updated ticket data
        })
    })

    // Delete

        Ticket Will Remove Form Onwer Event in Attendee
```

3. Attendee

```
    // Create 

        Attendee will Create when Event Get Create

    // Get

    const response = await fetch(`/api/myattendee?id=${details._id}`, { cache: "no-store" });

    // Update

    const response = await fetch(`/api/myattendee`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody) // Pass the constructed body
    })

    // Delete Attendee will remove tickets too.

    const response = await fetch(`/api/myattendee`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: e.Attendee_id }) // Pass the attendee ID
    })
```