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
Phase 1 complete. Phase 2 backend and persistence foundation is in progress. Backend persistence is complete and verified. Frontend REST integration is partially complete: persisted files load from the backend, frontend file creation persists through POST, language updates persist through PATCH, and editor content autosaves through debounced PATCH requests. Frontend delete/rename integration and final end-to-end verification remain.

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
- [x] File persistence operations implemented through a file repository (create/list/get/update/delete)
- [x] Full Postman REST regression collection passes, including deletion coverage
- [x] Per-workspace duplicate filenames return controlled `409 Conflict` responses for create and rename collisions
- [x] Complete file CRUD persistence verified across backend restarts
- [ ] Frontend editor connected to the REST persistence API
  - [x] Persisted files loaded with GET
  - [x] Frontend file creation connected to POST
  - [x] Language updates connected to PATCH
  - [x] Debounced editor-content autosave connected to PATCH
  - [ ] Frontend rename connected to PATCH
  - [ ] Frontend deletion connected to DELETE
  - [ ] Final page/backend restart regression verification

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
- [x] File persistence API implemented (create/list/get/update/delete)
- [x] Duplicate filename constraint errors translated cleanly through repository/service/controller layers to `409 Conflict`
- [x] File CRUD regression and restart-persistence verification completed
- [x] Frontend REST API client introduced in `apps/web/app/lib/fileApi.ts`
- [x] Frontend loads persisted workspace files into `page.tsx` state
- [x] Frontend file creation persists through `POST /api/workspaces/:workspaceId/files`
- [x] Frontend language changes persist through file PATCH
- [x] Monaco content changes remain immediate in React state and persist through debounced PATCH autosave
- [x] Development CORS configured so the Next.js frontend can call the Express API

---

## Planned Features

### MVP

- [x] Monaco code editor
- [x] File creation/editing
- [ ] File persistence (partially complete in frontend; GET/POST/PATCH integrated, delete/rename UI pending)
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
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── Components/
│   │   ├── CodeEditor/
│   │   │   └── codeEditor.tsx
│   │   ├── FileExplorer/
│   │   │   ├── addFileFilenameAsker.tsx
│   │   │   ├── fileExplorer.tsx
│   │   │   └── fileItem.tsx
│   │   ├── Menubar/
│   │   │   └── menubar.tsx
│   │   └── Navbar/
│   │       └── navbar.tsx
│   ├── lib/
│   │   └── fileApi.ts
│   └── types/
│       └── codeEditor.ts
└── [Next.js generated/config files]

server/
├── src/
│   ├── app.ts
│   ├── index.ts
│   ├── routes/
│   │   └── workspaceRoutes.ts
│   ├── controllers/
│   │   ├── workspaceController.ts
│   │   └── fileController.ts
│   ├── services/
│   │   ├── workspaceService.ts
│   │   └── fileService.ts
│   ├── repositories/
│   │   ├── workspaceRepository.ts
│   │   └── fileRepository.ts
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

The frontend now retains `files` and `selectedFileId` state in `page.tsx`, uses `app/lib/fileApi.ts` for REST calls, loads persisted files for a temporary development workspace, persists file creation, persists language changes, and autosaves editor content with a debounce. The backend exposes a health endpoint plus PostgreSQL-backed workspace and file REST endpoints using route → controller → service → repository separation. Workspace creation validates non-empty names and generates application UUIDs. File APIs support listing files in a workspace, creating files with database defaults for omitted language/content, retrieving a file by workspace/file ID, partially updating name/language/content, and deleting a file scoped to its workspace. Kysely is configured and the initial database migration is applied.

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

A Postman development/regression collection is in use for the implemented REST API. Formal automated unit/integration tests have not started.

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

### Workspace/file REST persistence and Postman coverage — 2026-09-21

