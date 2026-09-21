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
Phase 1 complete. Phase 2 backend and persistence foundation is in progress; PostgreSQL + Kysely are connected and both workspace listing and persisted workspace creation are implemented.

---

## Current Phase

**Phase:** 2 — Backend and Persistence Foundation

**Status:** In progress.

### Current milestone

Design and implement the PostgreSQL persistence foundation for workspaces and files.

### Definition of done

- [x] Node.js + TypeScript backend running locally
- [x] Express REST API configured with ES modules
- [x] `GET /health` endpoint implemented and verified
- [x] Route → controller → service architecture established
- [x] PostgreSQL installed and local `collabcode` database configured
- [x] Initial `workspaces` and `files` persistence schema designed
- [x] Kysely + PostgreSQL driver configured
- [x] Database migration runner implemented and initial migration applied
- [x] Workspace/file constraints, defaults, cascade deletion and `updated_at` triggers verified
- [x] Repository layer introduced for database access
- [x] `GET /api/workspaces` migrated from temporary in-memory data to PostgreSQL
- [x] Persisted workspace data verified through the REST API and across backend restarts
- [x] `POST /api/workspaces` creates persisted workspaces with application-generated UUIDs
- [ ] File persistence operations implemented through a file repository
- [ ] Frontend editor connected to the REST persistence API

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
- Express
- REST API
- WebSockets
- Routes → controllers → services → repositories architecture

### Database
- PostgreSQL
- Kysely query builder
- Repository layer will isolate database access from application logic

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
Browser
  |
  v
Next.js / React frontend
  |
  +--> Navbar / Menubar
  |
  +--> CodeEditor (Monaco)
  |
  +--> page.tsx
       |
       +--> files
       +--> selectedFileId
       |
       +--> selected file language/content -> CodeEditor
       +--> editor changes -> update files state
```

---

## Implemented Features

### Phase 1 — Basic Editor

- [x] Next.js / React frontend
- [x] TypeScript
- [x] Basic application layout
- [x] Navbar
- [x] Menubar
- [x] Monaco Editor integration
- [x] Controlled Monaco editor value
- [x] Initial Python language
- [x] Language selector
- [x] Per-file language state
- [x] Shared `Language` type
- [x] `EditorFile` type
- [x] `files` state in `page.tsx`
- [x] `selectedFileId` state in `page.tsx`
- [x] Selected file resolved from the file collection
- [x] Selected file content passed to Monaco
- [x] Editor changes update the selected file immutably via `setFiles`
- [x] File Explorer UI
- [x] File selection and switching
- [x] Selected file highlighting
- [x] File creation
- [x] File content preservation when switching
- [x] Language stored per file
- [x] Language selector updates the selected file
- [x] Navbar reflects the selected file's language
- [x] Monaco reflects the selected file's language
- [x] Permanent file-name creation popup
- [x] README setup instructions

### Phase 2 — Backend Foundation

- [x] Node.js + TypeScript backend project created
- [x] Express configured
- [x] ES module configuration established
- [x] Development/build/start scripts configured
- [x] `GET /health` endpoint implemented
- [x] Initial route/controller/service separation implemented
- [x] `GET /api/workspaces` endpoint implemented
- [x] Temporary in-memory workspace service implemented for API validation
- [x] Initial PostgreSQL `workspaces` / `files` schema designed and migrated
- [x] PostgreSQL connected locally
- [x] Kysely configured with PostgreSQL driver
- [x] Workspace repository layer implemented
- [x] `GET /api/workspaces` reads persisted PostgreSQL data
- [x] Workspace creation API implemented
- [x] Workspace creation validates non-empty names and returns `201 Created`
- [ ] File persistence API implemented

---

## Planned Features

### MVP

- [x] Monaco code editor
- [x] File creation/editing
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

Current known structure:

```text
apps/web/
└── [existing Next.js frontend]

