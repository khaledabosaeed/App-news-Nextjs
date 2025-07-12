import { NextRequest, NextResponse } from "next/server";
import { getNews } from "../../services/news.service";
import { AllwoowllAll } from "../../data/catagory";
const GET = async (req: NextRequest) => {
    const params = req.nextUrl.searchParams;
    const catagory = params.get("category") || "global";
    const news = getNews(catagory);
    if (!AllwoowllAll.includes(catagory)) {
        return NextResponse.json(null, {
            status: 404,
            statusText: "catagory not found",
        }
        
        );
    }
    console.log(news);
    return new NextResponse(JSON.stringify(news), {
        status: 200,
          headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
    });
};
const POST = async () => {
    return NextResponse.json(
        { message: "accepted" },
        { status: 201 },
    );
};
export {
    GET,
    POST
}