
import { startLanguage } from "@/utils/tools"
import { defineStore } from "pinia";
// const { locale } = useI18n();
export const UseStoreI18n = defineStore('VueI18n',{
    state: () => ({
        themeType: startLanguage(),
    }),
    getters: {
        i18nType: ({ themeType }) => themeType,
    },
    actions: {
        setI18nType(themeType) {
            this.themeType = themeType
        },
    }

})