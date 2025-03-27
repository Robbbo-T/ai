import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const logFilePath = path.join(__dirname, 'audit.log');

// Comprehensive activity logging
export const logActivity = (req: Request, res: Response, next: NextFunction) => {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - ${req.ip}\n`;
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to log activity:', err);
    }
  });
  next();
};

// Audit trails for compliance
export const getAuditTrail = (req: Request, res: Response) => {
  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Failed to retrieve audit trail');
    } else {
      res.send(data);
    }
  });
};

// System health monitoring
export const monitorSystemHealth = (req: Request, res: Response) => {
  const healthStatus = {
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
  };
  res.json(healthStatus);
};

// Security event tracking
export const trackSecurityEvent = (event: string) => {
  const logEntry = `${new Date().toISOString()} - SECURITY EVENT: ${event}\n`;
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to log security event:', err);
    }
  });
};
