// Seed a demo user and sample events so the deployed site has content.
// Usage: node scripts/seed.mjs  (reads MONGODB_URI from .env.local)
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function loadEnv() {
  const envText = readFileSync(join(root, ".env.local"), "utf8");
  for (const line of envText.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/i);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnv();

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI missing — create .env.local first (see .env.example)");
  process.exit(1);
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Owner_id: { type: String, required: true },
});
const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  maxjoin: { type: Number, required: true },
  image: { type: String, required: true },
  Event_id: { type: String, required: true },
  Owner_id: { type: String, required: true },
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
const Myevent = mongoose.models.Myevent || mongoose.model("Myevent", eventSchema);

const DEMO_USERNAME = "demo";
const DEMO_PASSWORD = "demo1234";

const sampleEvents = [
  {
    title: "AU Freshmen Night 2026",
    description:
      "Welcome party for all freshmen!\n\nJoin us for live music, games and free food at the John XXIII Conference Center.\nDress code: casual.\n\nOrganized by AU Student Council.",
    date: "2026-08-21T18:00",
    maxjoin: 200,
    image: "/EventIMG.png",
  },
  {
    title: "VMES Tech Talk: AI in Industry",
    description:
      "A guest lecture on how AI and knowledge graphs are used in real factories.\n\nSpeakers from industry partners.\nFree snacks and certificates for attendees.",
    date: "2026-09-05T13:30",
    maxjoin: 80,
    image: "/Banner.png",
  },
  {
    title: "Charity Fun Run 5K",
    description:
      "Run for a cause around the Suvarnabhumi campus lake.\n\nRegistration fee goes to local charities.\nWater stations every 1 km, finisher medals for everyone.",
    date: "2026-09-19T06:30",
    maxjoin: 150,
    image: "/DetailBanner.png",
  },
  {
    title: "Game Dev Club Showcase",
    description:
      "Student-made games playable all afternoon.\n\nVote for your favorite project and meet the developers.\nHosted at the IT building, 4th floor.",
    date: "2026-10-02T15:00",
    maxjoin: 120,
    image: "/EventIMG.png",
  },
];

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  let user = await User.findOne({ username: DEMO_USERNAME });
  if (!user) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(DEMO_PASSWORD, salt);
    user = new User({ username: DEMO_USERNAME, password: hashed, Owner_id: "null" });
    await user.save();
    user.Owner_id = user._id.toString();
    await user.save();
    console.log(`Created demo user "${DEMO_USERNAME}" (password: ${DEMO_PASSWORD})`);
  } else {
    console.log(`Demo user "${DEMO_USERNAME}" already exists`);
  }

  for (const ev of sampleEvents) {
    const exists = await Myevent.findOne({ title: ev.title });
    if (exists) {
      console.log(`Event already exists: ${ev.title}`);
      continue;
    }
    const event = new Myevent({ ...ev, Owner_id: user.Owner_id, Event_id: "none" });
    await event.save();
    event.Event_id = event._id.toString();
    await event.save();
    console.log(`Created event: ${ev.title}`);
  }

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
