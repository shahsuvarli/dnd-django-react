import { prisma } from "@/utils/_prisma";

export default async function POST(req, res) {
  const projectData = req.body;
  const savedProject = await prisma.project.create({ data: projectData });
  res.json(savedProject);
  res.status(405).end();
}
