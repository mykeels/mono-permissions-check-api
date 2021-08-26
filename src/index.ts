// import metadata for es7 decorators support
import "reflect-metadata";

// allow creation of aliases for directories
import "module-alias/register";

import http from "http";
import env from "@app/env";
import App from "./app";

const start = async () => {
  try {
    const app = new App();
    const appServer = app.build();
    const httpServer = http.createServer(appServer);

    httpServer.listen(env.port);
    httpServer.on("listening", () =>
      console.log(
        `🚀  ${env.app_name} running in ${env.app_env}. Listening on ` +
          env.port
      )
    );
  } catch (err) {
    console.error(err, "Fatal server error");
  }
};

start();
