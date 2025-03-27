import { Request, Response } from 'express';
import { Client } from '@elastic/elasticsearch';

const client = new Client({ node: process.env.ELASTICSEARCH_NODE });

// Full-text search capabilities
export const fullTextSearch = async (req: Request, res: Response) => {
  const { query } = req.body;
  try {
    const result = await client.search({
      index: 'documents',
      body: {
        query: {
          match: { content: query },
        },
      },
    });
    res.json(result.hits.hits);
  } catch (error) {
    res.status(500).send('Error performing full-text search');
  }
};

// Faceted search and filtering
export const facetedSearch = async (req: Request, res: Response) => {
  const { query, filters } = req.body;
  try {
    const result = await client.search({
      index: 'documents',
      body: {
        query: {
          bool: {
            must: {
              match: { content: query },
            },
            filter: filters.map((filter: any) => ({
              term: { [filter.field]: filter.value },
            })),
          },
        },
      },
    });
    res.json(result.hits.hits);
  } catch (error) {
    res.status(500).send('Error performing faceted search');
  }
};

// Relevance ranking
export const relevanceRanking = async (req: Request, res: Response) => {
  const { query } = req.body;
  try {
    const result = await client.search({
      index: 'documents',
      body: {
        query: {
          match: { content: query },
        },
        sort: [
          { _score: { order: 'desc' } },
        ],
      },
    });
    res.json(result.hits.hits);
  } catch (error) {
    res.status(500).send('Error performing relevance ranking');
  }
};

// Taxonomy Service: Manages controlled vocabularies and classification schemes
const taxonomyStore = new Map();

export const addTaxonomy = (req: Request, res: Response) => {
  const { id, taxonomy } = req.body;
  taxonomyStore.set(id, taxonomy);
  res.status(201).send('Taxonomy added');
};

export const getTaxonomy = (req: Request, res: Response) => {
  const { id } = req.params;
  if (taxonomyStore.has(id)) {
    res.json(taxonomyStore.get(id));
  } else {
    res.status(404).send('Taxonomy not found');
  }
};
