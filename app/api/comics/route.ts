import { NextResponse, type NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
 
const prisma = new PrismaClient();

// Client side fetching, get request.
export async function GET(request: NextRequest) {
	let allGradedComics = await prisma.comics_graded.findMany();
	return NextResponse.json(allGradedComics);
}

// Client side fetching, post request.
export async function POST(request: NextRequest) {
	let postData = await request.json();
	let allGradedComics = await prisma.comics_graded.findMany();
	return NextResponse.json(allGradedComics);
}
