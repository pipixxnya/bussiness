enum FirmwareVersion {
    "启用" = 0,
    "禁用",
}

enum FirmwareUpdateState {
    "等待中" = 1,
    "升级中",
}

enum gatewayState {
    "在线" = 1,
    "离线",
}

enum gatewaySynStatus {
    "已同步" = 1,
    "待同步",
    "同步失败",
}

enum FirmwareVersionCompare {
    "版本号=" = 1,
    "版本号>",
    "版本号<",
    "版本号>=",
    "版本号<=",
}

// 告警状态
enum alarmStatus {
    "未恢复" = 1,
    "已恢复",
}
export {
    gatewayState,
    gatewaySynStatus,
    FirmwareVersion,
    FirmwareUpdateState,
    FirmwareVersionCompare,
    alarmStatus,
};
