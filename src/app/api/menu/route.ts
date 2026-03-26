import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Menu from '@/models/Menu';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/config';

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    // Get current week
    const now = new Date();
    const year = now.getFullYear();
    const week = getWeekNumber(now);
    const currentWeek = `${year}-W${week.toString().padStart(2, '0')}`;

    // Default menu if no custom menu exists
    const defaultMenu = [
      {
        day: 'monday',
        breakfast: 'Semiya Kichadi + Chutney/Sambar',
        lunch: 'Rice + Sambar + Poriyal + Rasam + Mor + Muttai/Muttai Masala',
        dinner: 'Rice + Sambar + Vegetable'
      },
      {
        day: 'tuesday',
        breakfast: 'Poori + Masala',
        lunch: 'Veg Biryani + Veg Kuruma + Egg',
        dinner: 'Idli + Sambar + Chutney'
      },
      {
        day: 'wednesday',
        breakfast: 'Idli + Sambar + Chutney',
        lunch: 'Rice + Mutton/Chicken Kuruma + Mor',
        dinner: 'Veg Pulav + Kuruma/Raitha'
      },
      {
        day: 'thursday',
        breakfast: 'Idli + Sambar + Chutney',
        lunch: 'Tomato/Lemon/Curd Rice + Potato Poriyal + Egg',
        dinner: 'Othappam + Chutney + Sambar'
      },
      {
        day: 'friday',
        breakfast: 'Pongal/Varagu Pongal + Kathirikai Kozhju + Vada',
        lunch: 'Rice + Kara Kulambu + Poriyal/Koottu + Rasam + Mor + Egg',
        dinner: 'Wheat Dosa + Tomato Chutney'
      },
      {
        day: 'saturday',
        breakfast: 'Rava Kichadi + Coconut Chutney',
        lunch: 'Pudhina/Carrot/Curry Leaf Rice + Egg + Appalam/Paruppu Sadam',
        dinner: 'Rice + Sambar + Vegetable'
      },
      {
        day: 'sunday',
        breakfast: 'Dosa/Navadhaniya Dosa + Sambar + Chutney',
        lunch: 'Rice + Veg Kuruma + Rasam + Mor',
        dinner: 'Tomato/Sambar Rice + Varuval'
      }
    ];

    return NextResponse.json({
      success: true,
      menu: defaultMenu,
      week: currentWeek
    });

  } catch (error: any) {
    console.error('Menu fetch error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch menu', 
      details: error.message 
    }, { status: 500 });
  }
}

function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}