# COLLABCODE — PROJECT CONTEXT

## Purpose

CollabCode is a portfolio project designed for CS software engineering internships/placements.

It is a browser-based collaborative code editor/mini-IDE where multiple users can edit the same codebase simultaneously in real time.

The project should demonstrate:
- Software engineering
- Data structures and algorithms
- Networking
- Concurrency/distributed systems concepts
- Databases
- Testing
- Security
- Deployment/DevOps
- Modern web development

The project should prioritise technical depth and interview discussion value over excessive feature count.

---

# 1. Core Product

Users should be able to:

1. Create an account.
2. Log in securely.
3. Create coding workspaces/projects.
4. Create and manage multiple files.
5. Invite other users to a workspace.
6. Edit the same file simultaneously.
7. See other users' cursors/selections/presence in real time.
8. Have concurrent edits synchronised without users overwriting each other's changes.
9. Save/persist projects.
10. Reconnect after temporary network failure without losing changes.
11. Run code in a sandboxed environment.
12. View stdout/stderr/results.

The defining feature is reliable real-time collaborative editing.

---

# 2. Target Technical Stack

Preferred stack unless there is a strong technical reason to change it:

Frontend:
- TypeScript
- React
- Next.js
- Monaco Editor

Backend:
- Node.js
- TypeScript
- REST API
- WebSockets

Database:
- PostgreSQL

Real-time/distributed infrastructure:
- Redis
- WebSocket server

Infrastructure:
- Docker
- GitHub Actions / CI
- Cloud deployment

Collaboration:
- Prefer Yjs/CRDT for the initial production implementation.
- Understand the underlying CRDT concepts rather than treating Yjs as magic.
- Optionally implement a simplified collaborative text algorithm independently as an advanced learning feature.

Code execution:
- Isolated sandbox/container
- Strict CPU/memory/time limits
- No unrestricted network access
- Never execute arbitrary user code directly inside the main backend process.

---

# 3. High-Level Architecture

Target architecture:

Browser
  |
  | HTTP / WebSocket
  v
Backend API + WebSocket server
  |
  +--> PostgreSQL
  |
  +--> Redis
  |
  +--> Code execution/job system
           |
           v
       Isolated sandbox

Frontend responsibilities:
- UI
- Monaco editor
- Local editor state
- WebSocket connection
- Collaborative document state
- Presence/cursor display
- File/workspace navigation

Backend responsibilities:
- Authentication
- Authorisation
- Workspace/file APIs
- WebSocket connections
- Collaboration coordination
- Persistence
- Presence/session management
- Code execution orchestration

PostgreSQL:
- Durable application data

Redis:
- Initially optional.
- Later used for Pub/Sub, presence/session state and potentially scaling multiple WebSocket server instances.

---

# 4. Database Model

Initial conceptual schema:

users
- id
- username
- email
- password_hash
- created_at

workspaces
- id
- name
- owner_id
- created_at

workspace_members
- workspace_id
- user_id
- role

files
- id
- workspace_id
- name
- language
- content / persisted collaboration state
- created_at
- updated_at

sessions
- id
- workspace_id
- user_id
- connection information / metadata as appropriate

Additional tables may be introduced for:
- version history
- audit/event history
- invitations
- code execution jobs
- refresh tokens/sessions

Do not over-engineer the database before the core product works.

---

# 5. Collaboration Model

The application must NOT rely on repeatedly sending/replacing the entire document as the primary synchronisation mechanism.

Naive model:

client -> entire document -> server -> entire document to clients

Problem:
Concurrent edits can overwrite each other.

Instead, use a collaborative data model such as CRDT.

Preferred initial approach:
- Yjs
- WebSocket transport
- Persist collaboration state appropriately
- Synchronise document updates between clients

Important concepts to understand:
- Concurrent operations
- Replicas
- Conflict resolution
- Eventual consistency
- Idempotency
- Ordering
- Network disconnect/reconnect
- Presence vs durable document state

Potential advanced learning:
- Implement a simplified text CRDT or OT algorithm separately.
- Use it to demonstrate understanding in interviews.
- It does not need to replace Yjs in the main application.

---

# 6. WebSocket Protocol

Use an explicit message protocol rather than arbitrary WebSocket messages.

Conceptual client -> server messages:

{
  "type": "join_document",
  "documentId": "..."
}

{
  "type": "edit",
  "documentId": "...",
  "operation": "..."
}

{
  "type": "cursor_update",
  "documentId": "...",
  "position": "..."
}

Conceptual server -> client messages:

{
  "type": "document_state",
  "documentId": "...",
  "state": "..."
}

{
  "type": "remote_edit",
  "userId": "...",
  "operation": "..."
}

