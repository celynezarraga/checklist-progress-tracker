import app from "./app";
import config from "./config";

const PORT = config.PORT || 3030;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server has started at port: ${PORT}`);
});