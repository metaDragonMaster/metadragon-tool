import { defineStore } from "pinia";
export const UseStoreProjectScriptData = defineStore('projectScriptData', {
	state: () => ({
		_projectData: [],
		_scriptData: [],
		_getProjectDataLoading: false,
		_getScriptDataLoading: false,
		_currentProjectId: ''
	}),
	getters: {
		scriptData: ({ _scriptData }) => _scriptData,
		projectData: ({ _projectData }) => _projectData,
		projectDataLoad: ({ _getProjectDataLoading }) => _getProjectDataLoading,
		scriptDataLoad: ({ _getScriptDataLoading }) => _getScriptDataLoading,
		currentProjectId: ({_currentProjectId}) => _currentProjectId,
		currentProject: ({ _currentProjectId,_projectData }) => _projectData.filter(item=>item.id == _currentProjectId)[0] || {},
	},
	actions: {
		setCurrentProjectId(id) {
			const have = this._projectData.some(item => item.id == id)
			if (have) {
				console.log('当前ID',id)
				this._currentProjectId = id;
			}
		},
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
