import { fetchGetTaskInfos, fetchGetHandleTaskInfos, fetchSaveFinishTask, fetchGetBatchInfo } from './../../fetch/api'

const state = {
    taskInfo: {},
    handleInfo:{},
    saveTask: {},
    batchInfo: {}
}

const actions = {
    GET_DISTRIBUTE_TASK: ({ commit, state }, opts) => {
        return fetchGetTaskInfos(opts).then(task => commit('DISTRIBUTE_TASK_INFOS', { task }));
    },
    GET_HANDLE_TASKS: ({ commit, state }, opts) => {
        return fetchGetHandleTaskInfos(opts).then(handleInfo => commit('GET_HANDLE_LISTS', { handleInfo }))
    },
    SAVE_FINISH_TASK: ({ commit, state }, opts) => {
        return fetchSaveFinishTask(opts).then(savetask => commit ('SAVE_TASK', { savetask }));
    },
    GET_BATCH_INFO: ({ commit, state }, opts) => {
        return fetchGetBatchInfo(opts).then(batch => commit ('GET_BATCH_BY_ID', { batch }));
    }
}

const mutations = {
    DISTRIBUTE_TASK_INFOS: (state, { task }) => {
        state.taskInfo = task.data;
    },
    GET_HANDLE_LISTS:(state, { handleInfo }) => {
        state.handleInfo = handleInfo.data;
    },
    SAVE_TASK:(state, { savetask }) => {
        state.saveTask = savetask.data;
    },
    GET_BATCH_BY_ID: ( state, { batch }) => {
        state.batchInfo = batch.data
    }
}

const getters = {
    getTaskInfos (state) {
        return state.taskInfo;
    },
    getHandleInfo(state) {
        return state.handleInfo;
    },
    saveFinishTaskInfo(state){
        return state.saveTask;
    },
    getBatchInfoById(state){
        return state.batchInfo
    }
}

export default {
    state, 
    actions, 
    mutations,
    getters
}