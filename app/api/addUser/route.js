import { usersCollection } from "@/app/api/cridentials";

export async function POST(request) {
    const { searchParams } = new URL(request.url);
    const UniversityID = searchParams.get('UniversityID');
    const UserName = searchParams.get('UserName');

    if (!UniversityID || !UserName) {
        return new Response(JSON.stringify({ error: 'ID and UserName parameters are required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const userObj = {
        UniversityID: UniversityID,
        UserName: UserName
    }
    usersCollection.insertOne(userObj)
  .then(result => console.log(`Successfully inserted item with _id: ${result.insertedId}`))
  .catch(err => console.error(`Failed to insert item: ${err}`))
}