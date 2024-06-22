import clientPromise from "@/lib/mongodb"

export async function GET(request) {
    const client = await clientPromise;
  const db = client.db('users');
  const usersData = await client
  .db()
  .collection('users')
   console.log('usersData', usersData);
    return Response.json({ ass: 'ass' })
  }