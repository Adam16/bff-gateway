import gateway from "fast-gateway";
import type { Service, Protocol } from "restana";

export function startGateway(): Service<Protocol.HTTP | Protocol.HTTP2> {
  const server = gateway({
    routes: [
      {
        prefix: "/api",
        target: "http://localhost:3000",
        methods: ["GET"],
      },
    ],
  });

  return server;
}

function run() {
  const port = parseInt(process.env.PORT || "8080");
  const server = startGateway();

  server
    .start(port)
    .then(() => {
      console.log(`Gateway started on port ${port}`);
    }).catch((err) => {
      console.error(err);
    });

  process.on("SIGTERM", () => {
    server.close()
    .then(() => {
      console.log("Gateway closed");
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      process.exit(0);
    });
  });
}

run();
