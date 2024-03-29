export const permmsionList = [
    {
        status:1000,
        name:'首页',
        children:[
            {
                status:100001,
                name:'新建文章标签',
            },
            {
                status:100002,
                name:'删除文章标签',
            },
            {
                status:100003,
                name:'编辑文章标签',
            },
            {
                status:100004,
                name:'新建文章类别',
            },
            {
                status:100005,
                name:'删除文章类别',
            },
            {
                status:100006,
                name:'编辑文章类别',
            },
        ]
    },
    {
        status:1001,
        name:'文章',
        children:[
            {
                status:100101,
                name:'写文章',
            },
            {
                status:100102,
                name:'编辑',
            },
            {
                status:100103,
                name:'删除',
            },
        ]
    },
    {
        status:1002,
        name:'关于',
    }, 
    {
        status:1003,
        name:'留言',
        children:[
            {
                status:100301,
                name:'查看'
            },
            {
                status:100302,
                name:'删除'
            }
        ]
    },
    {
        status:1004,
        name:'图库',
        children:[
            {
                status:100401,
                name:'新增图库'
            },
            {
                status:100402,
                name:'更新'
            },
            {
                status:100403,
                name:'删除'
            },
            {
                status:100404,
                name:'查看图库'
            },
            
        ]
    }, 
    {
        status:1005,
        name:'图表'
    },
    {
        status: 1006,
        name:'首页轮播编辑',
        children:[
            {
                status:100601,
                name:'删除'
            },
            {
                status:100602,
                name:'保存'
            },
            {
                status:100603,
                name:'切换'
            },
        ]
    },
    {
        status: 1007,
        name:'资源分配',
        children:[
            {
                status:100701,
                name:'角色管理',
                children:[
                    {
                        status:10070101,
                        name:'新增角色'
                    },
                    {
                        status:10070102,
                        name:'删除角色'
                    },
                    {
                        status:10070103,
                        name:'编辑角色'
                    },
                ]
            },
            {
                status:100702,
                name:'权限管理'
            },
            {
                status:100703,
                name:'切换'
            },
        ]
    }
]
