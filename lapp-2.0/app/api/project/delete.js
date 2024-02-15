import moment from "moment";
import { prisma } from "../_prisma";

export default async function PUT(req, res) {
  const id = Number(req.body);

  try {
    await prisma.project.update({
      where: { project_id: id, is_active: true },
      data: {
        is_active: false,
        deleted_by: 1,
        deleted_date: moment().toISOString(),
      },
    });

    let arrayOfQuoteIds = [];

    const projectQuoteIds = await prisma.quote.findMany({
      where: { project_id: id, is_active: true },
      select: { quote_id: true },
    });

    projectQuoteIds.map(({ quote_id }) => {
      arrayOfQuoteIds.push(Number(quote_id));
    });

    await prisma.material_Quoted.updateMany({
      where: { permanent_quote_id: { in: [...arrayOfQuoteIds] } },
      data: { is_active: false },
    });

    const deleteQuotes = await prisma.quote.updateMany({
      where: { project_id: id, is_active: true },
      data: {
        is_active: false,
        deleted_by: 1,
        deleted_date: moment().toISOString(),
      },
    });

    res.json(deleteQuotes);
  } catch (err) {
    throw new Error("Failed to delete");
  }
}
