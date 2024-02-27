// faqService.ts
import prisma from '../database/prisma';

export const createFAQ = async (question: string, answer: string): Promise<any> => {
  try {
    const newFAQ = await prisma.fAQ.create({
      data: {
        question,
        answer,
      },
    });

    return newFAQ;
  } catch (error) {
    throw new Error('Error creating FAQ');
  }
};

export const getAllFAQs = async (): Promise<any> => {
  try {
    const faqList = await prisma.fAQ.findMany();
    return faqList;
  } catch (error) {
    throw new Error('Error fetching FAQs');
  }
};
