import i18n from "i18next"
import translation_en from "./en/translation.json"
import translation_es from "./es/translation.json"
import { initReactI18next } from "react-i18next"

export const resources = {
	es: {
		translation: translation_es,
	},
	en: {
		translation: translation_en,
	},
} as const

i18n.use(initReactI18next).init({
	lng: "es",
	resources,
	interpolation: {
		escapeValue: false, // not needed for react as it escapes by default
	},
})
