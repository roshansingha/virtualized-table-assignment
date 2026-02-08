# Entity Data Table - Frontend

React application with virtual scrolling for 1000+ entities.

## 🛠 Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **@tanstack/react-virtual** - Virtual scrolling
- **Vitest** - Testing framework
- **React Testing Library** - Component testing

## 🚀 Local Development

### From Root Directory

```bash
# Install all dependencies
pnpm install

# Start frontend only
pnpm dev:frontend

# Or start both frontend and API
pnpm dev
```

### From Frontend Directory

```bash
cd frontend

# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## 🌐 Environment Variables

Create a `.env.local` file:

```env
VITE_API_URL=http://localhost:8000/entities
```

For production, set this to your deployed API URL:
```env
VITE_API_URL=https://your-api.onrender.com/entities
```

## 🧪 Testing

```bash
pnpm test        # Watch mode
pnpm test:run    # Run once
pnpm test:ui     # UI mode
```

**Test Coverage**: 27 tests covering:
- Search functionality
- Health filters
- Row selection
- Sorting
- Accessibility

## 🏗 Building

```bash
pnpm build       # Build for production
pnpm preview     # Preview production build
```

Output will be in `dist/` directory.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**:
   ```bash
   vercel
   ```

2. **Configuration**:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `pnpm build`
   - Output Directory: `dist`

3. **Environment Variables**:
   - `VITE_API_URL`: Your API URL

### Netlify

1. **Configuration**:
   - Base directory: `frontend`
   - Build command: `pnpm install && pnpm build`
   - Publish directory: `frontend/dist`

2. **Environment Variables**:
   - `VITE_API_URL`: Your API URL

## ✨ Features

- ✅ Virtual scrolling (renders only visible rows)
- ✅ Row selection with persistence across filters
- ✅ Health filter (multi-select dropdown)
- ✅ Real-time search (debounced, searches name OR location)
- ✅ Power sorting (ascending/descending/none)
- ✅ Submit button logs selected IDs
- ✅ Full keyboard navigation
- ✅ ARIA labels and screen reader support
- ✅ Responsive design

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── __tests__/   # Component tests
│   │   ├── ActionBar.tsx
│   │   ├── Checkbox.tsx
│   │   ├── HealthFilter.tsx
│   │   ├── SearchBar.tsx
│   │   ├── SortButton.tsx
│   │   ├── TableRow.tsx
│   │   └── VirtualTable.tsx
│   ├── hooks/           # Custom hooks
│   │   ├── useEntities.ts
│   │   └── useFilteredEntities.ts
│   ├── store/           # State management
│   │   └── useTableStore.ts
│   ├── types/           # TypeScript types
│   │   └── entity.ts
│   ├── test/            # Test utilities
│   │   ├── setup.ts
│   │   └── testUtils.tsx
│   ├── App.tsx          # Root component
│   ├── App.css          # Styles
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── vitest.config.ts     # Vitest configuration
└── package.json         # Dependencies
```

## ⚡ Performance Optimizations

1. **Virtual Scrolling**: Only renders ~30 visible rows
2. **Memoization**: All components wrapped in `React.memo`
3. **Debounced Search**: 300ms delay to reduce re-renders
4. **Set-based Selection**: O(1) lookup for selected state
5. **Selective Subscriptions**: Zustand selectors prevent unnecessary updates

## ♿ Accessibility

- **Keyboard Navigation**: Tab, Space, Enter, Escape
- **ARIA Labels**: All interactive elements labeled
- **Screen Readers**: Semantic HTML and ARIA roles
- **Focus Management**: Visible focus indicators
- **Live Regions**: Loading and error states announced

## 🐛 Troubleshooting

### API Connection Issues

If you see "Error Loading Data":

1. Check API is running: `pnpm dev:api` (from root)
2. Verify API URL in `.env.local`
3. Check CORS settings in API

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules dist
pnpm install
pnpm build
```

### Test Failures

```bash
# Clear test cache
pnpm test:run --clearCache
```

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)
- [TanStack Virtual Documentation](https://tanstack.com/virtual)

---

**Need help?** Check the [main README](../README.md) or [API README](../api/README.md)