{
  "type": "presence_update",
  "users": []
}

The exact protocol can evolve during implementation.

Do not invent protocol details that have not been decided. Clearly distinguish:
- Current implementation
- Planned feature
- Suggested improvement

---

# 7. Functional Requirements

## Authentication
- User registration
- Login/logout
- Secure password hashing
- Authenticated sessions
- Protected resources

## Workspaces
- Create workspace
- Rename workspace
- Delete workspace
- Add/remove members
- Member roles/permissions

## Files
- Create file
- Rename file
- Delete file
- Open file
- Persist file
- Support multiple programming languages

## Collaboration
- Multiple users can join the same document
- Real-time edits
- Concurrent edits do not overwrite each other
- Cursor synchronisation
- User presence
- Reconnection
- Consistent final document state

## Code execution
- Run selected project/file
- Isolated execution
- Capture stdout/stderr
- Timeout
- Resource limits
- Return execution result

---

# 8. Non-Functional Requirements

The application should prioritise:

## Correctness
Concurrent edits must converge to the same document state.

## Reliability
Temporary WebSocket/network failures should not destroy user work.

## Security
- Never execute arbitrary code directly on the main application server.
- Validate and authorise workspace/file access.
- Secure authentication credentials.
- Validate WebSocket messages.
- Apply execution resource limits.
- Do not trust client-provided user IDs/permissions.

## Performance
The editor should feel responsive during normal collaborative editing.

Avoid unnecessary full-document transfers.

## Maintainability
- TypeScript throughout frontend/backend where practical.
- Clear module boundaries.
- Reusable components.
- Meaningful naming.
- Automated tests.
- Good README/documentation.

---

# 9. Development Roadmap

## Phase 1 — Basic Editor

Build:
- Next.js/React application
- Monaco Editor
- Basic file UI
- Language selection
- Basic local editing

Goal:
A functioning browser-based code editor.

---

## Phase 2 — Backend + Persistence

Build:
- Node.js/TypeScript backend
- PostgreSQL
- Workspace model
- File model
- REST API
- Save/load files

Goal:
Projects persist between sessions.

---

## Phase 3 — Authentication

Build:
- Registration
- Login
- Logout
- Password hashing
- Sessions/authentication
- Protected API routes
- Workspace permissions

Goal:
Multiple independent users can securely use the application.

---

## Phase 4 — WebSockets

Build:
- WebSocket server
- Connection management
- Join/leave document
- Basic real-time messaging
- Client/server protocol

Goal:
Two browser tabs can communicate through the server.

---

## Phase 5 — Real-Time Collaboration

Build:
- Yjs/CRDT integration
- Collaborative document state
- WebSocket synchronisation
- Concurrent edit handling
- Persistence

Critical milestone:

Two browser tabs connected to the same document can type simultaneously and reliably converge to the same document.

---

## Phase 6 — Presence

Build:
- Online users
- Usernames
- Remote cursors
- Selections
- Typing/activity indicators
- Join/leave notifications

Goal:
Make collaboration visually obvious and polished.

---

## Phase 7 — Code Execution

Build:
- Execution API
- Job queue if appropriate
- Sandbox/container
- Resource limits
- Timeout
- stdout/stderr capture
- Results UI

Security is more important than convenience.

---

## Phase 8 — Testing

Unit tests:
- Authentication
- Permissions
- File operations
- Collaboration logic
- Protocol validation

Integration tests:
- API/database
- WebSocket connections
- Persistence

Collaboration tests:
- Simulate multiple clients
- Perform concurrent random edits
- Verify replicas converge

Important property:

final_state(client_A) == final_state(client_B)

after synchronisation.

---

## Phase 9 — Deployment

Add:
- Docker
- Environment configuration
- CI pipeline
- Automated tests
- Deployment
- Production database
- Logging/monitoring as appropriate

---

# 10. Advanced Features

Only implement these after the core collaboration system works.

Potential additions:

## Version history
- Store document versions/snapshots
- View history
- Restore previous versions
- Diff changes

## Offline editing
- Continue editing while disconnected
- Queue/localise changes
- Reconcile after reconnecting

## Multi-file projects
Example:

project/
  src/
    main.ts
    server.ts
    utils.ts
  tests/
    server.test.ts
  package.json
  README.md

## Terminal
- Browser terminal UI
- Commands executed inside sandbox
- Output streaming

## AI assistant
Possible commands:
- Explain code
- Find bugs
- Generate tests
- Suggest refactoring

AI should remain an additional feature, not the central technical selling point.

---

# 11. Testing Philosophy

Testing should demonstrate engineering quality rather than simply provide high coverage numbers.

