<template>
    <el-dialog
        custom-class="theme-dialog"
        v-model="dialogValue"
        :title="props.title"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        center
        :width="dialogWidth"
        draggable
    >
        <slot></slot>
        <template #footer>
            <div class="dialog-footer">
                <ThemeButton type="blur" @click="close">取消</ThemeButton>
                <ThemeButton type="square" @click="submit">确定</ThemeButton>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import ThemeButton from "@/components/themeButton";
import {
    ref,
    computed,
    defineExpose,
    defineEmits,
    defineProps,
} from "vue";
import { UseStoreResize } from "@/stores/window"
import { storeToRefs } from "pinia";
const props = defineProps({
    title:{
        type:String,
        readonly: true,
        required: true,
    }
})
const useStoreResize = UseStoreResize();
const { isPc } = storeToRefs(useStoreResize);
const dialogWidth = computed(() => isPc.value ? '550px' : '90%')
const dialogValue = ref(false);
const emits = defineEmits(['submit', 'open', 'close'])
function close() {
    dialogValue.value = false;
    emits('close', dialogValue.value);
}
function open() {
    dialogValue.value = true;
    emits('open', dialogValue.value);
}
function submit() {
    emits('submit');
    close()
}

defineExpose({
    submit,
    open,
    close,
})
</script>
<style lang='scss' scoped>
.dialog-footer {
    display: flex;
    justify-content: space-around;
    .theme-button {
        padding: 6px 15px;
        width: 114px;
    }
}
</style>