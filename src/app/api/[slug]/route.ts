import { NextRequest, NextResponse } from 'next/server';
import { getArticl } from '../../services/news.service';


const GET = async (request: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
    const slug = (await params).slug;
    const artical = getArticl(slug);
    return new NextResponse(JSON.stringify(artical), {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}
export { GET };