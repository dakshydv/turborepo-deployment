import { prismaClient } from "db/client"

export default async function Home() {
  const user = await prismaClient.user.findMany()
  return (
    <div>
      {JSON.stringify(user)}
    </div>
  );
}
