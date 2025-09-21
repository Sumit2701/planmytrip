## Plan My Trip

Simple proof of concept: enter a free form travel idea and get back a multi destination itinerary in a form of a pdf. 
### Stack
* Next.js 15 (App Router, React 19)
* AI: @ai-sdk/google + ai (object generation)
* Validation: Zod
* Styling: Tailwind CSS 4
* UI helpers: Framer Motion, Embla Carousel, react-icons

### Project structure (summary)
```
app/api/generate_iternary/route.js  # POST endpoint
app/page.js                         # Landing page
components/                         # UI sections
data/landing.json                   # Landing copy
public/images                       # Assets
```

### Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000

### Environment variables (.env.local)
```
GOOGLE_API_KEY=your_google_key
# Optional override (code currently reads process.env.flash2)
flash2=gemini-2.0-flash-001
```


### Scripts
| script | purpose |
|--------|---------|
| npm run dev | start dev server |
| npm run build | production build |
| npm start | run built server |
| npm run lint | lint code |

### Roadmap (condensed)
Hotel booking, Activities integration, Persistence, budgeting UI, auth, rate limiting.

### Contributing
Small focused PRs. Include rationale if changing schema or AI prompt.

### License
MIT License. See the `LICENSE` file for full text.

### Notes
`streamObject` is imported but not used; could be used for progressive streaming.
Model choice can be changed by setting the env var shown above.

keywords: trip planner , plan trip, tour planner, travel iternary generator, ai based, hotels and iternary 

