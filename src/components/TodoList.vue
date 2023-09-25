<template>
    <div v-for="todo in todoList" :key="todo.id">
        <span :class="{ completed: todo.completed }">{{ todo.item }}</span>
        <span @click.stop="toggleCompleted(todo.id)" class="icon">&#10004;</span>
        <span @click="deleteTodo(todo.id)" class="icon">&#10060;</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTodoListStore } from '@/stores/useTodoListStore';
import { storeToRefs } from 'pinia';

export default defineComponent({
    setup() {
        const store = useTodoListStore();
        // storeToRefs를 사용하여 todoList가 반응형으로 작동하도록.
        const { todoList } = storeToRefs(store);

        const { toggleCompleted, deleteTodo } = store;

        return { todoList, toggleCompleted, deleteTodo };
    },
})
</script>

<style lang="scss" scoped>
.completed {
    text-decoration: line-through;
}
.icon {
    cursor: pointer;
}
</style>
