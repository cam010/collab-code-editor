# CollabCode — Current Project State

> **Purpose:** Compact, frequently updated context for ChatGPT.
> This file records the current implementation state only.
> The full project specification contains the broader goals and roadmap.

---

## Project

**Name:** CollabCode

**Description:**  
A browser-based collaborative code editor/mini-IDE allowing multiple users to edit the same codebase simultaneously in real time.

**Primary goal:**  
Build a technically substantial CS portfolio project suitable for software engineering internship/placement applications.

**Current status:**  
Planning — implementation has not started.

---

## Current Phase

**Phase:** 1 — Basic Editor

**Status:** Not started.

### Current milestone

Create the initial repository and build a basic browser-based code editor using Monaco.

### Definition of done

- Repository created
- Frontend application running locally
- TypeScript configured
- Monaco Editor integrated
- User can type/edit code
- Basic language selection works
- Basic editor layout is functional
- README contains setup instructions

---

## Technology Decisions

These are currently agreed unless explicitly changed.

### Frontend
- TypeScript
- React
- Next.js
- Monaco Editor

### Backend
- Node.js
- TypeScript
- REST API
- WebSockets

### Database
- PostgreSQL

### Real-time collaboration
- Yjs / CRDT
- WebSocket transport

### Infrastructure
- Docker
- GitHub Actions / CI/CD

### Optional later infrastructure
- Redis

---

## Target Architecture

```text
Browser
  |
  | HTTP / WebSocket
  v
Backend API + WebSocket Server
  |
  +--> PostgreSQL
  |
  +--> Redis (later, if required)
  |
  +--> Sandboxed Code Runner
```

Current implementation:

```text
Not implemented yet.
```

---

## Implemented Features

### None

The project has not been implemented yet.

---

## Planned Features

### MVP

- [ ] Monaco code editor
- [ ] File creation/editing
- [ ] File persistence
- [ ] User authentication
- [ ] Workspaces
- [ ] Workspace members/permissions
- [ ] WebSocket communication
- [ ] Real-time collaborative editing
- [ ] CRDT-based synchronisation
- [ ] Remote cursors
- [ ] User presence
- [ ] Reconnection handling
- [ ] Basic code execution

### Advanced

- [ ] Version history
- [ ] Offline editing
- [ ] Multi-file project structure
- [ ] Browser terminal
- [ ] Redis Pub/Sub
- [ ] Horizontal WebSocket scaling
- [ ] AI coding assistant
- [ ] Advanced monitoring/observability

---

## Current Repository Structure

Not created yet.

Target structure:

```text
collab-code/
├── apps/
│   ├── web/
│   └── server/
├── packages/
│   ├── protocol/
│   ├── database/
│   └── shared/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── collaboration/
├── docker/
├── docker-compose.yml
├── README.md
└── package.json
```

This structure can be changed if implementation experience gives a good reason.

---

## Current Database

Not implemented.

Initial conceptual entities:

```text
users
workspaces
workspace_members
files
sessions
```

Do not treat the final schema as decided yet.

---

## Current WebSocket Design

Not implemented.

The planned system will use WebSockets for real-time communication.

Conceptual message types:

```text
join_document
edit
cursor_update
document_state
remote_edit
presence_update
```

The exact protocol is not final.

Do not assume specific message fields/types unless they have been implemented and recorded here.

---

## Collaboration Design

### Planned approach

Use **Yjs/CRDT** for the main implementation.

Reason:

- Handles concurrent edits
- Supports distributed replicas
- Avoids naive last-write-wins document replacement
- Provides a practical foundation for real-time collaboration

### Important principle

Do NOT implement collaboration by repeatedly sending the entire document and replacing the local copy.

The system must support concurrent edits without one user's changes silently overwriting another user's changes.

### Advanced option

Later, implement a simplified CRDT/OT algorithm independently for learning and interview discussion.

---

## Security Requirements

These are important architectural constraints.

### Code execution

Never execute arbitrary user code directly inside the main backend process.

Execution should eventually use an isolated sandbox/container with:

- CPU limits
- Memory limits
- Execution timeout
- Restricted filesystem
- Restricted/no network access

### Authentication

- Passwords must be securely hashed.
- Protected resources require authentication.
- Workspace permissions must be checked server-side.
- Never trust client-provided user IDs or roles.