- Added `GET /api/workspaces/:workspaceId` with UUID validation, `404` handling, and persisted lookup.
- Added `fileRepository.ts`, `fileService.ts`, and `fileController.ts` while preserving route → controller → service → repository separation.
- Updated Kysely `FileTable` defaults so database-generated/defaulted fields can be omitted on inserts.
- Added `GET /api/workspaces/:workspaceId/files` to load all persisted files for a workspace.
- Added `POST /api/workspaces/:workspaceId/files`; file UUIDs are generated in the service with `crypto.randomUUID()`.
- File creation requires a non-empty name; `language` and `content` are optional and use PostgreSQL defaults (`text` and empty string) when omitted.
- Added `GET /api/workspaces/:workspaceId/files/:fileId`; lookup is scoped by both workspace ID and file ID so files cannot be retrieved through a different workspace.
- Added `PATCH /api/workspaces/:workspaceId/files/:fileId` for partial updates to `name`, `language`, and/or `content`.
- PATCH rejects an empty update body, validates supplied field types, permits empty-string content, and returns `404` when the workspace/file pair does not match.
- Added UUID validation at the HTTP boundary so malformed UUIDs return `400` instead of PostgreSQL UUID syntax errors.
- Hardened request-body access with optional chaining so missing JSON bodies produce controlled validation errors rather than controller exceptions.
- Created a Postman collection using `baseUrl`, `workspaceId`, and `fileId` variables for repeatable API setup and regression checks.
- Postman coverage includes workspace creation/retrieval, file creation with defaults and explicit language/content, file listing/retrieval, partial file updates, persistence checks, and key `400`/`404` error cases.
- Verified the implemented file create/list/get/update flows through Postman.
- Added `DELETE /api/workspaces/:workspaceId/files/:fileId`; deletion is scoped by both workspace ID and file ID and returns `404` when no matching file exists.
- Successful deletion returns `204 No Content`; the repository uses `DELETE ... RETURNING` to distinguish a deleted row from a missing file without a separate existence query.
- Added Postman coverage for successful deletion, retrieval-after-delete (`404`), malformed workspace/file UUIDs, and deletion of a nonexistent file.

### Persistence constraint hardening and final backend verification — 2026-09-22

- Ran the full Postman REST regression collection, including file deletion coverage; all tests passed.
- Added clean handling for the existing per-workspace filename uniqueness constraint instead of surfacing raw PostgreSQL errors.
- Repository code recognises PostgreSQL SQLSTATE `23505` specifically for the `files_workspace_id_name_unique` constraint and translates it to `DuplicateFileNameError`.
- Service/controller flow translates duplicate filename outcomes to `409 Conflict` without exposing PostgreSQL-specific details at the HTTP boundary.
- Duplicate filename handling is applied to both file creation and PATCH rename collisions.
- Verified a duplicate filename in the same workspace returns `409`, while the same filename in a different workspace remains allowed.
- Verified normal file renames continue to succeed.
- Verified complete file CRUD data and behaviour persist correctly across backend restarts.
- Backend persistence/constraint verification is now complete; frontend REST integration is the next task.

### Frontend REST persistence integration — 2026-09-22

- Recorded the actual frontend structure under `apps/web/app`, including CodeEditor, FileExplorer, Menubar, Navbar, types, and the new `lib/fileApi.ts` API client.
- Added temporary development workspace configuration because frontend workspace selection is not implemented yet.
- Added `NEXT_PUBLIC_API_URL` and a temporary `NEXT_PUBLIC_DEV_WORKSPACE_ID` approach for client-side API calls.
- Configured backend CORS for the local Next.js frontend.
- Replaced hardcoded initial frontend files with persisted file loading from `GET /api/workspaces/:workspaceId/files`.
- Updated frontend selection handling so the editor can start with no selected file while persisted data loads.
- Connected existing file creation UI to `POST /api/workspaces/:workspaceId/files`; backend-generated UUIDs are now used in frontend state.
- Verified created files persist in the backend and reload correctly.
- Connected language selection changes to `PATCH /api/workspaces/:workspaceId/files/:fileId` and verified persistence.
- Added debounced editor-content PATCH autosave so content is not persisted on every Monaco keystroke; verified edited content survives refresh.
- Frontend delete and rename UI are not implemented yet. A right-click file context menu containing Rename/Delete is the current idea, with possible future actions such as Duplicate, but this work is tabled for now.
- An intermittent Next.js/Turbopack development chunk-loading error was observed; core functionality remains working and investigation is deferred.

---

## Current Task

**Finish the remaining frontend REST persistence integration.**

Backend persistence verification is complete. Frontend GET/POST/PATCH integration is working. The next session should continue from the existing `page.tsx` state and API client, with delete/rename UI and final regression verification still pending.

Suggested immediate sequence:

1. Add frontend file rename interaction and persist it with `PATCH /api/workspaces/:workspaceId/files/:fileId`.
2. Add frontend file deletion interaction and connect it to `DELETE /api/workspaces/:workspaceId/files/:fileId`.
3. A right-click file context menu is the current UI idea for rename/delete; implementation is intentionally tabled for now.
4. Improve frontend handling for duplicate filename `409 Conflict` responses.
5. Verify end-to-end frontend persistence across page refreshes and backend restarts.
6. Replace the temporary development workspace ID approach when real frontend workspace handling is introduced.
7. Move to authentication and permissions after the persistence milestone is complete.

