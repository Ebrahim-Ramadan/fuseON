import { usersCollection } from "@/app/api/cridentials";
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const UniversityID = searchParams.get('UniversityID');

        if (!UniversityID) {
            return new Response(JSON.stringify({ error: 'ID parameter is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        
        // Fetch the document with the matching ID
        const userData = await usersCollection.findOne({ UniversityID: UniversityID });

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
