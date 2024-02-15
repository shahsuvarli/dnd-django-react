import { prisma } from "../_prisma";

export default async function GET(req, res) {
  const {
    sales_org_id,
    project_name,
    ranking,
    general_contractor,
    electrical_contractor,
    region,
    state,
    vertical_market,
    won_lost,
    status,
    channel,
    notes,
    date_from,
    date_to,
  } = req.query;
  const result = await prisma.project.findMany({
    where: {
      AND: [
        { is_active: true },
        project_name ? { project_name: { contains: project_name } } : {},
        sales_org_id ? { sales_org_id: Number(sales_org_id) } : {},
        ranking ? { ranking: Number(ranking) } : {},
        general_contractor
          ? { general_contractor: { contains: general_contractor } }
          : {},
        electrical_contractor
          ? { electrical_contractor: { contains: electrical_contractor } }
          : {},
        region ? { region: Number(region) } : {},
        state ? { state: Number(state) } : {},
        vertical_market ? { vertical_market: Number(vertical_market) } : {},
        won_lost ? { won_lost } : {},
        status ? { status } : {},
        channel ? { channel: Number(channel) } : {},
        notes ? { notes: { contains: notes } } : {},
        date_from ? { created_date: { gte: new Date(date_from) } } : {},
        date_to ? { created_date: { lte: new Date(date_to) } } : {},
      ],
    },
    include: {
      Sales_Org: true,
      State: true,
      Region: true,
      Vertical_Market: true,
      Channel: true,
      Employees_Project_created_byToEmployees: true,
      Employees_Project_modified_byToEmployees: true,
    },
  });

  res.json(result);
  res.status(405).end();
}
