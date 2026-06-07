import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const VALID_CATEGORIES = ["Exam", "Event", "General"];
const VALID_PRIORITIES = ["Normal", "Urgent"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return handleGet(req, res);
  } else if (req.method === "POST") {
    return handlePost(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

// GET /api/notices — Fetch all notices, Urgent first, then by publishDate desc
async function handleGet(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [
        { priority: "desc" }, // "Urgent" > "Normal" alphabetically desc
        { publishDate: "desc" },
      ],
    });

    return res.status(200).json(notices);
  } catch (error) {
    console.error("GET /api/notices error:", error);
    return res.status(500).json({ error: "Failed to fetch notices" });
  }
}

// POST /api/notices — Create a new notice
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, body, category, priority, publishDate, imageUrl } = req.body;

    // --- Server-side validation ---
    const errors: string[] = [];

    if (!title || typeof title !== "string" || !title.trim()) {
      errors.push("Title is required");
    }
    if (!body || typeof body !== "string" || !body.trim()) {
      errors.push("Body is required");
    }
    if (!category || !VALID_CATEGORIES.includes(category)) {
      errors.push("Category must be one of: Exam, Event, General");
    }
    if (!priority || !VALID_PRIORITIES.includes(priority)) {
      errors.push("Priority must be one of: Normal, Urgent");
    }
    if (!publishDate) {
      errors.push("Publish date is required");
    } else {
      const d = new Date(publishDate);
      if (isNaN(d.getTime())) {
        errors.push("Publish date must be a valid date");
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(". ") });
    }

    const notice = await prisma.notice.create({
      data: {
        title: title.trim(),
        body: body.trim(),
        category,
        priority,
        publishDate: new Date(publishDate),
        imageUrl: imageUrl && typeof imageUrl === "string" ? imageUrl.trim() || null : null,
      },
    });

    return res.status(201).json(notice);
  } catch (error) {
    console.error("POST /api/notices error:", error);
    return res.status(500).json({ error: "Failed to create notice" });
  }
}
