import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    // {
    //   path: '/',
    //   component: Layout,
    //   redirect: '/dashboard',
    //   meta: { title: '数据中心', icon: 'dashboard' },
    //   children: [
    //     {
    //       path: 'dashboard',
    //       name: 'Dashboard',
    //       component: () => import('@/views/dashboard/index'),
    //       meta: { title: '首页', icon: 'dashboard' }
    //     }
    //   ]
    // },

    {
        path: '/member',
        component: Layout,
        redirect: '/member/index',
        meta: { title: 'MemberRoot', icon: 'dashboard' },
        children: [
            {
                path: 'index',
                name: 'Member',
                component: () => import('@/views/member/index'),
                meta: { title: 'Member', icon: 'dashboard', desc: '这里是网站注册用户信息' }
            },
            {
                path: 'vip',
                name: 'MemberVip',
                component: () => import('@/views/member/vip'),
                meta: { title: 'MemberVip', icon: 'dashboard' }
            },
            {
                path: 'vip-back',
                name: 'MemberVipBack',
                component: () => import('@/views/member/vip-back'),
                meta: { title: 'MemberVipBack', icon: 'dashboard' }
            },

            {
                path: 'ucscorerecord',
                name: 'ucScoreRecord',
                component: () => import('@/views/member/ucscorerecord'),
                meta: { title: 'ucScoreRecord', icon: 'dashboard' }
            },
            {
                path: 'finance',
                name: 'MemberFinance',
                component: () => import('@/views/member/finance'),
                meta: { title: 'MemberFinance', icon: 'dashboard' }
            },
            {
                path: 'account-bind',
                name: 'MemberAccountBind',
                component: () => import('@/views/member/account-bind'),
                meta: { title: 'MemberAccountBind', icon: 'dashboard' }
            },
            {
                path: ':userId',
                name: 'MemberDetail',
                component: () => import('@/views/member/_id'),
                hidden: true,
                meta: { title: 'MemberDetail', icon: 'dashboard', desc: '这里是网站注册用户信息' }
            }
            // {
            //   path: 'normal-card',
            //   name: 'NormalCard',
            //   component: () => import('@/views/member/normal-card'),
            //   meta: { title: 'NormalCard', icon: 'dashboard' }
            // },
            // {
            //   path: 'secret-card',
            //   name: 'SecretCard',
            //   component: () => import('@/views/member/secret-card'),
            //   meta: { title: 'SecretCard', icon: 'dashboard' }
            // }
        ]
    },

    // {
    //     path: '/charge',
    //     component: Layout,
    //     redirect: '/charge/online',
    //     meta: { title: 'ChargeRoot', icon: 'dashboard' },
    //     children: [
    //         // {
    //         //   path: '',
    //         //   name: 'ChargeMember',
    //         //   component: () => import('@/views/charge/member'),
    //         //   meta: { title: 'ChargeMember', icon: 'dashboard' }
    //         // },
    //         {
    //             path: 'online',
    //             name: 'ChargeOnline',
    //             component: () => import('@/views/charge/online'),
    //             meta: { title: 'ChargeOnline', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'offline',
    //             name: 'ChargeOffline',
    //             component: () => import('@/views/charge/offline'),
    //             meta: { title: 'ChargeOffline', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'setting',
    //             name: 'ChargeSetting',
    //             component: () => import('@/views/charge/setting'),
    //             meta: { title: 'ChargeSetting', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'channel',
    //             name: 'ChargeChannel',
    //             component: () => import('@/views/charge/channel'),
    //             meta: { title: 'ChargeChannel', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'payee',
    //             name: 'ChargePayee',
    //             component: () => import('@/views/charge/payee'),
    //             meta: { title: 'ChargePayee', icon: 'dashboard' }
    //         }
    //     ]
    // },

    // {
    //     path: '/audit',
    //     component: Layout,
    //     redirect: '/audit/withdraw',
    //     meta: { title: 'AuditRoot', icon: 'dashboard' },
    //     children: [
    //         {
    //             path: 'withdraw',
    //             name: 'AuditWithdraw',
    //             component: () => import('@/views/audit/withdraw'),
    //             meta: { title: 'AuditWithdraw', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'charge',
    //             name: 'AuditCharge',
    //             component: () => import('@/views/audit/charge'),
    //             meta: { title: 'AuditCharge', icon: 'dashboard' }
    //         },
    //         // {
    //         //   path: 'member',
    //         //   name: 'AuditMember',
    //         //   component: () => import('@/views/audit/member'),
    //         //   meta: { title: 'AuditMember', icon: 'dashboard' }
    //         // },
    //         {
    //             path: 'account-bind',
    //             name: 'AuditAccountBind',
    //             component: () => import('@/views/audit/account-bind'),
    //             meta: { title: 'AuditAccountBind', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'task',
    //             name: 'AuditTask',
    //             component: () => import('@/views/audit/task'),
    //             meta: { title: 'AuditTask', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'task-user-record',
    //             name: 'AuditTaskUserRecord',
    //             component: () => import('@/views/audit/task-userrecord'),
    //             meta: { title: 'AuditTaskUserRecord', icon: 'dashboard' }
    //         }
    //         // {
    //         //   path: 'order',
    //         //   name: 'AuditOrder',
    //         //   component: () => import('@/views/audit/order'),
    //         //   meta: { title: 'AuditOrder', icon: 'dashboard' }
    //         // },
    //         // {
    //         //   path: 'card-bind',
    //         //   name: 'AuditCardBind',
    //         //   component: () => import('@/views/audit/card-bind'),
    //         //   meta: { title: 'AuditCardBind', icon: 'dashboard' }
    //         // },
    //         // {
    //         //   path: 'bank-pay',
    //         //   name: 'AuditBankPay',
    //         //   component: () => import('@/views/audit/bank-pay'),
    //         //   meta: { title: 'AuditBankPay', icon: 'dashboard' }
    //         // }
    //     ]
    // },

    // {
    //   path: '/order',
    //   component: Layout,
    //   redirect: '/order',
    //   meta: { title: 'OrderRoot', icon: 'dashboard' },
    //   children: [
    //     {
    //       path: '',
    //       name: 'Order',
    //       component: () => import('@/views/order/index'),
    //       meta: { title: 'Order', icon: 'dashboard' }
    //     }
    //   ]
    // },

    // {
    //     path: '/finance',
    //     component: Layout,
    //     redirect: '/finance/withdraw',
    //     meta: { title: 'FinanceRoot', icon: 'dashboard' },
    //     children: [
    //         {
    //             path: 'withdraw',
    //             name: 'FinanceWithdraw',
    //             component: () => import('@/views/finance/withdraw'),
    //             meta: { title: 'FinanceWithdraw', icon: 'dashboard' }
    //         }
    //         // {
    //         //   path: 'transfer',
    //         //   name: 'FinanceTransfer',
    //         //   component: () => import('@/views/finance/transfer'),
    //         //   meta: { title: 'FinanceTransfer', icon: 'dashboard' }
    //         // },
    //         // {
    //         //   path: 'charge',
    //         //   name: 'FinanceCharge',
    //         //   component: () => import('@/views/finance/charge'),
    //         //   meta: { title: 'FinanceCharge', icon: 'dashboard' }
    //         // },
    //         // {
    //         //   path: 'instead-charge',
    //         //   name: 'FinanceInsteadCharge',
    //         //   component: () => import('@/views/finance/instead-charge'),
    //         //   meta: { title: 'FinanceInsteadCharge', icon: 'dashboard' }
    //         // },
    //         // {
    //         //   path: 'income',
    //         //   name: 'FinanceIncome',
    //         //   component: () => import('@/views/finance/income'),
    //         //   meta: { title: 'FinanceIncome', icon: 'dashboard' }
    //         // },
    //         // {
    //         //   path: 'day-report',
    //         //   name: 'FinanceDayReport',
    //         //   component: () => import('@/views/finance/day-report'),
    //         //   meta: { title: 'FinanceDayReport', icon: 'dashboard' }
    //         // }
    //     ]
    // },

    // {
    //     path: '/task',
    //     component: Layout,
    //     redirect: '/task/index',
    //     meta: { title: 'TaskRoot', icon: 'dashboard' },
    //     children: [
    //         {
    //             path: 'index',
    //             name: 'Task',
    //             component: () => import('@/views/task/index'),
    //             meta: { title: 'Task', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'user-record',
    //             name: 'TaskUserRecord',
    //             component: () => import('@/views/task/userRecord'),
    //             meta: { title: 'TaskUserRecord', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'user-record/:taskId',
    //             name: 'TaskUserRecordDetail',
    //             component: () => import('@/views/task/_userRecordTaskId'),
    //             hidden: true,
    //             meta: { title: 'TaskUserRecordDetail', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'types',
    //             name: 'TaskTypes',
    //             component: () => import('@/views/task/types'),
    //             meta: { title: 'TaskTypes', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'user-bind',
    //             name: 'TaskUserBind',
    //             component: () => import('@/views/task/user-bind'),
    //             meta: { title: 'TaskUserBind', icon: 'dashboard' }
    //         }
    //         // {
    //         //   path: 'video',
    //         //   name: 'TaskVideo',
    //         //   component: () => import('@/views/task/video'),
    //         //   meta: { title: 'TaskVideo', icon: 'dashboard' }
    //         // },
    //         // {
    //         //   path: 'other',
    //         //   name: 'TaskOther',
    //         //   component: () => import('@/views/task/other'),
    //         //   meta: { title: 'TaskOther', icon: 'dashboard' }
    //         // },
    //         // {
    //         //   path: 'timeline',
    //         //   name: 'TaskTimeline',
    //         //   component: () => import('@/views/task/timeline'),
    //         //   meta: { title: 'TaskTimeline', icon: 'dashboard' }
    //         // }
    //     ]
    // },

    // {
    //     path: '/content',
    //     component: Layout,
    //     redirect: '/content/notice',
    //     meta: { title: 'ContentRoot', icon: 'dashboard' },
    //     children: [
    //         // {
    //         //   path: 'account-bind',
    //         //   name: 'ContentAccountBind',
    //         //   component: () => import('@/views/content/account-bind'),
    //         //   meta: { title: 'ContentAccountBind', icon: 'dashboard' }
    //         // },
    //         // {
    //         //   path: 'card-bind',
    //         //   name: 'ContentCardBind',
    //         //   component: () => import('@/views/content/card-bind'),
    //         //   meta: { title: 'ContentCardBind', icon: 'dashboard' }
    //         // },
    //         {
    //             path: 'notice',
    //             name: 'ContentNotice',
    //             component: () => import('@/views/content/notice'),
    //             meta: { title: 'ContentNotice', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'help',
    //             name: 'ContentHelp',
    //             component: () => import('@/views/content/help'),
    //             meta: { title: 'ContentHelp', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'banner',
    //             name: 'ContentBanner',
    //             component: () => import('@/views/content/banner'),
    //             meta: { title: 'ContentBanner', icon: 'dashboard' }
    //         },
    //         {
    //             path: 'invite',
    //             name: 'ContentInvite',
    //             component: () => import('@/views/content/invite'),
    //             meta: { title: 'ContentInvite', icon: 'dashboard' }
    //         }
    //         // {
    //         //   path: 'lottery',
    //         //   name: 'ContentLottery',
    //         //   component: () => import('@/views/content/lottery'),
    //         //   meta: { title: 'ContentLottery', icon: 'dashboard' }
    //         // },
    //         // {
    //         //   path: 'goods',
    //         //   name: 'ContentGoods',
    //         //   component: () => import('@/views/content/goods'),
    //         //   meta: { title: 'ContentGoods', icon: 'dashboard' }
    //         // }
    //     ]
    // },

    // {
    //   path: '/wechat',
    //   component: Layout,
    //   redirect: '/wechat/level',
    //   meta: { title: 'WechatRoot', icon: 'dashboard' },
    //   children: [
    //     {
    //       path: 'level',
    //       name: 'WechatLevel',
    //       component: () => import('@/views/wechat/level'),
    //       meta: { title: 'WechatLevel', icon: 'dashboard' }
    //     },
    //     {
    //       path: 'group-chat',
    //       name: 'WechatGroupChat',
    //       component: () => import('@/views/wechat/group-chat'),
    //       meta: { title: 'WechatGroupChat', icon: 'dashboard' }
    //     },
    //     {
    //       path: 'customer',
    //       name: 'WechatCustomer',
    //       component: () => import('@/views/wechat/customer'),
    //       meta: { title: 'WechatCustomer', icon: 'dashboard' }
    //     }
    //   ]
    // },

    // {
    //   path: '/device',
    //   component: Layout,
    //   redirect: '/device/data',
    //   meta: { title: 'DeviceRoot', icon: 'dashboard' },
    //   children: [
    //     {
    //       path: 'data',
    //       name: 'DeviceData',
    //       component: () => import('@/views/device/data'),
    //       meta: { title: 'DeviceData', icon: 'dashboard' }
    //     },
    //     {
    //       path: 'operating',
    //       name: 'DeviceOperating',
    //       component: () => import('@/views/device/operating'),
    //       meta: { title: 'DeviceOperating', icon: 'dashboard' }
    //     }
    //   ]
    // },

    {
        path: '/system',
        component: Layout,
        redirect: '/system/user',
        meta: { title: 'SystemRoot', icon: 'dashboard' },
        children: [
            {
                path: 'user',
                name: 'SystemUser',
                component: () => import('@/views/system/user'),
                meta: { title: 'SystemUser', icon: 'dashboard' }
            },
            {
                path: 'role',
                name: 'SystemRole',
                component: () => import('@/views/system/role'),
                meta: { title: 'SystemRole', icon: 'dashboard' }
            },
            {
                path: 'role/:roleid/resource',
                name: 'SystemRoleResource',
                component: () => import('@/views/system/_roleResource'),
                hidden: true,
                meta: { title: 'SystemRoleResource', icon: 'dashboard' }
            },
            {
                path: 'i18n',
                name: 'SystemI18n',
                component: () => import('@/views/system/i18n'),
                meta: { title: 'SystemI18n', icon: 'language' }
            },
            // {
            //   path: 'personal',
            //   name: 'SystemPersonal',
            //   component: () => import('@/views/system/personal'),
            //   meta: { title: 'SystemPersonal', icon: 'dashboard' }
            // },
            // {
            //   path: 'args',
            //   name: 'SystemArgs',
            //   component: () => import('@/views/system/args'),
            //   meta: { title: 'SystemArgs', icon: 'dashboard' }
            // },
            {
                path: 'resource',
                name: 'SystemResource',
                component: () => import('@/views/system/resource'),
                meta: { title: 'SystemResource', icon: 'dashboard' }
            },
            {
                path: 'white-list',
                name: 'SystemWhiteList',
                component: () => import('@/views/system/white-list'),
                meta: { title: 'SystemWhiteList', icon: 'dashboard' }
            },
            {
                path: 'args',
                name: 'SystemArgs',
                component: () => import('@/views/system/args'),
                meta: { title: 'SystemArgs', icon: 'dashboard' }
            },
            {
                path: 'logs',
                name: 'SystemLogs',
                component: () => import('@/views/system/logs'),
                meta: { title: 'SystemLogs', icon: 'dashboard' }
            }
        ]
    },

    // {
    //   path: '/fake',
    //   component: Layout,
    //   redirect: '/fake/fake',
    //   meta: { title: 'FakeRoot', icon: 'dashboard' },
    //   children: [
    //     {
    //       path: 'report',
    //       name: 'FakeReport',
    //       component: () => import('@/views/fake/report'),
    //       meta: { title: 'FakeReport', icon: 'dashboard' }
    //     }
    //   ]
    // },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/member', hidden: true }
]

const createRouter = () =>
    new Router({
    // mode: 'history', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: constantRoutes
    })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
