import app from "./app.js";
import "./database.js";
import { PORT} from "./config.js";

import "./libs/initialSetup.js";

app.listen(PORT);
console.log("Server on port", app.get("port"));


// 
// app.listen(PORT1, () => {
//     console.log(`Server is running.. ${PORT1}`);
//   });
  