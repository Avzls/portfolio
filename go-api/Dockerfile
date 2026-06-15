# ---- Build stage ----
FROM golang:1.25-alpine AS builder

WORKDIR /app

# Cache deps first
COPY go.mod go.sum ./
RUN go mod download

# Build static binary
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o porto-api .

# ---- Runtime stage ----
FROM alpine:3.20

# Non-root user + certs for outbound TLS if ever needed
RUN apk add --no-cache ca-certificates && \
    adduser -D -u 10001 appuser

WORKDIR /app

COPY --from=builder /app/porto-api .

# Uploaded files live here; mount a volume to persist them
RUN mkdir -p /app/uploads && chown -R appuser:appuser /app

USER appuser

EXPOSE 8081

CMD ["./porto-api"]
