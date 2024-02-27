// faqRoutes.ts
import express, { Request, Response } from 'express';
import * as faqService from '../services/faqService';

const router = express.Router();

router.post('/faqs', async (req, res) => {
  const { question, answer } = req.body;

  try {
    const newFAQ = await faqService.createFAQ(question, answer);
    res.status(201).json(newFAQ);
  } catch (error) {
    console.error('Error creating FAQ:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/faqs', async (req, res) => {
  try {
    const faqList = await faqService.getAllFAQs();
    res.status(200).json(faqList);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
