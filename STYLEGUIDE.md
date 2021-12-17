# Style Guide

This project uses the Nuxt framework.

## Vue SFC File

### General

1. Files names should be either two letters together in PascalCase, or leading T in name

*Wrong*: `Card.vue`

*Right*: `TCard.vue`

2. Always use ES6 fat arrows `=>` when possible. Including for functions and elsewhere.

3. Dumb Components

    Components should be as dumb as possible - mostly just for handling styling. Business Logic should be pushed to the store as much as possible.

    Also, differentiate between a page, or administrative component (i.e. a component that sections of a part of a page component), and child components. Page and administrative components should be the highest levels of components, and the main holders of data.

4. Follow a Domain Driven Design architecture, not a Functional Design. I.e. Homepage vs User. A good rule of thumb is to design how a user would think about the site versus how a developer would think about the site.

5. Preference for v-slots over Props

    To keep Components dumb, use v-slots over props. Have the uppermost component handle `$emits`, etc, to keep logic flows as independent as possible.

6. $emits and v-bind:value on inputs

    To prevent logic handled locally, pass values to inputs through props and `$emit` changes to be handled higher.

    This also becomes extremely useful to synchronize incoming data from an API to a local input without needing to explicitly set data locally in component - i.e. leveraging the store.

7. Map all API responses and all outgoing API payloads

    This creates a stop gap to improve issues that arise from API data structure changes.

    Keep these mappings in the `/assets` folder by domain. I.e. `/assets/user` or `/assets/locations`

8. Alphabetize order of methods, computed properties, getters, actions, and mutations

9. Make data objects mutable

    *Wrong*:
    ```
    const openCards = [`first`, `second`, `third`]
    ```

    *Right*:
    ```
    const cards = [
        {
            label: `First Card`,
            key: `first`,
            selected: true
        },
        {
            label: `Second Card`,
            key: `second`,
            selected: false
        },
        {
            label: `Third Card`,
            key: `third`,
            selected: false
        }
    ]
    ```

10. Keep Page and Component Structure as Flat as Possible

    Try not to nest components too deeply within each other, preferring for v-slots

    *Wrong*:
    ```
    parent
        - child 1
            - child 2
                - child 3
    ```

    *Right*:
    ```
    parent
        - child 1
        - child 2
        - child 3
    ```

