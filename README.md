# CollabCode

CollabCode is a browser-based collaborative code editor / mini-IDE designed to allow multiple users to work on the same codebase in real time.

The project is being developed as a technically substantial computer science/software engineering portfolio project, with a focus on real-time systems, distributed collaboration, persistence, and secure code execution.

## Current Status

**Phase 1 — Basic Editor: Complete**

The current version provides a functional single-user multi-file code editor.

### Currently implemented

* Next.js / React frontend
* TypeScript
* Monaco Editor
* Multi-file editor
* File Explorer
* File creation
* File switching
* Per-file content preservation
* Per-file language selection
* Language selector
* Basic editor UI

### Planned

The project will be developed incrementally toward a full collaborative development environment.

Planned functionality includes:

* File persistence
* User authentication
* Workspaces
* Workspace members and permissions
* WebSocket communication
* Real-time collaborative editing
* Yjs / CRDT-based synchronisation
* Remote cursors
* User presence
* Reconnection handling
* Basic code execution
* Version history
* Offline editing
* Multi-file project structures
* Browser terminal
* Redis-based scaling where required
* AI coding assistant
* Advanced monitoring and observability

## Technology

### Frontend

* TypeScript
* React
* Next.js
* Monaco Editor

### Backend

Planned:

* Node.js
* TypeScript
* REST API
* WebSockets

The backend framework has not yet been finalised.

### Database

* PostgreSQL

### Real-time Collaboration

The planned collaboration system will use:

* Yjs
* CRDTs
* WebSocket transport

### Infrastructure

Planned:

* Docker
* GitHub Actions / CI/CD
* Redis, if required

## Getting Started

### Prerequisites

You will need:

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd collab-code
```

Install the dependencies:

```bash
npm install
```

### Run the development server

Start the Next.js development server:

```bash
npm run dev
```

The application should then be available at:

```text
http://localhost:3000
```

Open the address in your browser to use the editor.

## Current Editor

The current editor provides a basic multi-file editing experience.

Files are maintained in the application's frontend state. Each file contains:

* An ID
* A filename
* A language
* Its current content

Selecting a file in the File Explorer changes the file displayed by Monaco Editor.

Each file maintains its own content and language when switching between files.

## Architecture

The current implementation is intentionally simple:

```text
Browser
  |
  v
Next.js / React
  |
  +--> Navbar / Menubar
  |
  +--> File Explorer
  |
  +--> Monaco Editor
  |
  +--> page.tsx
        |
        +--> files
        +--> selectedFileId
```

The planned architecture will eventually expand to:

```text
Browser
  |
  | HTTP / WebSocket
  v
Backend API + WebSocket Server
  |
  +--> PostgreSQL
  |
  +--> Redis (if required)
  |
  +--> Sandboxed Code Runner
```

## Security

Security is an important part of the project's later architecture.

User code must **not** be executed directly inside the main backend process.

The planned code execution environment will use an isolated sandbox/container with appropriate restrictions, including:

* CPU limits
* Memory limits
* Execution timeouts
* Restricted filesystem access
* Restricted or disabled network access

Authentication, workspace permissions, and WebSocket messages will also require server-side validation and authorisation.

## Development Roadmap

The project is being developed incrementally.

### Phase 1 — Basic Editor

* [x] Monaco Editor
* [x] File Explorer
* [x] File creation
* [x] File switching
* [x] Content preservation
* [x] Per-file language selection
* [x] Basic editor UI

### Phase 2 — Backend & Persistence

Planned:

* [ ] Backend server
* [ ] REST API
* [ ] PostgreSQL
* [ ] File persistence
* [ ] Workspaces
* [ ] Workspace/file API

### Phase 3 — Authentication & Permissions

Planned:

* [ ] User authentication
* [ ] Secure password handling
* [ ] Workspace membership
* [ ] Workspace permissions
* [ ] Server-side authorisation

### Phase 4 — Real-Time Collaboration

Planned:

* [ ] WebSocket infrastructure
* [ ] Yjs integration
* [ ] CRDT-based synchronisation
* [ ] Remote cursors
* [ ] User presence
* [ ] Reconnection handling

### Phase 5 — Code Execution & Advanced Features

Planned:

* [ ] Sandboxed code execution
* [ ] Browser terminal
* [ ] Version history
* [ ] Offline editing
* [ ] Advanced project structures
* [ ] Monitoring / observability
* [ ] Optional AI coding assistant

## Testing

Automated testing will be introduced as the application develops.

Planned testing includes:

### Unit tests

* Authentication
* Permissions
* File operations
* Collaboration logic
* Protocol validation

### Integration tests

* API and database
* WebSocket communication
* Persistence

### Collaboration tests

Multiple clients will eventually be simulated to verify that concurrent edits converge to the same final state.

An important invariant will be:

```text
final_state(client_A)
==
final_state(client_B)
==
final_state(client_C)
```

after synchronisation.

## Project Structure

The current frontend structure is:

```text
app/
├── page.tsx
├── types/
│   └── codeEditor.ts
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

The final project structure has not yet been established and may change as development progresses.

## Project Goals

The primary goal of CollabCode is to build a substantial software engineering project demonstrating practical understanding of areas including:

* Frontend development
* Backend development
* Databases
* Networking
* WebSockets
* Distributed systems
* CRDTs
* Concurrency
* Authentication and authorisation
* Secure code execution
* Testing
* Containerisation
* CI/CD

The project prioritises technically meaningful functionality over superficial features.

## License

License information has not yet been decided.
