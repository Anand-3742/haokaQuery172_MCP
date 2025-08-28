import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { haokaQuery_172 } from "./tools/haokaQuery172.tool.js"

export const createMcpServer = () => {
  const mcpServer = new McpServer({
    name: "haokaQuery",
    version: "1.0.0",
  })
  haokaQuery_172(mcpServer)
  return mcpServer
}
