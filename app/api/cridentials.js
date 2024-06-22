import clientPromise from "@/lib/mongodb";

export  async function usersCollection() {
    const client = await clientPromise;
    const db = client.db('users');
    return db.collection('users');
}