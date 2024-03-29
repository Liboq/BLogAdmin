
module.exports = {
    //指定一个制表符等于多少个空格。默认为 2。
    useTabs: true,
    //指定箭头函数参数是否永远使用圆括号。可以是 “always”、“avoid”、或 “as-needed”。默认为 “always”。
    arrowParens: 'avoid',
    //指定每行代码的最大宽度。默认为 80。
    printWidth: 120,
    //指定一个制表符等于多少个空格。默认为 2。
    tabWidth: 2,
    // 指定是否在语句末尾添加分号。默认为 true。
    semi: true,
    //指定是否使用单引号而不是双引号。默认为 false。
    singleQuote: true,

    //指定是否在对象字面量中的括号之间添加空格。默认为 true。
    bracketSpacing: true,
    // 首次出现在1.15.0中
    // 由于历史原因，在文本文件中存在两种常用的行结尾的风格。那是\n（或LF换行）和\r\n（或CRLF用于回车+换行）。
    // 前者在 Linux 和 macOS 上很常见，而后者在 Windows 上很普遍。可以在维基百科上找到解释其原因的一些细节。
    // 默认情况下，Prettier 会保留给定文件已使用的行尾的风格。它还将一个文件中的混合行结尾转换为它在第一行末尾找到的结尾。
    // 当人们在不同操作系统上协作项目时，很容易在中央 git 存储库中找到混合行结尾。
    // Windows 用户也可能会意外地将已提交文件中的行结尾更改 LF 为 CRLF。
    // 这样做会产生很大的影响 git diff，如果在代码审查过程中没有注意到，那么file（git blame）的所有逐行历史都会丢失。
    // 如果你想确保你的 git 存储库在 Prettier 所涵盖的文件中只包含 Linux 风格的行结尾：
    // 1.将 endOfLine 选项设置为 lf
    // 2.配置一个 pre-commit 钩子，运行 Prettier
    // 3.配置 Prettier 在CI管道中运行 --check flag
    // 4.Windows用户在使用您的仓库之前，运行 git config core.autocrlf false，以便git 在 checkout 时不会转换 LF 为 CRLF。或者，您可以添加 * text=auto eol=lf 到 repo 的.gitattributes 文件来实现此目的。

    // 所有操作系统中的所有现代文本编辑器都能够在使用 \n（LF）时正确显示行结尾。但是，旧版本的 Windows 记事本会直观地将这些行压缩成一行。
    // 有效选项：

    // "auto" - 维护现有的行结尾（通过查看第一行之后使用的内容来标准化一个文件中的混合值）

    // "lf"- Line Feed only（\n），在 Linux 和 macOS 以及 git repos 内部很常见

    // "crlf"- 回车符+换行符（\r\n），在 Windows 上很常见

    // "cr"- 仅限回车符（\r），很少使用
    endOfLine: 'auto',
    //指定是否在数组和对象字面量的末尾添加逗号。可能的值是 “none”、“es5”（在 ES5 中有效）和 “all”。默认为 “es5”。
    trailingComma: 'none'
}

