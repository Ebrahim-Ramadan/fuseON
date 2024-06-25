import clientPromise from "@/lib/mongodb";

export const dynamic = 'auto';

export async function GET(request) {
    try {
        const url = new URL(request.url);
        const Email = url.searchParams.get('Email');
        const Password = url.searchParams.get('Password');

        if (!Email || !Password) {
            return new Response(JSON.stringify({ error: 'Email and password are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const client = await clientPromise;
        const db = client.db('users');
        const usersCollection = db.collection('users');
        const userData = await usersCollection.findOne({ Email: Email, Password: Password });

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