Particularly valuable test:

Simulate multiple clients making concurrent edits.

Example:

Client A:
  insert "hello"

Client B:
  insert "world"

Client C:
  delete characters

Then verify that after synchronisation:

state(A) == state(B) == state(C)

Also test:
- simultaneous typing
- deletes
- reconnects
- clients joining late
- clients leaving
- duplicated messages
- delayed messages
- malformed messages
- unauthorised workspace access

---

# 12. Repository Structure

Suggested structure:

collab-code/
  apps/
    web/
      components/
      editor/
      pages/
      ...
    server/
      api/
      websocket/
      auth/
      collaboration/
      ...
  packages/
    protocol/
    database/
    shared/
  tests/
    unit/
    integration/
    collaboration/
  docker/
  docker-compose.yml
  README.md
  package.json

This structure is a suggestion, not a strict requirement.

---

# 13. Portfolio/CV Goal

The project should eventually support CV bullets along these lines:

"Developed a browser-based collaborative IDE supporting simultaneous multi-user editing through WebSockets and CRDT-based conflict resolution."

"Implemented real-time cursor/presence synchronisation and persistent multi-file workspaces using PostgreSQL."

"Built a sandboxed code-execution service using isolated containers with execution timeouts and resource limits."

"Created automated unit, integration and concurrent-edit tests and deployed the application using Docker and CI/CD."

Only claim features that have actually been implemented.

---

# 14. Engineering Priorities

Priority order:

1. Correctness
2. Core collaboration functionality
3. Security
4. Reliability
5. Testing
6. Clean architecture
7. Performance
8. UX polish
9. Advanced features

Do not sacrifice correctness for feature count.

Do not add unnecessary technologies merely to make the stack look impressive.

Every technology should have a reason to exist.

---

# 15. Interview Value

The project should allow discussion of:

- WebSockets
- TCP/network communication at a conceptual level
- Client/server architecture
- Concurrency
- Distributed systems
- CRDTs
- Eventual consistency
- Race conditions
- Database design
- Authentication/authorisation
- Caching
- Message queues
- Containerisation
- Sandboxing
- Testing distributed behaviour
- CI/CD
- Scalability

The goal is not merely to have a visually impressive application.

The goal is to have a system whose technical decisions can be explained deeply in an internship/placement interview.

---

# 16. Rules for Future ChatGPT Sessions

This file is the canonical project context.

When assisting with this project:

1. Treat the decisions above as the current project direction unless explicitly changed.
2. Do not silently change the technology stack or architecture.
3. Do not assume a feature has been implemented merely because it appears in the roadmap.
4. Clearly label suggestions as suggestions.
5. Do not invent implementation details, benchmark results, users, test results or deployment details.
6. If information is missing, say what is unknown rather than hallucinating it.
7. Prefer incremental implementation over rewriting the entire project.
8. Preserve existing architecture unless there is a concrete reason to change it.
9. When providing code, explain where it belongs in the repository.
10. Consider security implications whenever discussing authentication, WebSockets or code execution.
11. For code-execution features, never recommend directly executing untrusted user code in the main backend process.
12. When debugging, ask for the relevant existing code/error/output rather than assuming its contents.
13. Keep the project's purpose in mind: strong CS/software-engineering internship portfolio project.
14. Prioritise features that create good technical interview discussion.
15. Do not add complexity purely for CV buzzwords.

---

# 17. Current State

IMPORTANT: This section should be updated as development progresses.

Current phase:
Planning / not yet implemented.

Implemented:
- None yet.

Currently working on:
- Project planning.

Next milestone:
- Set up repository and build the basic Monaco-based editor.

Known decisions:
- TypeScript
- React/Next.js
- Monaco Editor
- Node.js backend
- PostgreSQL
- WebSockets
- Yjs/CRDT for collaboration
- Docker
- CI/CD

Known unresolved decisions:
- Exact backend framework
- Authentication/session implementation
- Deployment provider
- Exact database schema
- Exact WebSocket protocol
- Code execution architecture
- Redis introduction point

Do not treat unresolved decisions as final.

---

# 18. How to Use This Context

When starting a new ChatGPT conversation about CollabCode:

1. Paste this entire file.
2. Add a short message describing the immediate task.
3. If the project has progressed, update "Current State" before starting the new conversation.

Example:

"Use the attached CollabCode project context as the source of truth. I am currently in Phase 4. Here is my current WebSocket server code: [code]. Help me implement document-room management without changing the existing architecture."

For a shorter context reset when token usage is high, paste:
- Sections 1, 2, 3, 5, 9, 14, 16 and 17
- Plus the relevant current code/error

The "Current State" section is the most important section to keep updated.