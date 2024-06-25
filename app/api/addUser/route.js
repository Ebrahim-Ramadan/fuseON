import clientPromise from "@/lib/mongodb";

export async function POST(request) {
    try {
        const { searchParams } = new URL(request.url);
        const UniversityID = searchParams.get('UniversityID');
        const UserName = searchParams.get('UserName');
        const Email = searchParams.get('Email');
        const Password = searchParams.get('Password');

        if (!UniversityID || !UserName) {
            return new Response(JSON.stringify({ error: 'ID and UserName parameters are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const client = await clientPromise;
        const db = client.db('users');
        const usersCollection = db.collection('users');

        // Check if a user with the same UniversityID already exists
        const existingUser = await usersCollection.findOne({ UniversityID: UniversityID });
        if (existingUser) {
            return new Response(JSON.stringify({ 
                error: 'User with this UniversityID already exists',
                existingUser: existingUser
            }), {
                status: 409,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const userObj = {
            UniversityID,
            UserName,
            Email,
            Password,
        };

        const result = await usersCollection.insertOne(userObj);

        if (result.acknowledged && result.insertedId) {
            return new Response(JSON.stringify({ 
                message: 'User inserted successfully',
                insertedId: result.insertedId 
            }), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            throw new Error('Insert operation was not acknowledged');
        }
    } catch (error) {
        console.error('Error in POST request:', error);

        let statusCode = 500;
        if (error.name === 'MongoServerError' && error.code === 11000) {
            statusCode = 409; // Conflict - likely a duplicate key error
        }

        return new Response(JSON.stringify({ 
            error: 'Failed to insert user',
            details: error.message
        }), {
            status: statusCode,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}