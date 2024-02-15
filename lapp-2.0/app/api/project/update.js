import { prisma } from "../_prisma";

export default async function PUT(req, res) {
  const new_project_id = req.body.project_id;
  const newData = req.body; // New data to update

  delete newData.project_id;
  try {
    const updatedProject = await prisma.project.update({
      where: { project_id: new_project_id },
      data: newData,
    });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Error updating project" });
  }
  res.status(405).end(); // Method Not Allowed
}