server/
├── src/
│   ├── app.ts
│   ├── index.ts
│   ├── routes/
│   │   └── workspaceRoutes.ts
│   ├── controllers/
│   │   └── workspaceController.ts
│   ├── services/
│   │   └── workspaceService.ts
│   ├── repositories/
│   │   └── workspaceRepository.ts
│   └── db/
│       ├── database.ts
│       ├── types.ts
│       ├── migrate.ts
│       └── migrations/
│           └── 001_initial_schema.ts
├── package.json
├── tsconfig.json
└── .gitignore
```

The frontend remains the completed Phase 1 editor. The backend exposes a health endpoint plus PostgreSQL-backed `GET /api/workspaces` and `POST /api/workspaces` endpoints using route → controller → service → repository separation. Workspace creation validates non-empty names, generates UUIDs in the application, persists through Kysely, and returns `201 Created`. Kysely is configured and the initial database migration is applied.

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

PostgreSQL is running locally and connected to the backend through Kysely. The initial migration is applied.

Implemented tables:

```text
workspaces
- id UUID PRIMARY KEY (generated by the application)
- name VARCHAR(255) NOT NULL
- created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
- updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()

files
- id UUID PRIMARY KEY (generated by the application)
- workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE
- name VARCHAR(255) NOT NULL
- language VARCHAR(50) NOT NULL DEFAULT 'text'
- content TEXT NOT NULL DEFAULT ''
- created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
- updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
- UNIQUE(workspace_id, name)
```

A reusable PostgreSQL `set_updated_at()` trigger function updates `updated_at` before updates on both tables. The schema behaviour has been manually verified for defaults, per-workspace filename uniqueness, timestamp updates, and cascade deletion.

Additional conceptual entities for later phases:

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

- Authentication/session strategy
- Authentication-related PostgreSQL schema beyond the implemented `workspaces` / `files` foundation
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

### Frontend editor foundation — 2026-09-15

- Basic Next.js / React editor layout implemented.
- Monaco Editor integrated.
- Language selection implemented.
- Initial `EditorFile` model added.
- `files` and `selectedFileId` state added to `page.tsx`.
- Editor receives the selected file's language and content.
- Editor changes update the selected file's content through an immutable React state update.

### Single-user multi-file editor foundation — 2026-09-18

- File Explorer UI implemented and connected to `files` state.
- File switching implemented and tested.
- Selected file highlighting implemented.
- File creation implemented.
- File creation uses a permanent popup for the filename.
- Newly created files default to the `text` language.
- File content is preserved when switching between files.
- Language selector fixed to update the selected file's language.
- Navbar reflects the selected file's language.
- Monaco Editor reflects the selected file's language.
- Editor behaviour tested across multiple files.
- UI appearance improved for the current stage.
- Duplicate filename handling intentionally deferred for later.

- Basic Next.js / React editor layout implemented.
- Monaco Editor integrated.
- Language selection implemented.
- Shared language state lifted to `page.tsx`.
- Initial `EditorFile` model added.
- `files` and `selectedFileId` state added to `page.tsx`.
- Editor now receives the selected file's language and content.
- Editor changes update the selected file's content through an immutable React state update.
- File Explorer is the next implementation task.

### Backend REST foundation — 2026-09-18

- Express selected as the backend framework to keep the first TypeScript backend relatively lightweight and expose core backend concepts directly.
- Kysely selected as the PostgreSQL query builder; database access will later sit behind repository boundaries.
- Node.js + TypeScript backend created under `server/`.
- Express configured using ES modules and TypeScript `NodeNext` module resolution.
- Development, build and start scripts configured.
- `app.ts` separated from `index.ts` so the Express application can later be imported independently for testing.
- `GET /health` implemented and verified.
- Initial `routes`, `controllers`, and `services` structure created for workspaces.
- `GET /api/workspaces` implemented and verified using temporary in-memory workspace data.
- PostgreSQL/Kysely persistence work began after this foundation; see the latest persistence update below.

### PostgreSQL persistence foundation — 2026-09-20

- PostgreSQL installed and configured locally with a dedicated `collabcode` database and `collabcode_app` application user.
- Kysely, `pg`, `@types/pg`, and dotenv configured in the backend.
- Backend ES module configuration corrected with `"type": "module"`.
- Added typed Kysely database configuration and database table types.
- Added migration infrastructure and `001_initial_schema` migration.
- Implemented `workspaces` and `files` tables using application-generated UUID primary keys.
- Added `files.workspace_id` foreign key with `ON DELETE CASCADE`.
- Added per-workspace filename uniqueness via `UNIQUE(workspace_id, name)`.
- Added database defaults for file language (`text`), content (empty string), and timestamps.
- Added reusable PostgreSQL trigger function to maintain `updated_at` on workspace/file updates.
- Verified schema defaults, uniqueness, update trigger, and cascade deletion manually in PostgreSQL.
- Added `workspaceRepository.ts` and kept Kysely/database-specific access behind the repository boundary.
- Replaced temporary in-memory workspace data with a real PostgreSQL query.
- `GET /api/workspaces` now returns persisted data while preserving the existing API response shape (`id`, `name`).
- Verified persistence survives backend restarts.

### Persisted workspace creation — 2026-09-21

- Added `POST /api/workspaces` through the existing route → controller → service → repository architecture.
- Added workspace repository insert logic using Kysely.
- Updated Kysely workspace timestamp types to reflect database-generated `created_at` and `updated_at` values.
- Workspace UUIDs are generated in the application with `crypto.randomUUID()`.
- Added HTTP-boundary validation requiring the workspace name to be a non-empty string after trimming.
- Successful workspace creation returns `201 Created` with the created workspace.
- Verified valid workspace creation and retrieval through the existing `GET /api/workspaces` endpoint.
- Verified invalid blank workspace names return `400` and are not persisted.
- Workspace names remain non-unique; workspace identity is based on UUID.

---

## Current Task

**Implement persisted file CRUD / workspace-file loading through a file repository.**

Suggested immediate sequence:

1. Review the existing `FileTable` Kysely types against the implemented database defaults.
2. Add a file repository while keeping Kysely/database-specific access behind the repository boundary.
3. Implement loading files for a workspace.
4. Implement persisted file creation with application-generated UUIDs.
5. Add file update operations needed for name, language and content persistence.
6. Add file deletion.
7. Validate file inputs at the HTTP/application boundary and handle the existing per-workspace filename uniqueness constraint appropriately.
8. Verify file data survives backend restarts before connecting the frontend editor.

---

## Next Tasks

1. Implement persisted file CRUD / workspace-file loading through a file repository.
2. Add request validation and appropriate API error handling for file operations.
3. Verify file persistence, per-workspace filename uniqueness and workspace/file relationships through the REST API.
4. Connect the frontend editor to the REST persistence API.
5. Add authentication and permissions.
6. Add WebSocket infrastructure.
7. Implement collaboration with Yjs.
8. Add collaboration/reconnection testing as those features are introduced.

---

## Known Bugs

None currently known.

### Implementation Notes

- Do not mutate `file.content` directly. Update the `files` state with `setFiles`.
- `files` in `page.tsx` remains the current source of truth for the single-user editor.
- Each file stores its own language and content.
- The Navbar and Monaco Editor derive their language from the currently selected file.
- File creation currently defaults new files to the `text` language.
- Duplicate filename handling is intentionally deferred.
- Do not introduce WebSockets/Yjs/global state management yet; those belong to later phases.
- `files` in `page.tsx` remains the current source of truth for the single-user editor.
- Each file stores its own language and content.
- The Navbar and Monaco Editor derive their language from the currently selected file.
- File creation currently defaults new files to the `text` language.
- Duplicate filename handling is intentionally deferred.
- Do not introduce WebSockets/Yjs/global state management yet; those belong to later phases.
- Backend framework is now Express with TypeScript.
- Kysely is configured and connected to the local PostgreSQL database.
- Keep database-specific calls behind repositories rather than scattering Kysely calls through controllers/services.
- `GET /api/workspaces` now reads persisted workspace data through `workspaceRepository.ts`.
- `POST /api/workspaces` creates persisted workspaces through the existing route → controller → service → repository flow.
- Workspace creation validates that `name` is a non-empty string after trimming and returns `400` for invalid blank names.
- Workspace creation returns `201 Created`; workspace UUIDs are generated in the service with `crypto.randomUUID()`.
- Workspace names are not globally unique; UUIDs identify workspaces.
- Workspace/file IDs are UUIDs generated by the application rather than database defaults.
- The database enforces unique filenames within a workspace with `UNIQUE(workspace_id, name)`.
- `language` remains a flexible `VARCHAR(50)` rather than a database enum/check; runtime API validation can be added at the application boundary.
- `updated_at` is maintained by a reusable PostgreSQL trigger function for both implemented tables.
- Preserve the existing route → controller → service separation as persistence is added.

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