import { server } from "./app/server";
import 'dotenv/config'

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`)
})