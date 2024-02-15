import { prisma } from "../utils/_prisma";

export default async function getCreate() {
  const sales_org = await prisma.sales_Org.findMany();
  const vertical_market = await prisma.vertical_Market.findMany();
  const channel = await prisma.channel.findMany();
  const region = await prisma.region.findMany();
  const state = await prisma.state.findMany();

  return { sales_org, vertical_market, channel, region, state };
}
