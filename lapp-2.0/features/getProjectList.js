import { prisma } from "@/utils/_prisma";

export default async function getProjectList() {
  const projects = await prisma.project.findMany({
    where: { is_active: true },
    include: {
      Sales_Org: true,
      Region: true,
      Channel: true,
      Vertical_Market: true,
      State: true,
      Employees_Project_created_byToEmployees: true,
      Employees_Project_modified_byToEmployees: true,
    },
    take: 10,
    orderBy: { project_id: "desc" },
  });

  const state = await prisma.state.findMany();
  const vertical_market = await prisma.vertical_Market.findMany();
  const region = await prisma.region.findMany();
  const channel = await prisma.channel.findMany();
  const sales_org = await prisma.sales_Org.findMany();

  return { projects, state, vertical_market, region, channel, sales_org };
}