11. All functions should have a JSDoc description, with all info filled out as needed. Properties and params should only have a description if needed.

    For Reference: [JSDoc](https://jsdoc.app/)

    *Wrong*:
    ```
    const functionName = (param1, param2) => {
      returns 'string'
    }
    ```

    *Right*:
    ```
    /**
     * Function Description
     *
     * @param {*} param1 - description, if param name doesn't convey enough meaning
     * @param {*} param2
     * @returns {string}
     */
    const functionName = (param1, param2) => {
      returns 'string'
    }
    ```

11. SFC tag order will be `<script>`, `<template>`, then `<style>`

### Template

1. Wrap component/page in an appropriate DOM tag with a class that represents the component

    *Wrong*
    ```
    TCard.vue

    <template>
        <div>
            [...]
        </div>
    </template>
    ```

    *Right*
    ```
    TCard.vue

    <template>
        <div class="card">
            [...]
        </div>
    </template>
    ```

2. Add a line between equal indented DOM elements

    *Wrong*
    ```
    <div>
        <div>
            <span>First</span>
        </div>
        <div>
            <span>First</span>
        </div>
    <div>
    ```

    *Right*
    ```
    <div>
        <div>
            <span>First</span>
        </div>

        <div>
            <span>First</span>
        </div>
    <div>
    ```

3. Break attributes to next line if there is more than one attribute

    *Wrong*:
    `<input class="class" style="style" type="type" value="value" >`

    *Right*:
    ```
    <input
        class="class"
        style="style"
        type="type"
        value="value">
    ```

4. Organize and alphabetize DOM attributes by:
    * Start with any Vue helpers, except v-bind, starting with v-model then v-for (v-binding key is next).
    * All attributes, including v-bind'ed attributes, alphabetized.
    * Then all v-on events, in alpha order

4. Deconstruct whenever possible

    ```
    <div v-for="({ id, name, date }) in array">
    ```

5. Bundle classes, styles, and attributes when more than one is present

    *Wrong*:
    ```
    <div :class="[`container`, { outline: id === `123`, solid: id === `456` }]>
    ```

    *Right*:
    ```
    <div :class="containerClasses">

    <script>
        [...]
        computed: {
            containerClasses() {
                return {
                    container: true,
                    outline: this.id === `123`,
                    solid: this.id === `456`
                }
            }
        }
    </script>
    ```

6. Computed classes:

    Use this format for mixed classes that include one static class, and one dynamic class:

    ```
    <div :class="['static', { dynamic }]">
    ```

    If there is more than one dynamic classes, no matter the static classes, move to a computed property:

    ```
    <div :class="dynamicClasses">

    // in computed properties

    dynamicClasses() {
      return {
        static: true,
        dynamic: this.dynamic
      }
    }
    ```

6. Use class names that allow javascript functions to have simpler syntax

    *Wrong*:
    ```
    <div :class="{ solid: isSolid }">
    ```

    *Right*:
    ```
    <div :class="{ solid }">
    ```

7. Use Semantic Elements as much as possible: https://developer.mozilla.org/en-US/docs/Glossary/Semantics

### Script

1. Props should leverage as many Prop definitions as possible

See [VueJs Style Guide on Prop definitions](https://vuejs.org/v2/style-guide/#Prop-definitions-essential)

2. Use switch/case for multiple condition logic

3. Don't use nested ternary logical operators

4. Organize imports in alpha when possible, especially if an import has multiple properties deconstructed.

### Style

1. Use SCSS % functionality to extend any CSS Var assignments.

    *Wrong*:
    ```
    .class {
        --var-test: `15px`;
        height: 100%;
    }
    ```

    *Right*:
    ```
    %class-vars {
        --var-test: `15px`;
    }

    .class {
        @extend %class-vars;

        height: 100%;
    }
    ```

2. Leverage CSS Var assignment to keep styles flat

    *Wrong*:
    ```
    .class {
        height: 100%;

        .style-one {
            width: 50%;
        }

        .style-two {
            width: 100%;
        }
    }
    ```

    *Right*:
    ```
    %class-vars {
        --class-width: auto;
    }

    .style-one {
        --class-width: 50%;
    }

    .style-two {
        --class-width: 100%:
    }

    .class {
        @extend %class-vars;

        height: 100%;
    }
    ```

3. Nest only if necessary, otherwise leave classes on the root level

    *Wrong*:
    ```
    .class {
        height: 100%;

        .style-one {
            width: 50%;

            .style-two {
                width: 100%;
            }
        }
    }
    ```

    *Right*:
    ```
    .class {
        height: 100%;
    }

    .style-one {
        width: 50%;
    }

    .style-two {
        width: 100%:
    }
    ```

4. Rarely, if ever, use `v-deep`. If there is maybe a need for it, first ask if the component in which `v-deep` is going to reference can receive a prop to change the style, or if adding a `--css-var` to the component's `style` DOM attribute can update the component's style.

### Store

1. All store files should have Default Store and Clear State

    ```
    const defaultStore = { ... }

    export const state = ({ ...defaultStore })

    export const actions = {
        clearState({ commit }) {
            commit(`CLEAR_STATE`)
        }
    }

    export const mutations = {
        CLEAR_STATE(state) {
            map(defaultStore, (value, key) => {
                Vue.set(store, key, value)
            })
        }
    }
    ```

2. Use es6 fat arrow returns when possible on getters

    *Wrong*:
    ```
    getUserData(state) {
        return {
            userInfo: user.info,
            userId: user.id
        }
    }
    ```

    *Right*:
    ```
    export const getters = {
        getUserData: (state) => ({
            userInfo: user.info,
            userId: user.id
        })
    }
    ```

3. Actions should not return a value, but progress through the actions -> mutations -> state -> getters cycle.

    *Wrong*:
    ```
    export const actions = {
        fetchData() {
            return this.$axios.get(`endoing`).then(data => data)
        }
    }
    ```

    *Right*:
    ```
    export const actions = {
        fetchData({ commit }) {
            return this.$axios.get(`endoing`)
                .then(data => {
                    commit(`SET_DATA`, data)
                })
        }
    }

    export const mutations = {
        SET_DATA(state, data) {
            state.data = data
        }
    }

    export const defaultState = {
        data: []
    }

    export const getters = {
        getData: ({ data }) => data
    }
    ```

4. Leverage rootGetters and rootState to communicate between store files and keep store files tidy

    ```
    store
        - transactions
            - index.js
            - filters.js

    index.js

    export const actions = {
        fetchData() {
            const payload = rootGetters[`transactions/filters/payload`]

            return this.$axios.get(`endpoint`, payload)
        }
    }
    ```

5. Use generic mutations to set primitive type values where possible:

    ```
    export const mutations = {
      SET_DATA_ITEM(state, { item, value }) {
        state.data[item] = value
      }
    }
    ```

    Or

    ```
    export const mutations = {
      SET_STATE_ITEM(state, { type, item, value }) {
        state[type][item] = value
      }
    }
    ```
