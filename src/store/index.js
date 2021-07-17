import * as Vuex from "vuex";

const store = Vuex.createStore({
    state() {
        return {
            list: [],
        }
    },
    mutations: {
        addTask(state, task) {
            state.list.unshift(task)
        },
        updateTask(state,data) {
            state.list[data.idx] = data.task
        },
        updateTasks(state, tasks) {
            console.log(tasks);
            state.list = tasks
        },
        deleteTask(state, idx) {
            state.list.splice(idx, 1);
        },
        completeTask(state,idx){
            state.list[idx].status = "COMPLETED"
        },
        inCompleteTask(state,idx){
            state.list[idx].status = "INCOMPLETE"
        },
    }
});

export default store;