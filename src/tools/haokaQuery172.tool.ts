import z from "zod"
import { createRequest } from "./utils/request.utils.js"
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

// 定义传入数据对象的枚举 Zod 模式
const BackMoneyTypeSchema = z.enum(["次月返", "秒返"])
const IsKuanSchema = z.enum(["0", "1"])
const NumberTypeSchema = z.enum(["不支持", "在线选号", "激活选号"])
const OperatorSchema = z.enum(["广电", "电信", "移动", "联通", "靓号"])
const PackageTypeSchema = z.enum(["全国卡", "省内卡"])
const PriceTimeSchema = z.enum(["一年", "两年", "二十年", "半年", "套餐可参与存费形成长期", "官方可查长期"])

// 定义人工智能传入数据校验的 Zod 模式
const RequestSchema = z.object({
  age1: z.string().optional().describe("最小年龄"),
  age2: z.string().optional().describe("最大年龄"),
  Area: z.string().optional().describe("归属地"),
  BackMoneyType: BackMoneyTypeSchema.optional().describe("返佣类型"),
  IsKuan: IsKuanSchema.optional().describe("是否为宽带产品"),
  Name1: z.string().optional().describe("号卡别名"),
  NumberType: NumberTypeSchema.optional().describe("是否支持选号/选号类型"),
  Operator: OperatorSchema.optional().describe("运营商（号卡类型）"),
  PackageType: PackageTypeSchema.optional().describe("套餐类型"),
  PriceTime: PriceTimeSchema.optional().describe("优惠期"),
  ProductName: z.string().optional().describe("号卡ID"),
  SendAddr: z.string().optional().describe("发货地（地级市）"),
})

// 定义MCP响应的数据格式
const DatumSchema = {
  productID: z.number().describe("号卡唯一ID"),
  productName: z.string().describe("号卡名称"),
  flag: z.boolean().describe("true为上架，false为下架"),
  remark: z.string().describe("套餐详细说明"),
  createTime: z.string().describe("号卡上线时间"),
  operator: z.string().describe("运营商（号卡类型）"),
  mainPic: z.string().describe("号卡套餐主图链接"),
  area: z.string().describe("号卡归属地"),
  disableArea: z.string().describe("禁止发货的地区"),
  age1: z.number().describe("用户最小年龄要求"),
  age2: z.number().describe("用户最大年龄要求"),
}
const mcpResponseSchema = z.object({
  code: z.number().describe("状态码"),
  count: z.number().describe("符合查询条件的数据总量"),
  data: z.array(z.object(DatumSchema)).describe("号卡数据数组"),
})

/**
 * 注册号卡查询工具
 * @param name 工具名称
 * @param description 工具描述
 * @param schemas 请求参数模式
 * @param handler 工具处理函数
 * @returns 工具注册结果
 */

export const haokaQuery_172 = (mcpServer: McpServer) => {
  return mcpServer.registerTool(
    "172haokaQuery",
    {
      title: "172号卡查询",
      description: "172号卡查询工具-按条件筛选手机卡。",
      inputSchema: RequestSchema.shape,
      outputSchema: mcpResponseSchema.shape,
    },
    /**
     * 处理号卡查询请求
     * @param requestData 请求参数
     * @returns 查询结果内容
     */
    async (args, _extra) => {
      const request = createRequest()
      const response = await request.get("/Products/Query", {
        params: { OnShop: "true", limit: "500", ...args },
      })
      const newData = formatMcpResponseSchema(response.data)
      return {
        structuredContent: newData,
        content: [
          { type: "text", text: JSON.stringify(newData) }, // 备份/可读文本
        ],
      }
    }
  )
}

/**
 * 格式化 MCP 响应数据
 * @param oldData - 原始的 MCP 响应数据
 * @returns 格式化后的数据，仅包含指定字段
 */
function formatMcpResponseSchema(oldData: z.infer<typeof mcpResponseSchema>) {
  const newData: z.infer<typeof mcpResponseSchema> = {
    code: oldData.code,
    count: oldData.count,
    data: [],
  }

  newData.data.push(
    ...oldData.data.map((item) => {
      const { productID, productName, flag, remark, createTime, operator, mainPic, area, disableArea, age1, age2 } =
        item
      return {
        productID,
        productName,
        flag,
        remark,
        createTime,
        operator,
        mainPic,
        area,
        disableArea,
        age1,
        age2,
      }
    })
  )
  return newData
}
