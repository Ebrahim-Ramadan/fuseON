import { blogsData } from "./blogsData"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    // console.log('searchParams' , searchParams);
   
    return Response.json({ blogsOverview: blogsData })
  }