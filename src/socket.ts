import { Server as IOServer } from "socket.io";
import type { Server as HttpServer } from "http";
import config from "./config/index.js";

export type LocationPayload = {
  bookingId: string;
  lat: number;
  lng: number;
};

// In-memory store so a late-joining customer sees the last known location
// immediately without waiting for the next GPS ping.
const lastLocation = new Map<string, LocationPayload & { timestamp: number }>();

export function setupSocket(httpServer: HttpServer) {
  const allowedOrigins = [
    config.frontend_url,
    config.app_url,
    "http://localhost:3000",
  ].filter((o): o is string => Boolean(o));

  const io = new IOServer(httpServer, {
    cors: {
      origin: allowedOrigins.length ? allowedOrigins : "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // Both technician and customer call this to subscribe to a booking room
    socket.on("join-tracking", ({ bookingId }: { bookingId: string }) => {
      if (!bookingId) return;
      socket.join(`booking:${bookingId}`);

      // Immediately replay last known location if we have one
      const cached = lastLocation.get(bookingId);
      if (cached) {
        socket.emit("technician-location", cached);
      }
    });

    // Technician emits their GPS coordinates
    socket.on("location-update", (payload: LocationPayload) => {
      const { bookingId, lat, lng } = payload;
      if (!bookingId || lat == null || lng == null) return;

      const data = { bookingId, lat, lng, timestamp: Date.now() };
      lastLocation.set(bookingId, data);

      io.to(`booking:${bookingId}`).emit("technician-location", data);
    });

    // Technician stops sharing (booking completed / stopped manually)
    socket.on("tracking-stopped", ({ bookingId }: { bookingId: string }) => {
      if (!bookingId) return;
      lastLocation.delete(bookingId);
      io.to(`booking:${bookingId}`).emit("technician-offline", { bookingId });
    });
  });

  return io;
}
