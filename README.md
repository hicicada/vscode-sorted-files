# VS Code Sorted Files Extension

一个 VS Code 扩展，可以自动对项目文件夹中的文件进行排序。

## 功能

该扩展提供以下主要功能：

- **自动文件排序**：当你保存文件时，会自动修改项目中所有文件的修改时间，以此来改变 VS Code 文件浏览器中的排序顺序
- **自定义排序顺序**：支持通过配置文件来指定特定文件的排序优先级
- **智能 .gitignore 支持**：自动读取项目的 `.gitignore` 文件，排除不需要排序的文件和文件夹
- **自动激活**：打开工作区时自动启用，关闭时自动禁用排序功能
- **日志输出**：提供详细的操作日志，便于调试和监控

## 工作原理

1. **启动时**：扩展自动激活，从配置文件读取排序优先级列表
2. **监听保存**：监听文档保存事件，每当保存文件时触发排序流程
3. **配置读取**：从配置文件读取自定义的排序文件列表
4. **时间戳修改**：通过修改文件的最后修改时间，改变文件在浏览器中的显示顺序

## 配置

### 设置项

该扩展支持以下配置：

- `vscode-sorted-files.file`: 指向排序配置文件的路径（相对于工作区根目录）
    - 默认值：需要在工作区设置中指定
    - 配置文件格式：每行一个文件路径，按优先级从上到下排列

### 示例配置文件

创建一个 `.sortedfiles` 文件（或其他你指定的文件），内容示例：

```
src/index.ts
src/main.ts
package.json
README.md
```

文件列表中的文件会按照指定的顺序排在最前面，其余文件按字母顺序排列在后面。

### VS Code 设置示例

在 `.vscode/settings.json` 中添加：

```json
{
    "vscode-sorted-files.file": ".sortedfiles"
}
```

## 使用场景

- **项目文档**：保持重要文档（如 README、CHANGELOG）始终显示在文件列表顶部
- **源代码组织**：保持关键的入口文件（如 index.ts、main.ts）在显眼的位置
- **开发工作流**：快速定位经常修改的文件

## 扩展详情

| 属性              | 值                  |
| ----------------- | ------------------- |
| 扩展名            | vscode-sorted-files |
| 发布者            | hicicada            |
| 版本              | 0.0.8               |
| 最低 VS Code 版本 | 1.108.1             |
| 分类              | 其他                |

## 核心代码模块

- **extension.ts**: 扩展的入口点，管理激活和禁用逻辑
- **sort.ts**: 核心排序逻辑，处理文件时间戳的修改
- **config.ts**: 配置文件读取
- **settings.ts**: VS Code 工作区配置管理
- **path.ts**: 工作区路径获取
- **output.ts**: 日志输出通道

## 故障排除

- **文件排序不生效**：
    - 确认 `vscode-sorted-files.file` 配置已正确设置
    - 检查配置文件是否存在且格式正确
    - 查看输出面板了解错误信息

- **性能问题**：
    - 如果项目文件过多，可能需要更多时间处理
    - 查看 `.gitignore` 配置是否正确，避免不必要的文件扫描

## 开发

### 构建

```bash
pnpm install
pnpm run compile
```

### 监视模式

```bash
pnpm run watch
```

### 测试

```bash
pnpm test
```

### 代码检查

```bash
pnpm run lint
```

## 许可证

参见 [LICENSE](LICENSE) 文件

## 反馈和贡献

欢迎提交 Issue 和 Pull Request：[GitHub 仓库](https://github.com/hicicada/vscode-sorted-files)
