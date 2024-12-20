# NinjaOne React Developer Showcase
This is a web application for the showcase of NinjaOne

# Installing dependencies

If you are using docker, you can run the following command:

```bash
npm run docker:watch
```

If you are NOT using docker:

1. Please, be sure you have `pnpm` installed:

```bash
npm install -g pnpm
```

2. Install dependencies:

```bash
pnpm install
```

3. Add the environment variable, create a `.env` in the root with the following values:

```bash
VITE_APP_DEVICES_TASK_API_URL=http://localhost:3000
```

4. Start the development server:

```bash
pnpm run dev
```

Please be sure you are running your api locally at port `3000`.

The app will be available at `http://localhost:3001`.

# Troubleshooting

If a `cors` issue appear for http requests:
- run on the api the following command:
```bash 
npm install cors --save
``` 
- add 
```bash 
import cors from "cors"
``` 
  and     
```bash 
app.use(cors());
``` 
  to the `index.js` file.