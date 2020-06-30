export const Common = {
    // 上传图片
    upload: '/api/huoju/admin/system/fileUpload'
}

export const Member = {
    // 用户
    memberList: '/api/huoju/admin/account/getList',
    memberInfo: '/api/huoju/admin/account/getAccountInfo',
    memberUpdateNullity: '/api/huoju/admin/account/updateNullity',
    memberUpdatePasswd: '/api/huoju/admin/account/updatePasswd',
    memberLoginRecord: '/api/huoju/admin/account/getAccountLoginRecord',
    // vip等级
    vipList: '/api/huoju/admin/uservip/getList',
    vipAdd: '/api/huoju/admin/uservip/insert',
    vipUpdate: '/api/huoju/admin/uservip/update',
    vipDelete: '/api/huoju/admin/uservip/delete',

    // 用户查询接口 - 统计汇总
    getRegStatistics: '/api/huoju/admin/account/getRegStatistics',
    // 用户信用接口
    ucscorerecord: '/api/huoju/admin/ucscorerecord/getList',
    ucscorerecordSetScore: '/api/huoju/admin/ucscorerecord/setUserCreditScore',
    // 用户VIP等级回扣查询接口
    vipBackList: '/api/huoju/admin/viprebate/getList',
    vipBackAdd: '/api/huoju/admin/viprebate/insert',
    vipBackUpdate: '/api/huoju/admin/viprebate/update',
    vipBackDelete: '/api/huoju/admin/viprebate/delete'
    //
}

export const Content = {
    // 广告
    bannerList: '/api/huoju/admin/adinfo/getList',
    bannerAdd: '/api/huoju/admin/adinfo/insert',
    bannerUpdate: '/api/huoju/admin/adinfo/update',
    bannerDelete: '/api/huoju/admin/adinfo/delete',
    // 公告
    noticeList: '/api/huoju/admin/noticeinfo/getList',
    noticeAdd: '/api/huoju/admin/noticeinfo/insert',
    noticeUpdate: '/api/huoju/admin/noticeinfo/update',
    noticeDelete: '/api/huoju/admin/noticeinfo/delete',
    // 帮助中心
    helpList: '/api/huoju/admin/helpinfo/getList',
    helpAdd: '/api/huoju/admin/helpinfo/insert',
    helpUpdate: '/api/huoju/admin/helpinfo/update',
    helpDelete: '/api/huoju/admin/helpinfo/delete',
    // 邀请图片查询
    inviteList: '/api/huoju/admin/invitepicture/getList',
    inviteAdd: '/api/huoju/admin/invitepicture/insert',
    inviteUpdate: '/api/huoju/admin/invitepicture/update',
    inviteDelete: '/api/huoju/admin/invitepicture/delete'
}

export const System = {
    // 用户
    userList: '/api/huoju/admin/admininfo/getList',
    userAdd: '/api/huoju/admin/admininfo/insert',
    userUpdate: '/api/huoju/admin/admininfo/update',
    userDelete: '/api/huoju/admin/admininfo/delete',
    userToggleNullity: '/api/huoju/admin/admininfo/setNullity',
    // 角色
    roleList: '/api/huoju/admin/roleinfo/getList',
    roleAdd: '/api/huoju/admin/roleinfo/insert',
    roleUpdate: '/api/huoju/admin/roleinfo/update',
    roleDelete: '/api/huoju/admin/roleinfo/delete',
    roleOfRes: '/api/huoju/admin/roleinfo/resourceByRoleId',
    roleSaveRes: '/api/huoju/admin/roleinfo/resourceByRoleIdSave',
    // 后台配置参数
    argsList: '/api/huoju/admin/exclude/getList',
    // ip白名单
    wlList: '/api/huoju/admin/ipwhite/getList',
    wlAdd: '/api/huoju/admin/ipwhite/insert',
    wlUpdate: '/api/huoju/admin/ipwhite/update',
    wlDelete: '/api/huoju/admin/ipwhite/delete',
    // 资源管理
    resourceList: '/api/huoju/admin/resourceinfo/getList',
    resourceAdd: '/api/huoju/admin/resourceinfo/insert',
    resourceUpdate: '/api/huoju/admin/resourceinfo/update',
    resourceDelete: '/api/huoju/admin/resourceinfo/delete',

    // 操作日志
    operationrecord: '/api/huoju/admin/operationrecord/getList'
}

export const Task = {
    // 任务列表
    list: '/api/huoju/admin/taskinfo/getList',
    add: '/api/huoju/admin/taskinfo/insert',
    // 任务类型
    typeList: '/api/huoju/admin/tasktype/getList',
    typeAdd: '/api/huoju/admin/tasktype/insert',
    typeUpdate: '/api/huoju/admin/tasktype/update',
    typeDelete: '/api/huoju/admin/tasktype/delete',
    // 待审批的任务列表（用户做任务）
    userRecord: '/api/huoju/admin/taskuserrecord/getList',
    userRecordDetail: '/api/huoju/admin/taskuserrecord/getDetailList'
}

export const Charge = {
    // 渠道
    channelList: '/api/huoju/admin/paychannelconfig/getList',
    channelAdd: '/api/huoju/admin/paychannelconfig/insert',
    channelUpdate: '/api/huoju/admin/paychannelconfig/update',
    channelDelete: '/api/huoju/admin/paychannelconfig/delete'
}

export const Audit = {
    // 账号绑定
    accountBindList: '/api/huoju/admin/uttypeaudit/getList',
    accountRemoveStatus: '/api/huoju/admin/uttypeaudit/setAuditStatusRemove',
    accountStatusPass: '/api/huoju/admin/uttypeaudit/setAuditStatusPass',
    accountStatusFail: '/api/huoju/admin/uttypeaudit/setAuditStatusFail',
    // 创建任务
    taskList: '/api/huoju/admin/ataskinfo/getList',
    taskPass: '/api/huoju/admin/ataskinfo/setAuditStatusPass',
    taskFail: '/api/huoju/admin/ataskinfo/setAuditStatusFail',
    // 用户任务审核查询接口
    taskUserRecordList: '/api/huoju/admin/ataskuserrecord/getList',
    taskUserRecordPass: '/api/huoju/admin/ataskuserrecord/setAuditStatusPass',
    taskUserRecordFail: '/api/huoju/admin/ataskuserrecord/setAuditStatusFail',
    // 用户提现审核查询接口
    withdrawList: '/api/huoju/admin/auserwithdraw/getList',
    withdrawPass: '/api/huoju/admin/auserwithdraw/setAuditStatusPass',
    withdrawFail: '/api/huoju/admin/auserwithdraw/setAuditStatusFail',
    withdrawPay: '/api/huoju/admin/auserwithdraw/setAuditStatusPay',
    withdrawPaysuc: '/api/huoju/admin/auserwithdraw/setAuditStatusPaySuc'
}
