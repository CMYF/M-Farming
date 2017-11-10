import Vue from 'vue'
import qs from 'qs'
export function fetchLogin(opt) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/sys/login/login.do', qs.stringify({
        'id': opt.name,
        'pwd': opt.pass
    }));
}
export function fetchGetTaskInfos(opt) {
    return Vue.axios.post('agriculture/taskInfo/queryTaskInfoLists.do', qs.stringify({
        'queryTaskInfoListsRequest.page_number': opt.currentPage,
        'queryTaskInfoListsRequest.page_size': opt.pageSize,
        'queryTaskInfoListsRequest.taskStatus': opt.state,
    }));
}
export function fetchGetHandleTaskInfos(opt) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/taskInfo/handleTaskInfo.do', qs.stringify({
        'handleTaskInfoRequest.piCiBianH': opt.batchNo,
        'handleTaskInfoRequest.sort': opt.sort,
    }));
}

export function fetchSaveFinishTask(opt) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/taskInfo/finishTaskInfo.do', qs.stringify({
        'finishTaskInfoRequest.piCiBianH': opt.batchNo,
        'finishTaskInfoRequest.sort': opt.sort,
        'finishTaskInfoRequest.params': opt.params
    }));
}

export function fetchGetBatchInfo(opt) {
    return Vue.axios.post('http://10.1.2.151/ctower-mall-c/agriculture/resource/useResource.do', qs.stringify({
        id: opt.id
    }));
}

