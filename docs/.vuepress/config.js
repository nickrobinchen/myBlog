module.exports = {
    base: '/myBlog/',
    title: 'Nick的博客',
    description: 'My Vuepress blog',
    themeConfig: {
              // 你的GitHub仓库，请正确填写
            repo: 'https://github.com/nickrobinchen/myBlog',
            // 自定义仓库链接文字。
            repoLabel: 'My GitHub',
            nav: [
                  { text: 'Home', link: '/' },
                  { text: '第一篇博客', link: '/blog/FirstBlog.md' },
                  { text: '博客 2021.11.13', link: '/blog/Blog20211113.md' }
              ],
            sidebar: [
                ['/', '首页'],
                ['/blog/FirstBlog.md', '2021年5月29日'],
                ['/blog/Blog20211113.md', '2021年11月13日']
            ]
          
    }
}