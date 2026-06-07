import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

const VALID_CATEGORIES = ["Exam", "Event", "General"];
const VALID_PRIORITIES = ["Normal", "Urgent"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid notice ID" });
  }

  if (req.method === "GET") {
    return handleGet(id, req, res);
  } else if (req.method === "PUT") {
    return handlePut(id, req, res);
  } else if (req.method === "DELETE") {
    return handleDelete(id, req, res);
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

// GET /api/notices/[id] — Fetch a single notice
async function handleGet(
  id: string,
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const notice = await prisma.notice.findUnique({ where: { id } });
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }
    return res.status(200).json(notice);
  } catch (error) {
    console.error(`GET /api/notices/${id} error:`, error);
    return res.status(500).json({ error: "Failed to fetch notice" });
  }
}

// PUT /api/notices/[id] — Update an existing notice
async function handlePut(
  id: string,
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check if notice exists
    const existing = await prisma.notice.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Notice not found" });
    }

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

    const updated = await prisma.notice.update({
      where: { id },
      data: {
        title: title.trim(),
        body: body.trim(),
        category,
        priority,
        publishDate: new Date(publishDate),
        imageUrl: imageUrl && typeof imageUrl === "string" ? imageUrl.trim() || null : null,
      },
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error(`PUT /api/notices/${id} error:`, error);
    return res.status(500).json({ error: "Failed to update notice" });
  }
}

// DELETE /api/notices/[id] — Delete a notice
async function handleDelete(
  id: string,
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const existing = await prisma.notice.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Notice not found" });
    }

    await prisma.notice.delete({ where: { id } });

    return res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error(`DELETE /api/notices/${id} error:`, error);
    return res.status(500).json({ error: "Failed to delete notice" });
  }
}
