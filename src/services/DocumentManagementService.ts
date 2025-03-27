import { Request, Response, NextFunction } from 'express';

const documents = new Map(); // In-memory document store for demonstration purposes

// Document lifecycle management (creation, versioning, archiving)
export const createDocument = (req: Request, res: Response) => {
  const { id, content, metadata } = req.body;
  documents.set(id, { content, metadata, version: 1, archived: false });
  res.status(201).send('Document created');
};

export const updateDocument = (req: Request, res: Response) => {
  const { id, content, metadata } = req.body;
  if (documents.has(id)) {
    const doc = documents.get(id);
    doc.content = content;
    doc.metadata = metadata;
    doc.version += 1;
    documents.set(id, doc);
    res.send('Document updated');
  } else {
    res.status(404).send('Document not found');
  }
};

export const archiveDocument = (req: Request, res: Response) => {
  const { id } = req.body;
  if (documents.has(id)) {
    const doc = documents.get(id);
    doc.archived = true;
    documents.set(id, doc);
    res.send('Document archived');
  } else {
    res.status(404).send('Document not found');
  }
};

// Metadata management
export const getMetadata = (req: Request, res: Response) => {
  const { id } = req.params;
  if (documents.has(id)) {
    const doc = documents.get(id);
    res.json(doc.metadata);
  } else {
    res.status(404).send('Document not found');
  }
};

// Workflow orchestration for document approval processes
export const approveDocument = (req: Request, res: Response) => {
  const { id } = req.body;
  if (documents.has(id)) {
    const doc = documents.get(id);
    doc.metadata.approved = true;
    documents.set(id, doc);
    res.send('Document approved');
  } else {
    res.status(404).send('Document not found');
  }
};

// Check-in/check-out functionality
export const checkOutDocument = (req: Request, res: Response) => {
  const { id } = req.body;
  if (documents.has(id)) {
    const doc = documents.get(id);
    if (!doc.metadata.checkedOut) {
      doc.metadata.checkedOut = true;
      documents.set(id, doc);
      res.send('Document checked out');
    } else {
      res.status(400).send('Document already checked out');
    }
  } else {
    res.status(404).send('Document not found');
  }
};

export const checkInDocument = (req: Request, res: Response) => {
  const { id } = req.body;
  if (documents.has(id)) {
    const doc = documents.get(id);
    if (doc.metadata.checkedOut) {
      doc.metadata.checkedOut = false;
      documents.set(id, doc);
      res.send('Document checked in');
    } else {
      res.status(400).send('Document not checked out');
    }
  } else {
    res.status(404).send('Document not found');
  }
};
