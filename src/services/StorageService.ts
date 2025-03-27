import { Request, Response } from 'express';
import { BlobServiceClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('documents');

// Secure, encrypted blob storage for document content
export const uploadDocument = async (req: Request, res: Response) => {
  const { content } = req.body;
  const blobName = uuidv4();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.upload(content, content.length, {
      blobHTTPHeaders: { blobContentType: 'application/octet-stream' },
    });
    res.status(201).send({ blobName });
  } catch (error) {
    res.status(500).send('Error uploading document');
  }
};

// Structured storage for document metadata
const metadataStore = new Map();

export const storeMetadata = (req: Request, res: Response) => {
  const { blobName, metadata } = req.body;
  metadataStore.set(blobName, metadata);
  res.status(201).send('Metadata stored');
};

export const getMetadata = (req: Request, res: Response) => {
  const { blobName } = req.params;
  if (metadataStore.has(blobName)) {
    res.json(metadataStore.get(blobName));
  } else {
    res.status(404).send('Metadata not found');
  }
};

// Versioning and history tracking
const versionStore = new Map();

export const addVersion = (req: Request, res: Response) => {
  const { blobName, versionContent } = req.body;
  if (!versionStore.has(blobName)) {
    versionStore.set(blobName, []);
  }
  const versions = versionStore.get(blobName);
  versions.push({ version: versions.length + 1, content: versionContent });
  res.status(201).send('Version added');
};

export const getVersions = (req: Request, res: Response) => {
  const { blobName } = req.params;
  if (versionStore.has(blobName)) {
    res.json(versionStore.get(blobName));
  } else {
    res.status(404).send('Versions not found');
  }
};
