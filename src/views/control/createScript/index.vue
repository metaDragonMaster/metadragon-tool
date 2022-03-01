<template>
    <div class="create-script-view">
        <div class="select theme-bg-blur">
            <CheckList label="选择脚本" :list="checkList">
                <template v-slot:item="{ item }">
                    <ThemeButton
                        :type="item.isChecked ? 'square' : 'dotted'"
                        @click="change(item)"
                    >{{ item.title }}</ThemeButton>
                </template>
            </CheckList>
            <CheckList label="当前选择" :list="checkedList">
                <template v-slot:item="{ item }">
                    <ThemeButton type="square">{{ item.title }}</ThemeButton>
                </template>
            </CheckList>
        </div>
        <div class="query-address child-center">
            <ThemeButton class="open-dialog child-center" type="dotted" @click="openDialog">
                <img class="icon" src="@/assets/icons/Icon_Add.png" alt />
                <span>请输入要查询的钱包地址</span>
            </ThemeButton>
            <ThemeButton class="query" type="square">查询</ThemeButton>
        </div>
        <div class="create-script child-center">
            <ThemeButton class="child-center" type="square">
                <img src="@/assets/icons/Icon_create.png" alt />
                <span>创建新脚本</span>
            </ThemeButton>
        </div>
        <!-- <el-dialog
            custom-class="theme-dialog"
            v-model="dialogValue"
            title="在此输入您的钱包地址"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            center
            :width="dialogWidth"
            draggable
        >
            <div class="input">
                <input type="text" ref="addressInput" />
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <ThemeButton type="blur">取消</ThemeButton>
                    <ThemeButton type="square">确定</ThemeButton>
                </div>
            </template>
        </el-dialog> -->
        <ThemeDialog ref="themeDialog" title="在此输入您的钱包地址" >
            <div class="input">
                <input type="text" ref="addressInput" />
            </div>
        </ThemeDialog>
    </div>
</template>

<script setup>
import ThemeButton from "@/components/themeButton";
import ThemeDialog from "@/components/themeDialog"
import CheckList from "./../modules/checkList";
import {
    computed,
    nextTick,
    // nextTick,
    ref,
    // watch
} from "vue";
const checkList = ref([
    {
        id: "1",
        title: "脚本名称",
        isChecked: false,
    },
    {
        id: "2",
        title: "脚本名称",
        isChecked: true,
    },
    {
        id: "3",
        title: "脚本名称",
        isChecked: false,
    },
    {
        id: "4",
        title: "脚本名称",
        isChecked: false,
    },
    {
        id: "5",
        title: "脚本名称",
        isChecked: false,
    },
    {
        id: "6",
        title: "脚本名称",
        isChecked: false,
    },
    {
        id: "7",
        title: "脚本名称",
        isChecked: false,
    },
    {
        id: "8",
        title: "脚本名称",
        isChecked: false,
    },
    {
        id: "9",
        title: "脚本名称",
        isChecked: false,
    },
    {
        id: "10",
        title: "脚本名称",
        isChecked: false,
    },
    {
        id: "11",
        title: "脚本名称",
        isChecked: false,
    },
    {
        id: "12",
        title: "脚本名称",
        isChecked: false,
    },
]);
const checkedList = computed(() =>
    checkList.value.filter((item) => item.isChecked == true)
);
function change(item) {
    item.isChecked = !item.isChecked;
}
const themeDialog = ref(null);
const addressInput = ref(null);
function openDialog() {
    themeDialog.value.open();
    nextTick(()=>{
        addressInput.value.onfocus&&addressInput.value.onfocus()
    })
}
</script>
<style lang='scss' scoped>
.select {
    display: grid;
    @media screen and (min-width: 769px) {
        grid-template-columns: 80px 1fr;
        grid-row-gap: 40px;
        .theme-button {
            padding: 8px 15px;
            width: 100%;
        }
    }
    @media screen and (max-width: 768px) {
        grid-template-columns: 55px 1fr;
        grid-row-gap: 20px;
        .theme-button {
            padding: 4px;
            width: 100%;
        }
    }
}
.query-address {
    height: 40px;
    .icon {
        margin-right: 8px;
    }
    @media screen and (min-width: 769px) {
        margin-top: 52px;
        .open-dialog {
            min-width: calc((100vw - 1200px) / 2 + 550px);
            padding: 7px 40px;
        }
        .query {
            padding: 8px 40px;
            margin-left: 25px;
        }
    }
    @media screen and (max-width: 768px) {
        margin-top: 20px;
        font-size: 12px;
        display: flex;
        .open-dialog {
            padding: 4px;
            flex: 2;
            .icon {
                width: 14px;
            }
        }
        .query {
            padding: 6px 22px;
            margin-left: 12px;
        }
    }
}
.create-script {
    @media screen and (min-width: 769px) {
        margin-top: 40px;
    }
    @media screen and (max-width: 768px) {
        margin-top: 20px;
    }
    .theme-button {
        padding: 8px 24px;
        line-height: 24px;
        @media screen and (max-width: 768px) {
            padding: 8px 20px;
            line-height: 18px;
            font-size: 12px;
            img {
                width: 14px;
            }
        }
        img {
            margin-right: 5px;
        }
    }
}

.theme-dialog {
    .input {
        padding: 30px 25px 0;
        input {
            width: 100%;
            font-size: 32px;
            color: #fff;
            background-color: transparent;
            border: none;
            border-bottom: 1px solid #5b5070;
        }
    }
}
</style>