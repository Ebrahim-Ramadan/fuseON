import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return new Response(JSON.stringify({ error: 'userId parameter is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const client = await clientPromise;
        const db = client.db('users');
        const usersCollection = db.collection('users');

        let query;
        if (ObjectId.isValid(userId)) {
            query = { _id: new ObjectId(userId) };
        } else {
            query = { UniversityID: userId };
        }

        const result = await usersCollection.deleteOne(query);

        if (result.deletedCount === 1) {
            return new Response(JSON.stringify({ 
                message: 'User deleted successfully'
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ 
                message: 'User not found'
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error('Error in DELETE request:', error);

        return new Response(JSON.stringify({ 
            error: 'Failed to delete user',
            details: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}