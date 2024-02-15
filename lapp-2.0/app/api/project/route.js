import { prisma } from "@/utils/_prisma";

export async function POST(req, res) {
  const data = JSON.parse(req.body);
  console.log(data, "data");
  const projectData = req.body;
  const savedProject = await prisma.project.create({ data: projectData });
  res.json(savedProject);
  res.status(405).end();
}
