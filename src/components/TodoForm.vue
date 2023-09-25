<template>
    <form @submit.prevent="addItemAndClear(todo)">
        <input v-model="todo" type="text"/><button>ADD</button>
    </form>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useTodoListStore } from '@/stores/useTodoListStore';

export default defineComponent({
    setup(){
        const todo = ref('');

        // use Pinia store;
        const store = useTodoListStore();

        // todoList 배열에 항목을 추가하고, 추가된 후 빈 문자열로 만들어줌
        function addItemAndClear(item:string) {
            console.log("오니?")
            if(item.length == 0) {
                return
            }
        
            // store에서 addTodo함수 호출
            store.addTodo(item);
            todo.value = '';
        }

        return { todo, addItemAndClear };
    },
});

</script>