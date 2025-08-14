# Social Pulse CN

中英双语 README

## 快速开始 / Quick Start

```bash
pnpm i && pnpm prisma:dev && pnpm dev
```

默认使用名为 `prisma-postgres-indigo-xylophone` 的 PostgreSQL 数据库。如需切换到 Supabase(Postgres)，请提供 `SUPABASE_URL` 与 `SUPABASE_ANON_KEY` 并设置 `DATABASE_PROVIDER=postgresql` 与 `DATABASE_URL`。

## 环境变量 / Environment

见 `.env.example`。

> 若 Prisma 引擎无法从官方 CDN 下载，可执行 `pnpm add -D @prisma/engines` 并在环境变量中设置 `PRISMA_QUERY_ENGINE_LIBRARY` 指向本地引擎文件，示例见 `.env.example`。

## CSV 模板 / CSV Templates

- `public/templates/accounts_metrics.csv`
- `public/templates/videos_metrics.csv`

列说明：

**accounts_metrics.csv**
```
platform,account_id,handle,date(YYYY-MM-DD),followers,likes,comments,shares
```
**videos_metrics.csv**
```
platform,account_id,video_id,title,date(YYYY-MM-DD),views,likes,comments,shares,saves,url(optional)
```

## 开发说明 / Development Notes

- Next.js App Router + TypeScript
- Tailwind CSS + Headless UI + Chart.js
- Prisma ORM (PostgreSQL)
- 可选邮箱免密登录 (NextAuth)，可通过 `AUTH_DISABLED=true` 关闭。
- 不进行任何爬虫；仅支持合规数据来源。

## 测试 / Testing

Playwright 用于端到端测试。首次运行前需要下载浏览器：

```bash
pnpm exec playwright install --with-deps
pnpm test
```

如果因网络限制导致下载失败，请参考 [docs/PLAYWRIGHT.md](docs/PLAYWRIGHT.md) 获取离线或 Vercel 环境的解决方案。

## 部署到 Vercel / Deploy

1. 将仓库导入 Vercel。
2. 设置环境变量：参考 `.env.example`。
3. 构建命令：`pnpm build`。

## 免责声明 / Notice

项目仅提供手工录入、CSV 上传以及未来的官方 API/自动化工具接入。严禁使用任何爬虫或违反平台条款的方式获取数据。
