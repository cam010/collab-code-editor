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
Phase 1 implementation complete — the single-user multi-file editor foundation is working.

---

## Current Phase

**Phase:** 1 — Basic Editor

**Status:** Complete.

### Current milestone

Build the single-user multi-file editor foundation.

### Definition of done

- [x] Frontend application running locally
- [x] TypeScript configured
- [x] Monaco Editor integrated
- [x] User can type/edit code
- [x] Basic language selection works
- [x] Basic editor layout is functional
- [x] Initial file model created
- [x] Selected file state created
- [x] Editor displays selected file content
- [x] Editor changes update the selected file's content
- [x] File Explorer
- [x] Create new file
- [x] Switch between multiple files and preserve content
- [x] README contains setup instructions

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

Current known frontend structure:

```text
app/
├── page.tsx
├── types/
│   └── editor.ts
└── Components/
    ├── CodeEditor/
    │   └── codeEditor.tsx
    ├── Navbar/
    │   └── navbar.tsx
    ├── Menubar/
    │   └── menubar.tsx
    └── FileExplorer/
        ├── fileExplorer.tsx
        └── fileItem.tsx
```

The FileExplorer components contain the implemented File Explorer functionality.

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

---

## Current Task

**Phase 1 complete. Begin planning and implementing the backend and persistence foundation.**

Suggested immediate sequence:

1. Build the basic File Explorer UI.
2. Display files from `files` state.
3. Allow clicking/selecting a file.
4. Highlight the selected file.
5. Add a basic New File action.
6. Verify switching files changes the Monaco content.
7. Verify each file preserves its own content.
8. Ensure language is stored per file and passed from the selected file.
9. Update this file after the milestone is complete.

---

## Next Tasks

After the single-user multi-file editor foundation works:

1. Choose/confirm backend framework.
2. Set up the Node.js + TypeScript backend.
3. Establish the initial REST API.
4. Design the initial PostgreSQL schema.
5. Connect the backend to PostgreSQL.
6. Implement workspace/file persistence.
7. Connect the frontend to the backend.
8. Add authentication and permissions.
9. Add WebSocket infrastructure.
10. Implement collaboration with Yjs.

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