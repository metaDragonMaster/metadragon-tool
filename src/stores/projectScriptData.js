import { defineStore } from "pinia";
export const UseStoreProjectScriptData = defineStore('projectScriptData', {
	state: () => ({
		_projectData: [],
		_scriptData: [],
		_getProjectDataLoading:false,
		_getScriptDataLoading:false,
	}),
	getters: {
		scriptData: ({ _scriptData }) => _scriptData,
		projectData: ({ _projectData }) => _projectData,
		projectDataLoad: ({_getProjectDataLoading}) => _getProjectDataLoading,
		scriptDataLoad: ({_getScriptDataLoading}) => _getScriptDataLoading,
	},
	actions: {
		setProjectData(data) {
			this._projectData = data;
		},
		removeProjectData() {
			this._projectData.length = 0;
		},
		setScriptData(data) {
			this._scriptData = data;
		},
		removeScriptData() {
			this._scriptData.length = 0;
		},
		handlerProjectDataLoading(bool) {
			this._getProjectDataLoading = bool
		},
		handlerScriptDataLoading(bool) {
			this._getScriptDataLoading = bool
		},
	}
})
