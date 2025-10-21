export async function GET() {
    console.log("hello from api route");
    
    return  Response.json(
      { massage: "Hello, Next.js!" },
      {
        status: 200,
      }
    );
}