---

## Next Tasks

1. Add frontend rename/delete interactions and finish REST persistence integration.
2. Add friendly frontend handling for duplicate filename `409 Conflict` responses.
3. Verify end-to-end frontend file persistence across page/backend restarts.
4. Add real frontend workspace handling; current integration uses a temporary development workspace ID.
5. Add authentication and permissions.
6. Add WebSocket infrastructure.
7. Implement collaboration with Yjs.
8. Add collaboration/reconnection testing as those features are introduced.

---

## Known Bugs

- Intermittent Next.js/Turbopack development chunk-loading error has been observed; it is currently being ignored because core frontend functionality continues to work. Root cause has not been established.

### Implementation Notes

- Do not mutate `file.content` directly. Update the `files` state with `setFiles`.
- `files` in `page.tsx` remains the current source of truth for the single-user editor.
- Frontend REST calls are separated into `apps/web/app/lib/fileApi.ts`; File Explorer remains a UI component rather than owning persistence.
- Frontend workspace selection is not implemented yet. A temporary `NEXT_PUBLIC_DEV_WORKSPACE_ID` is used for development API calls.
- The frontend uses `NEXT_PUBLIC_API_URL` for the backend base URL.
- CORS is configured in development so the browser frontend can call the Express backend; production should restrict allowed origins to deployed frontend origin(s).
- Initial persisted file loading uses `GET /api/workspaces/:workspaceId/files` and populates the existing `files` state.
- Frontend file creation uses the persisted object returned by the backend instead of locally generated `Date.now()` IDs.
- Language updates are persisted through PATCH.
- Editor content updates remain immediate locally and are persisted with a debounce rather than a PATCH on every Monaco keystroke.
- Each file stores its own language and content.
- The Navbar and Monaco Editor derive their language from the currently selected file.
- File creation currently defaults new files to the `text` language.
- Duplicate filename handling is implemented: the repository recognises PostgreSQL unique violation `23505` for `files_workspace_id_name_unique`, translates it to an application-level duplicate filename error, and create/rename collisions return `409 Conflict`.
- Do not introduce WebSockets/Yjs/global state management yet; those belong to later phases.
- `files` in `page.tsx` remains the current source of truth for the single-user editor.
- Frontend REST calls are separated into `apps/web/app/lib/fileApi.ts`; File Explorer remains a UI component rather than owning persistence.
- Frontend workspace selection is not implemented yet. A temporary `NEXT_PUBLIC_DEV_WORKSPACE_ID` is used for development API calls.
- The frontend uses `NEXT_PUBLIC_API_URL` for the backend base URL.
- CORS is configured in development so the browser frontend can call the Express backend; production should restrict allowed origins to deployed frontend origin(s).
- Initial persisted file loading uses `GET /api/workspaces/:workspaceId/files` and populates the existing `files` state.
- Frontend file creation uses the persisted object returned by the backend instead of locally generated `Date.now()` IDs.
- Language updates are persisted through PATCH.
- Editor content updates remain immediate locally and are persisted with a debounce rather than a PATCH on every Monaco keystroke.
- Each file stores its own language and content.
- The Navbar and Monaco Editor derive their language from the currently selected file.
- File creation currently defaults new files to the `text` language.
- Duplicate filename handling is implemented for both file creation and PATCH rename collisions; the same filename remains valid in different workspaces.
- Do not introduce WebSockets/Yjs/global state management yet; those belong to later phases.
- Backend framework is now Express with TypeScript.
- Kysely is configured and connected to the local PostgreSQL database.
- Keep database-specific calls behind repositories rather than scattering Kysely calls through controllers/services.
- File repository/service/controller layers are now implemented for list, create, get-by-ID, partial update, and delete operations.
- `GET /api/workspaces/:workspaceId/files/:fileId` scopes lookup by both workspace and file IDs; a mismatched pair returns `404`.
- `PATCH /api/workspaces/:workspaceId/files/:fileId` performs one partial database update using only supplied fields; empty-string file content is valid.
- `DELETE /api/workspaces/:workspaceId/files/:fileId` deletes only a file belonging to the specified workspace, returns `404` when no matching row exists, and returns `204 No Content` on success.
- Malformed workspace/file UUIDs are rejected at the HTTP boundary with `400` responses.
- Postman collection variables (`baseUrl`, `workspaceId`, `fileId`) are used to chain repeatable API checks.
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