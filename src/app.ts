import dotenv from "dotenv"
//启动应用时候加载配置文件
dotenv.config()

import express from "express"
import { createMcpServer } from "./mcpServer.js"
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js"

function start() {
  
  const app = express()

  app.post("/mcp", async (req, res) => {
    try {
      const server = createMcpServer()
      const transport: StreamableHTTPServerTransport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
      })
      res.on("close", () => {
        console.log("Request closed")
        transport.close()
        server.close()
      })
      await server.connect(transport)
      await transport.handleRequest(req, res, req.body)
    } catch (error) {
      console.error("Error handling MCP request:", error)
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: {
            code: -32603,
            message: "Internal server error",
          },
          id: null,
        })
      }
    }
  })
  app.get("/mcp", async (req, res) => {
    console.log("Received GET MCP request")
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Method not allowed.",
        },
        id: null,
      })
    )
  })
  app.delete("/mcp", async (req, res) => {
    console.log("Received DELETE MCP request")
    res.writeHead(405).end(
      JSON.stringify({
        jsonrpc: "2.0",
        error: {
          code: -32000,
          message: "Method not allowed.",
        },
        id: null,
      })
    )
  })

  app.all(/.*/, (req, res) => {
    res.status(404).json("404")
  })

  app.listen(process.env.PORT || 3000)

  // async function setupServer() {}
}

start()
