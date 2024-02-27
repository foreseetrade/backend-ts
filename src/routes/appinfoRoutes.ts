// appInfoRoutes.ts
import express, { Request, Response } from 'express';
import * as appInfoService from '../services/appInfoService';

const router = express.Router();

router.post('/app-info', async (req, res) => {
  const { appName, appVersion } = req.body;

  try {
    const newAppInfo = await appInfoService.createAppInfo(appName, appVersion);
    res.status(201).json(newAppInfo);
  } catch (error) {
    console.error('Error creating app information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/app-info', async (req, res) => {
  try {
    const appInfoList = await appInfoService.getAllAppInfo();
    res.status(200).json(appInfoList);
  } catch (error) {
    console.error('Error fetching app information:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
