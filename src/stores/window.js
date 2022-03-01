
import { defineStore } from "pinia"
import { getScroll ,getClientWidth} from "@/utils/tools"


export const UseStoreResize = defineStore('Resize', {
    state: () => ({
        _ClientWidth: getClientWidth(),//页面宽度
    }),
    getters: {
        clientWidth: ({ _ClientWidth }) => _ClientWidth,
        isPc: ({ _ClientWidth }) => _ClientWidth > 768,
    },
    actions: {
        setClientWidth() {
            this._ClientWidth = getClientWidth();
        },
    }
})

export const UseStoreScroll = defineStore('Scroll', {
    state: () => ({
        _ScrollTop: getScroll() || 0,//页面宽度
    }),
    getters: {
        scrollTop: ({ _ScrollTop }) => _ScrollTop,
    },
    actions: {
        setScrollTop() {
            this._ScrollTop = getScroll();
        },
    }
})