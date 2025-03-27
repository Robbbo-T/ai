![hero illustration](./assets/hero.gif)

# AI SDK

The [AI SDK](https://sdk.vercel.ai/docs) is a TypeScript toolkit designed to help you build AI-powered applications using popular frameworks like Next.js, React, Svelte, Vue and runtimes like Node.js.

To learn more about how to use the AI SDK, check out our [API Reference](https://sdk.vercel.ai/docs/reference) and [Documentation](https://sdk.vercel.ai/docs).

## Installation

You will need Node.js 18+ and pnpm installed on your local development machine.

```shell
npm install ai
```

## Usage

### AI SDK Core

The [AI SDK Core](https://sdk.vercel.ai/docs/ai-sdk-core/overview) module provides a unified API to interact with model providers like [OpenAI](https://sdk.vercel.ai/providers/ai-sdk-providers/openai), [Anthropic](https://sdk.vercel.ai/providers/ai-sdk-providers/anthropic), [Google](https://sdk.vercel.ai/providers/ai-sdk-providers/google-generative-ai), and more.

You will then install the model provider of your choice.

```shell
npm install @ai-sdk/openai
```

###### @/index.ts (Node.js Runtime)

```ts
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai'; // Ensure OPENAI_API_KEY environment variable is set

const { text } = await generateText({
  model: openai('gpt-4o'),
  system: 'You are a friendly assistant!',
  prompt: 'Why is the sky blue?',
});

console.log(text);
```

### AI SDK UI

The [AI SDK UI](https://sdk.vercel.ai/docs/ai-sdk-ui/overview) module provides a set of hooks that help you build chatbots and generative user interfaces. These hooks are framework agnostic, so they can be used in Next.js, React, Svelte, and Vue.

You need to install the package for your framework:

```shell
npm install @ai-sdk/react
```

###### @/app/page.tsx (Next.js App Router)

```tsx
'use client';

import { useChat } from '@ai-sdk/react';

export default function Page() {
  const { messages, input, handleSubmit, handleInputChange, status } =
    useChat();

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <strong>{`${message.role}: `}</strong>
          {message.parts.map((part, index) => {
            switch (part.type) {
              case 'text':
                return <span key={index}>{part.text}</span>;

              // other cases can handle images, tool calls, etc
            }
          })}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
          disabled={status !== 'ready'}
        />
      </form>
    </div>
  );
}
```

###### @/app/api/chat/route.ts (Next.js App Router)

```ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}
```

## Templates

We've built [templates](https://vercel.com/templates?type=ai) that include AI SDK integrations for different use cases, providers, and frameworks. You can use these templates to get started with your AI-powered application.

## Community

The AI SDK community can be found on [GitHub Discussions](https://github.com/vercel/ai/discussions) where you can ask questions, voice ideas, and share your projects with other people.

## Contributing

Contributions to the AI SDK are welcome and highly appreciated. However, before you jump right into it, we would like you to review our [Contribution Guidelines](https://github.com/vercel/ai/blob/main/CONTRIBUTING.md) to make sure you have smooth experience contributing to AI SDK.

## Authors

This library is created by [Vercel](https://vercel.com) and [Next.js](https://nextjs.org) team members, with contributions from the [Open Source Community](https://github.com/vercel/ai/graphs/contributors).

## Secure Virtual Knowledge Repository Architecture

Below is a comprehensive architecture for a secure, scalable virtual knowledge repository designed to manage business-critical technical documentation.

### Architecture Overview

```mermaid
Knowledge Repository Architecture.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-r2qu7{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-r2qu7 .error-icon{fill:#552222;}#mermaid-diagram-r2qu7 .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-r2qu7 .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-r2qu7 .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-r2qu7 .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-r2qu7 .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-r2qu7 .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-r2qu7 .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-r2qu7 .marker{fill:#666;stroke:#666;}#mermaid-diagram-r2qu7 .marker.cross{stroke:#666;}#mermaid-diagram-r2qu7 svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-r2qu7 p{margin:0;}#mermaid-diagram-r2qu7 .label{font-family:var(--font-geist-sans);color:#000000;}#mermaid-diagram-r2qu7 .cluster-label text{fill:#333;}#mermaid-diagram-r2qu7 .cluster-label span{color:#333;}#mermaid-diagram-r2qu7 .cluster-label span p{background-color:transparent;}#mermaid-diagram-r2qu7 .label text,#mermaid-diagram-r2qu7 span{fill:#000000;color:#000000;}#mermaid-diagram-r2qu7 .node rect,#mermaid-diagram-r2qu7 .node circle,#mermaid-diagram-r2qu7 .node ellipse,#mermaid-diagram-r2qu7 .node polygon,#mermaid-diagram-r2qu7 .node path{fill:#eee;stroke:#999;stroke-width:1px;}#mermaid-diagram-r2qu7 .rough-node .label text,#mermaid-diagram-r2qu7 .node .label text{text-anchor:middle;}#mermaid-diagram-r2qu7 .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-diagram-r2qu7 .node .label{text-align:center;}#mermaid-diagram-r2qu7 .node.clickable{cursor:pointer;}#mermaid-diagram-r2qu7 .arrowheadPath{fill:#333333;}#mermaid-diagram-r2qu7 .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-diagram-r2qu7 .flowchart-link{stroke:#666;fill:none;}#mermaid-diagram-r2qu7 .edgeLabel{background-color:white;text-align:center;}#mermaid-diagram-r2qu7 .edgeLabel p{background-color:white;}#mermaid-diagram-r2qu7 .edgeLabel rect{opacity:0.5;background-color:white;fill:white;}#mermaid-diagram-r2qu7 .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#mermaid-diagram-r2qu7 .cluster rect{fill:hsl(0, 0%, 98.9215686275%);stroke:#707070;stroke-width:1px;}#mermaid-diagram-r2qu7 .cluster text{fill:#333;}#mermaid-diagram-r2qu7 .cluster span{color:#333;}#mermaid-diagram-r2qu7 div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:var(--font-geist-sans);font-size:12px;background:hsl(-160, 0%, 93.3333333333%);border:1px solid #707070;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-diagram-r2qu7 .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-r2qu7 .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-r2qu7 .marker,#mermaid-diagram-r2qu7 marker,#mermaid-diagram-r2qu7 marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r2qu7 .label,#mermaid-diagram-r2qu7 text,#mermaid-diagram-r2qu7 text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-r2qu7 .background,#mermaid-diagram-r2qu7 rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-r2qu7 .entityBox,#mermaid-diagram-r2qu7 .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-r2qu7 .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-r2qu7 .label-container,#mermaid-diagram-r2qu7 rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r2qu7 line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-r2qu7 :root{--mermaid-font-family:var(--font-geist-sans);}Web Portal / UIAPI GatewayMobile ClientIntegration ClientsAuthentication & AuthorizationServiceDocument Management ServiceValidation EngineSearch & Discovery ServiceNotification ServiceDocument Processing PipelineFormat ConversionMetadata ExtractionContent AnalysisRules EngineStandards Compliance CheckerQuality Assurance ModuleDocument StorageBlob StorageMetadata DatabaseSearch IndexTaxonomy ServiceAudit & LoggingSecurity LayerAnalytics & Reporting
```

### Core Components

#### 1. User Interface Layer

- **Web Portal**: Primary interface for document management, search, and administration
- **Mobile Client**: Responsive interface for on-the-go access
- **Integration Clients**: APIs for third-party system integration

#### 2. API Gateway

- Centralized entry point for all client requests
- Request routing, composition, and protocol translation
- Rate limiting and request throttling
- Initial security validation

#### 3. Authentication & Authorization Service

- Multi-factor authentication
- Role-based access control (RBAC)
- Single sign-on (SSO) integration
- Fine-grained permission management for document access

#### 4. Document Management Service

- Document lifecycle management (creation, versioning, archiving)
- Metadata management
- Workflow orchestration for document approval processes
- Check-in/check-out functionality

#### 5. Document Processing Pipeline

- **Format Conversion**: Transforms documents between formats (PDF, XML, SGML, etc.)
- **Metadata Extraction**: Automatically extracts metadata from documents
- **Content Analysis**: Identifies document structure, components, and relationships

#### 6. Validation Engine

- **Rules Engine**: Configurable business rules for document validation
- **Standards Compliance Checker**: Validates against industry standards (S1000D, etc.)
- **Quality Assurance Module**: Ensures documents meet quality guidelines

#### 7. Storage Layer

- **Blob Storage**: Secure, encrypted storage for document content
- **Metadata Database**: Structured storage for document metadata
- Versioning and history tracking

#### 8. Search & Discovery Service

- Full-text search capabilities
- Faceted search and filtering
- Relevance ranking
- **Taxonomy Service**: Manages controlled vocabularies and classification schemes

#### 9. Security Layer (Cross-Cutting)

- Data encryption (at rest and in transit)
- Vulnerability scanning
- Intrusion detection
- Data loss prevention

#### 10. Audit & Logging (Cross-Cutting)

- Comprehensive activity logging
- Audit trails for compliance
- System health monitoring
- Security event tracking

#### 11. Analytics & Reporting

- Usage analytics
- Compliance reporting
- Performance metrics
- Custom report generation

### Data Flow

1. **Document Ingestion**:

1. Documents are uploaded via UI or API
2. Initial validation checks format and basic structure
3. Document is processed through the pipeline

2. **Processing & Validation**:

1. Document is converted to standard format if needed
2. Metadata is extracted and stored
3. Content is analyzed for structure and components
4. Validation against business rules and standards
5. Feedback provided for non-compliant documents

3. **Storage**:

1. Document content stored in encrypted blob storage
2. Metadata stored in structured database
3. Indexing for search capabilities

4. **Retrieval & Usage**:

1. Authenticated users search for documents
2. Access control enforced based on user permissions
3. Document served to user with appropriate viewing controls

### Security Considerations

- **Zero Trust Architecture**: Verify every access request regardless of source
- **Defense in Depth**: Multiple security layers throughout the system
- **Least Privilege**: Users have minimum access needed for their role
- **Data Classification**: Documents tagged with sensitivity levels
- **Regular Security Audits**: Scheduled penetration testing and security reviews

### Scalability Features

- Containerized microservices for horizontal scaling
- Distributed caching for frequently accessed documents
- Auto-scaling based on system load
- Content delivery network (CDN) for global access
- Database sharding for metadata storage

### Implementation Recommendations

1. **Technology Stack**:

1. Cloud-native architecture (AWS, Azure, or GCP)
2. Containerization with Kubernetes for orchestration
3. Elasticsearch for search functionality
4. PostgreSQL or MongoDB for metadata storage
5. Redis for caching
6. Identity provider integration (Auth0, Okta, etc.)

2. **Development Approach**:

1. API-first design methodology
2. Continuous Integration/Continuous Deployment (CI/CD)
3. Infrastructure as Code (IaC)
4. Automated testing at all levels

3. **Compliance & Standards**:

1. GDPR/CCPA compliance for personal data
2. ISO 27001 for information security
3. Industry-specific compliance (aerospace, defense, etc.)

This architecture provides a robust foundation for a secure, scalable knowledge repository that can handle diverse document types while maintaining strict security and validation requirements.