### WebSockets

- Validate incoming messages.
- Authenticate connections.
- Authorise access to documents/workspaces.
- Handle malformed/malicious messages safely.

---

## Testing Goals

Testing has not started.

Eventually include:

### Unit tests
- Authentication
- Permissions
- File operations
- Collaboration logic
- Protocol validation

### Integration tests
- API + database
- WebSocket communication
- Persistence

### Collaboration tests

Simulate multiple clients making concurrent edits.

Important invariant:

```text
final_state(client_A)
==
final_state(client_B)
==
final_state(client_C)
```

after synchronisation.

Also test:

- Concurrent inserts
- Concurrent deletes
- Late joins
- Disconnect/reconnect
- Delayed messages
- Duplicate messages
- Malformed messages
- Unauthorised access

---

## Deployment

Not implemented.

Planned:

```text
Frontend
Backend/API/WebSocket server
PostgreSQL
Redis (if needed)
Code execution infrastructure
```

Docker and CI/CD should be introduced once the application has enough functionality to benefit from them.

---

## Known Unresolved Decisions

These are intentionally NOT final:

- Backend framework: Express / Fastify / NestJS / other
- Authentication/session strategy
- Exact PostgreSQL schema
- Exact WebSocket protocol
- Exact Yjs persistence strategy
- Deployment provider
- Redis architecture
- Code execution implementation
- Whether to use a monorepo
- Exact UI design

Do not present these as settled decisions.

---

## Recent Changes

### Initial state — 2026-09-14

- Project concept established.
- High-level specification created.
- Technology direction established.
- Development roadmap established.
- No implementation yet.

---

## Current Task

**Set up the initial CollabCode repository and build the basic Monaco editor.**

Suggested immediate sequence:

1. Create repository.
2. Initialise Next.js + TypeScript.
3. Establish initial folder structure.
4. Install/configure Monaco Editor.
5. Create basic editor page.
6. Add basic language selector.
7. Verify local development workflow.
8. Commit initial working version.
9. Update this file with the actual implementation state.

---

## Next Tasks

After the basic editor works:

1. Decide/implement initial file model.
2. Add backend.
3. Add PostgreSQL persistence.
4. Implement workspaces/files.
5. Add authentication.
6. Add WebSocket infrastructure.
7. Implement collaboration with Yjs.

---

## Known Bugs

None.

---

## Important Context Rules for ChatGPT

When using this file as context:

1. Treat **Implemented Features** as authoritative.
2. Treat **Current Task** as the immediate priority.
3. Treat **Unresolved Decisions** as unresolved.
4. Do not assume planned features have been implemented.
5. Do not invent files, APIs, database tables, code, test results or deployment details.
6. If existing implementation details are required but missing, ask for the relevant code/files rather than guessing.
7. Prefer incremental changes over unnecessary rewrites.
8. Preserve existing architectural decisions unless there is a concrete reason to change them.
9. When proposing a change to architecture or technology, explicitly identify it as a proposal.
10. Security concerns must be considered for authentication, WebSockets and arbitrary code execution.
11. Code examples should specify the intended file/path when relevant.
12. Keep the project's purpose in mind: a strong CS/software-engineering internship portfolio project.
13. Prioritise technically meaningful features over superficial CV buzzwords.

---

## Update Protocol

After completing a meaningful task, update this file.

At minimum update:

- Current Phase
- Current Task
- Implemented Features
- Repository Structure
- Technology Decisions if changed
- Known Bugs
- Recent Changes
- Next Tasks

Do NOT remove historical decisions without recording why they changed.

When a planned feature becomes implemented, move it from:

```text
Planned Features
```

to:

```text
Implemented Features
```

or mark it clearly as implemented.

---

## Context Reset Template

When starting a new ChatGPT conversation, use:

> Use `PROJECT_STATE.md` as the authoritative current state for my CollabCode project.
>
> Do not assume anything is implemented unless it appears under "Implemented Features".
> Do not treat unresolved decisions as final.
> If information is missing, ask me for the relevant code or details rather than guessing.
>
> My current task is:
>
> **[INSERT TASK HERE]**
>
> Here is the current project state:
>
> [PASTE PROJECT_STATE.md]

Then provide only the relevant code/files/errors needed for the task.