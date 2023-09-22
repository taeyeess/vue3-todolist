<template>
    <header>
        <h1>TODO LIST</h1>
        <nav>
            <ol>
                <li>
                    <route-link to="/">All</route-link>
                </li>
                <li>
                    <router-link to="/active">Library</router-link>
                </li>
                <li>
                    <router-link to="/clear">Clear</router-link>
                </li>
            </ol>
        </nav>
    </header>
</template>

<script lang="ts">
export default {
    name: "BaseHeader",
}
</script>

<style lang="scss">
</style>