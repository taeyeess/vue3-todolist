<template>
    <h2>hihi?</h2>
    <todo-form />
    <todo-list />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import todoForm from './TodoForm.vue';
import todoList from './TodoList.vue';

export default defineComponent({
    components: { todoForm, todoList },
    setup() {
        return {};
    },
})
</script>
