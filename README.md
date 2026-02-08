# Entity Data Table

A production-quality React + TypeScript application featuring a high-performance virtualized table that efficiently renders 1000+ rows with filtering, sorting, searching, and selection capabilities.

## 🚀 Live Demo

[Deploy Link - To be added after deployment]

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [Testing](#testing)
- [Performance Considerations](#performance-considerations)
- [Accessibility](#accessibility)
- [Architecture](#architecture)
- [Trade-offs](#trade-offs)

## 🎯 Overview

This application demonstrates best practices for building performant, accessible data tables in React. It handles large datasets efficiently using virtualization, provides intuitive filtering and sorting, and maintains excellent user experience through careful state management and optimization.

## 🛠 Tech Stack

### Core

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **pnpm** - Fast, disk-efficient package manager

### State Management

- **Zustand** - Lightweight state management
  - Chosen over Redux for minimal boilerplate
  - Built-in TypeScript support
  - No provider hell
  - Easy to test

### Performance

- **@tanstack/react-virtual** - Virtual scrolling
  - Renders only visible rows
  - Handles 1000+ rows smoothly
  - Better than react-window for dynamic heights
  - Framework-agnostic core

### Data Layer

- **json-server** - Mock REST API
  - Serves 1000 generated entities
  - Reproducible data generation with seeded random
  - Runs on port 8000

### Testing

- **Vitest** - Fast unit test runner
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - DOM matchers

## ✨ Features

### Table Functionality

- ✅ **Virtual Scrolling** - Efficiently renders 1000+ rows
- ✅ **Row Selection** - Individual and bulk selection with checkboxes
- ✅ **View State Tracking** - Mark rows as viewed/unviewed
- ✅ **Multi-column Display** - Checkbox, Name, Location, Health, Power

### Filtering & Sorting

- ✅ **Health Filter** - Multi-select dropdown with checkbox UI
- ✅ **Power Sorting** - Ascending/descending/none toggle
- ✅ **Real-time Search** - Debounced search by name OR location
- ✅ **Combined Filters** - All filters work together seamlessly

### UX & Accessibility

- ✅ **Loading States** - Clear feedback during data fetch
- ✅ **Error Handling** - Helpful error messages
- ✅ **Keyboard Navigation** - Full keyboard support
- ✅ **ARIA Labels** - Screen reader friendly
- ✅ **Focus Management** - Visible focus indicators
- ✅ **Responsive Design** - Works on mobile and desktop

### Data Management

- ✅ **Reproducible Data** - Seeded random generation
- ✅ **1000 Unique Entities** - No duplicates
- ✅ **Proper Types** - Full TypeScript coverage

## 🚀 Setup Instructions

### Prerequisites

- Node.js 18+ 
- pnpm 8+ (install with `npm install -g pnpm`)

### Installation

1. **Clone and navigate to the project**

```bash
cd data-table-app
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Generate mock data**

```bash
pnpm generate-data
```

This creates `db.json` with 1000 entities using a seeded random generator for reproducibility.

4. **Start the JSON server** (in one terminal)

```bash
pnpm json-server
```

The API will be available at `http://localhost:8000/entities`

5. **Start the development server** (in another terminal)

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### Available Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm preview          # Preview production build
pnpm test             # Run tests in watch mode
pnpm test:run         # Run tests once
pnpm test:ui          # Run tests with UI
pnpm lint             # Lint code
pnpm json-server      # Start JSON server
pnpm generate-data    # Generate mock data
```

## 🧪 Testing

### Running Tests

```bash
# Watch mode (recommended during development)
pnpm test

# Run once (CI/CD)
pnpm test:run

# With UI
pnpm test:ui
```

### Test Coverage

The test suite covers:

- ✅ **Search functionality** - Typing, debouncing, filtering
- ✅ **Health filters** - Multi-select, toggle, badge display
- ✅ **Row selection** - Individual, bulk, select all
- ✅ **View state** - Marking as viewed/unviewed, console logging
- ✅ **Sorting** - Ascending, descending, none
- ✅ **Combined filters** - Search + health + sort working together
- ✅ **Accessibility** - ARIA labels, keyboard navigation

### Test Files

```
src/components/__tests__/
├── ActionBar.test.tsx      # View state actions
├── HealthFilter.test.tsx   # Filter dropdown
├── SearchBar.test.tsx      # Search input
└── VirtualTable.test.tsx   # Table rendering, selection, filtering
```

## ⚡ Performance Considerations

### Virtual Scrolling

- Only renders visible rows (~20-30 at a time)
- Handles 1000+ rows without performance degradation
- Uses `@tanstack/react-virtual` for efficient DOM management

### Memoization Strategy

- **Components**: `React.memo` on all table components
- **Callbacks**: `useCallback` for event handlers
- **Computed Values**: `useMemo` for filtered/sorted data
- **Set-based Selection**: O(1) lookup for selected state

### Debouncing

- Search input debounced at 300ms
- Prevents excessive re-renders during typing
- Balances responsiveness with performance

### State Management

- Zustand provides minimal re-renders
- Selective subscriptions prevent unnecessary updates
- Set data structures for efficient lookups

### Bundle Optimization

- Vite's code splitting
- Tree shaking for unused code
- Modern ES modules

## ♿ Accessibility

### Keyboard Navigation

- **Tab** - Navigate between interactive elements
- **Space/Enter** - Activate buttons and checkboxes
- **Escape** - Close dropdowns

### Screen Reader Support

- Semantic HTML (`<table>`, `role="row"`, etc.)
- ARIA labels on all interactive elements
- ARIA live regions for dynamic updates
- Proper heading hierarchy

### Visual Accessibility

- High contrast colors
- Focus indicators on all interactive elements
- Sufficient color contrast (WCAG AA)
- Responsive text sizing

### Testing

- All tests use accessible queries (getByRole, getByLabelText)
- Ensures components are discoverable by assistive tech

## 🏗 Architecture

### Project Structure

```
src/
├── components/          # React components
│   ├── ActionBar.tsx   # Search + action buttons
│   ├── Checkbox.tsx    # Reusable checkbox
│   ├── HealthFilter.tsx # Health filter dropdown
│   ├── SearchBar.tsx   # Debounced search input
│   ├── SortButton.tsx  # Power column sort
│   ├── TableRow.tsx    # Individual row (memoized)
│   ├── VirtualTable.tsx # Main table with virtualization
│   └── __tests__/      # Component tests
├── hooks/              # Custom hooks
│   ├── useEntities.ts  # Data fetching
│   └── useFilteredEntities.ts # Filtering logic
├── store/              # State management
│   └── useTableStore.ts # Zustand store
├── types/              # TypeScript types
│   └── entity.ts       # Entity interfaces
├── test/               # Test utilities
│   ├── setup.ts        # Test configuration
│   └── testUtils.tsx   # Test helpers
├── App.tsx             # Root component
├── App.css             # Styles
└── main.tsx            # Entry point

scripts/
└── generateData.ts     # Data generation script

db.json                 # Generated mock data
```

### Data Flow

```
JSON Server (port 8000)
    ↓
useEntities hook (fetch)
    ↓
Zustand Store (global state)
    ↓
useFilteredEntities (computed)
    ↓
VirtualTable (virtualized rendering)
    ↓
TableRow (memoized rows)
```

### State Management

**Zustand Store** manages:
- Raw entity data
- Selected IDs (Set)
- Viewed IDs (Set)
- Health filter array
- Search query string
- Sort direction

**Derived State** (computed):
- Filtered entities (health + search)
- Sorted entities (power)
- Selection state per row

### Why Zustand?

1. **Minimal Boilerplate** - No actions, reducers, or providers
2. **TypeScript First** - Excellent type inference
3. **Performance** - Selective subscriptions
4. **Testability** - Easy to mock and test
5. **Bundle Size** - ~1KB gzipped

## 🤔 Trade-offs

### Decisions Made

#### 1. Client-side Filtering vs Server-side

**Choice**: Client-side filtering

**Reasoning**:
- Dataset is manageable (1000 rows)
- Instant feedback for users
- Simpler implementation
- No network latency

**Trade-off**: Wouldn't scale to 100k+ rows

#### 2. Zustand vs Redux

**Choice**: Zustand

**Reasoning**:
- Less boilerplate
- Easier to learn
- Sufficient for this use case
- Better DX

**Trade-off**: Less ecosystem/middleware than Redux

#### 3. Virtual Scrolling vs Pagination

**Choice**: Virtual scrolling

**Reasoning**:
- Better UX (no page breaks)
- Handles large datasets
- Modern approach
- Requirement specified

**Trade-off**: More complex implementation

#### 4. Set vs Array for Selection

**Choice**: Set

**Reasoning**:
- O(1) lookup vs O(n)
- Better performance
- Natural fit for unique IDs

**Trade-off**: Slightly more complex serialization

#### 5. Debounced Search

**Choice**: 300ms debounce

**Reasoning**:
- Reduces re-renders
- Balances responsiveness
- Industry standard

**Trade-off**: Slight delay in feedback

#### 6. CSS vs CSS-in-JS

**Choice**: Plain CSS

**Reasoning**:
- No runtime overhead
- Simpler setup
- Easier to maintain
- Better performance

**Trade-off**: No dynamic theming

## 📦 Deployment

### Build for Production

```bash
pnpm build
```

Output will be in the `dist/` directory.

### Deploy to Vercel/Netlify

1. Connect your repository
2. Set build command: `pnpm build`
3. Set output directory: `dist`
4. Deploy!

**Note**: You'll need to deploy the JSON server separately or replace it with a real API.

## 🔮 Future Enhancements

- [ ] Column resizing
- [ ] Column reordering
- [ ] Export to CSV
- [ ] Persistent filters (localStorage)
- [ ] Dark mode
- [ ] Storybook integration
- [ ] E2E tests with Playwright
- [ ] Real backend integration
- [ ] Infinite scroll option
- [ ] Advanced filtering (date ranges, etc.)

## 📝 License

MIT

## 👤 Author

Built as a production-ready demonstration of React best practices.

---

**Note**: This project prioritizes functionality, performance, and accessibility over visual design, as specified in the requirements.
