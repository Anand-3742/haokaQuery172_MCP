# AI-Powered SIM Card Recommendation MCP Tool

基于人工智能的号卡查询 MCP 工具。本项目通过自然语言理解用户需求，自动调用 172 号卡平台的接口获取号卡数据，并由 AI 为用户推荐最符合需求的套餐，显著减少用户选择的时间成本。

# **如果对你有帮助的话就点亮Star吧！这对我有非常大的意义，谢谢**

## 🚀 功能亮点

- **自然语言理解**：用户可通过对话描述需求，AI 自动识别关键条件。
- **号卡查询**：接入 172 号卡平台接口，获取最新号卡信息。
- **智能推荐**：结合用户需求和号卡数据，由 AI 推荐最佳方案。
- **节省时间**：减少用户在复杂套餐中筛选的时间。

## 🛠️ 环境要求

- Node.js >= 18
- npm >= 9

## 📦 安装与使用

1. **克隆项目到本地服务器**：

   ```bash
   git clone https://github.com/TacKana/haokaQuery172_MCP.git
   cd haokaQuery172_MCP
   ```

2. **配置环境变量**：

   复制 `.env.example` 文件并重命名为 `.env`，然后编辑 `.env` 文件，填写您的配置：

   ```env
   # 你的 172 号卡平台 Token
   TOKEN_172=xxx

   # 本地服务器端口
   PORT=3000
   ```

3. **安装依赖**：

   ```bash
   npm install
   ```

4. **启动开发服务器**：

   ```bash
   npm run start:dev
   ```

5. 访问本地服务，即可开始通过对话获取号卡推荐。

## 💬 使用示例

![image](/docs/image.jpg)

用户输入：

```
我想要一个流量大、月费低的电话卡
```

系统自动解析需求，调用 MCP 工具查询号卡数据，并返回 AI 推荐结果：

```
推荐套餐：流量王卡，月费 29 元，流量 50GB
```

## 📁 项目结构

```
.
├── src/             # 源码文件
├── .env.example     # 环境变量示例
├── package.json     # 项目依赖
├── package-lock.json # 锁定依赖版本
├── pnpm-lock.yaml   # pnpm 锁定文件
├── tsconfig.json    # TypeScript 配置
└── README.md        # 项目说明
```

## 🤝 贡献指南

欢迎贡献代码或提出 issue。请遵循 [GitHub Flow](https://guides.github.com/introduction/flow/) 进行协作。
