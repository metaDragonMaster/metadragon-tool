<template>
    <div class="script-order-view">
        <el-table
            v-show="!dataIsEmpty"
            class="theme-bg-blur"
            :data="tableDataDeep"
            size="small"
            :cell-style="{ background: 'transparent' }"
        >
            <el-table-column prop="scriptNo" label="脚本编号" width="120">
                <template v-slot="{ row }">
                    <img class="table-icon icon-script" src="@/assets/icons/icon-script.png" alt />
                    <span>{{ row.scriptNo }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="ethAddress" label="钱包地址" min-width="360">
                <template v-slot="{ row }">
                    <span>{{ row.ethAddress }}</span>
                    <img class="table-icon icon-copy" src="@/assets/icons/icon-copy.png" alt />
                </template>
            </el-table-column>
            <el-table-column prop="implement" label="执行数量" width="108" />
            <el-table-column prop="startData" label="开始时间" width="135" />
            <el-table-column prop="endData" label="结束时间" width="135" />
            <el-table-column prop="status" label="脚本状态" width="86">
                <template v-slot="{ row }">
                    <div class="child-center">
                        <span :class="row.status.className">{{ row.status.text }}</span>
                        <img class="right" :src="row.status.icon" alt />
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <ul class="script-card-list theme-bg-blur" v-show="!dataIsEmpty">
            <li class="script-card-item" v-for="item in tableDataDeep" :key="item.id">
                <div>
                    <span>脚本列表</span>
                    <img class="table-icon icon-script" src="@/assets/icons/icon-script.png" alt />
                    <span>{{ item.scriptNo }}</span>
                </div>
                <div>
                    <span>钱包地址</span>
                    <span class="font-hide">{{ item.ethAddress }}</span>
                    <img class="table-icon icon-copy" src="@/assets/icons/icon-copy.png" alt />
                </div>
                <div>
                    <span>执行数量</span>
                    <span>{{ item.implement }}</span>
                </div>
                <div>
                    <span>开始时间</span>
                    <span>{{ item.startData }}</span>
                </div>
                <div>
                    <span>结束时间</span>
                    <span>{{ item.endData }}</span>
                    <p class="right child-center">
                        <span :class="item.status.className">{{ item.status.text }}</span>
                        <img class="icon-status" :src="item.status.icon" alt />
                    </p>
                </div>
            </li>
        </ul>
        <baseEmpty v-show="dataIsEmpty" title="还没有订单~快去创建一个吧"></baseEmpty>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { deepClone } from "@/utils/tools";
import baseEmpty from "@/components/baseEmpty"

const tableData = [
    {
        scriptNo: "1089899781",
        ethAddress: "0x44431dFcf7E5955E31d133aCCcad7Fbf8C6Ef9cc",
        implement: "99",
        startData: "2021-09-07 21:22:22",
        endData: "2021-09-07 21:22:22",
        status: "failed",
    },
    {
        scriptNo: "1089899782",
        ethAddress: "0x44431dFcf7E5955Edas133Ce6cad7Fbf8C6Ef9cc",
        implement: "99",
        startData: "2021-09-07 21:22:22",
        endData: "2021-09-07 21:22:22",
        status: "success",
    },
    {
        scriptNo: "1089899783",
        ethAddress: "0x44431dFcf7E5955E31d133Ce6cad7Fbf8C6Ef9ca",
        implement: "99",
        startData: "2021-09-07 21:22:22",
        endData: "2021-09-07 21:22:22",
        status: "wait",
    },
    {
        scriptNo: "1089899784",
        ethAddress: "0x44431dFcf7E5955E31d133Ce6cadffbf8C6Ef9cc",
        implement: "99",
        startData: "2021-09-07 21:22:22",
        endData: "2021-09-07 21:22:22",
        status: "over",
    },
];
const statusList = {
    failed: {
        className: "status-failed",
        text: "创建失败",
        icon: require("@/assets/icons/icon-failed.png"),
    },
    success: {
        className: "status-success",
        text: "正在运行",
        icon: require("@/assets/icons/icon-success.png"),
    },
    wait: {
        className: "status-wait",
        text: "等待中",
        icon: require("@/assets/icons/icon-wait.png"),
    },
    over: {
        className: "status-over",
        text: "已完成",
        icon: require("@/assets/icons/icon-over.png"),
    },
};
const tableDataDeep = computed(() => {
    const deepList = deepClone(tableData);
    deepList.map((item) => {
        let status = item.status;
        let icon = statusList[status].icon;
        let text = statusList[status].text;
        let className = statusList[status].className;
        item.status = {
            className: className,
            text: text,
            icon: icon,
            status: status,
        };
    });
    // return deepList;
    return [];
});
const dataIsEmpty = computed(()=> !(tableDataDeep.value.length < 0));
console.log(dataIsEmpty.value);
</script>
<style lang='scss' scoped>
@import "@/styles/theme/variable.scss";
.script-order-view {
    padding-bottom: 20px;
}
.status-failed {
    color: $failed;
}
.status-success {
    color: $success;
}
.status-wait {
    color: $wait;
}
.status-over {
    color: $over;
}

.script-card-list {
    border-radius: $radius-square-big;
    padding: 4px 20px;
    @media screen and (min-width: 769px) {
        display: none;
    }
    .script-card-item {
        padding: 10px 0;
        font-size: 12px;
        &:not(:last-child) {
            border-bottom: 1px solid #6b607a;
        }
        & > div {
            display: flex;
            align-items: center;
            width: 100%;
            &:not(:last-child) {
                margin-bottom: 10px;
            }
            & > *:first-child {
                // display: inline-block;
                width: 4rem;
                color: #bdbdbd;
            }
            .font-hide {
                max-width: 185px;
            }
            .icon-status {
                margin-left: 10px;
            }
        }
    }
}
:deep(.el-table) {
    border-radius: 20px;
    padding: 10px;
    @media screen and (max-width: 768px) {
        display: none;
    }
    tr,
    th.el-table__cell {
        background-color: transparent;
        color: $font-color;
    }
}
:deep(.el-table__inner-wrapper) {
    &::before {
        //去掉 列表最下面的白边
        display: none;
    }
    table th {
        //去掉 表头 的下边框
        border-bottom: none !important;
    }
    .el-table__body .el-table__row {
        & > td {
            //所有行的下边框的颜色
            border-color: #6b607a;
        }
        &:last-child > td {
            //去掉最下行的下边框
            border-bottom: none;
        }
    }
}
.icon-script {
    margin-right: 6px;
    @media screen and (max-width: 768px) {
        width: 12px;
    }
}
.icon-copy {
    margin-left: 10px;
    margin-top: -4px;
    cursor: pointer;
}
</style>