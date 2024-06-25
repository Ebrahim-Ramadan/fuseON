import clientPromise from "@/lib/mongodb";

export const dynamic = 'auto';



export async function GET(request) {
    if (request.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    try {
       
        const { Email, Password } = await request.json();
        if (!Email || !Password) {
            return new Response(JSON.stringify({ error: 'Email and password are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        const client = await clientPromise;
        const db = client.db('users');
        const usersCollection = db.collection('users');
        // Fetch the document with the matching ID
        const userData = await usersCollection.findOne({ Email:Email, Password:Password });

        if (!userData) {
            return new Response(JSON.stringify({ error: 'User not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        console.log('userData', userData);
        return new Response(JSON.stringify({ userData: userData }), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch user data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
