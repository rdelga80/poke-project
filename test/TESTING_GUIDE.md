// Import shallowMount. createLocalVue is only required if using Vuex or using Plugin in test.
import { shallowMount, createLocalVue } from '@vue/test-utils'
// Import Vuex (optional)
import Vuex from 'vuex'
// Import Component
import Test from '@/layouts/components/Test.vue'

// Only required if using Vuex or local Plugin
const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store({
    state: {
        user: {
            first_name: 'John',
            last_name: 'Doe'
        }
    }
})

// Set up test
describe(`@/layouts/components/Test.vue`, () => {
    // Load component and import requirements
    // store & localVue only required if using Vuex
    const wrapper = shallowMount(Test, {
        store,
        localVue,
        // Add props (optional)
        propsData: {
            prop1: `value`
        }
    })

    // Test top level element to ensure base render
    test(`sanity check`, () => {
        expect(wrapper.find(`{parent dom element}`).vm)
                    .toBeTruthy()
    })

    // Test if prop validator validates as intended
    test(`prop validator validates`, () => {
        const prop1 = wrapper.vm.$options.props.prop1
        expect(prop1.validator && prop1.validator(`passable value`))
            .toBeTruthy()
        expect(prop1.validator && prop1.validator(`not passable value`))
            .toBeFalsy()
    })

    // Test if computed property returns value as intended using "localThis"
    test(`test computed property returns prop1 capitalized`, () => {
        const localThis = {
            prop1: `value`
        }

        // Calls computed property directly from imported component
        const testComputed = Test.options.computed.testComputed
        expect(testComputed.call(localThis))
            .toBe(`Value`)
    })

    // Test if computed property returns value through shallowMounted vm instance
    test(`test computed property returns prop1 capitalized`, () => {
        expect(wrapper.vm.testComputed)
            .toBe(`Value`)
    })

    /* Explanation: Testing through the shallowMounted wrapper could have
    ** possible side effects and requires possibly having to create a more
    ** complicated test. Using "localThis" and "call" allows you to isolate
    ** the test and be more purposeful with internal values.
    */

    // Tests if a button calls the appropriate method
    test(`test method is called when button is clicked`, () => {
        const testMethodStub = jest.fn()
        wrapper.setMethods({
            testMethod: testMethodStub
        })

        wrapper.find(`button`).trigger(`click`) // click, change, keydown, etc
        expect(testMethodStub)
            .toHaveBeenCalled()
    })

    // Test is a method calls an action
    test(`test method calls testAction when called`, () => {
        wrapper.vm.testMethod()

        // must have corresponding action in test wrapper store
        expect(actions.testAction)
            .toHaveBeenCalled()
    })

    // Method changes value of data item
    test(`test method changes data item`, () => {
        const initialValue = wrapper.vm.dataItem
        wrapper.vm.testMethod()
        expect(wrapper.vm.dataItem)
            .not.toBe(initialValue)
        expect(wrapper.vm.dataItem)
            .toBe(`expected value`)
    })

    // Changing value changes class on DOM element
    test(`data value change adds class to test element`, () => {
        const testEl = wrapper.find(`.test`)
        expect(testEl.classes())
            .not.toContain(`test-class`)
        wrapper.vm.dataItem = `value to add class`
        expect(testEl.classes())
            .toContain(`test-class`)
    })
})




TESTING STORE

// Import the entire store file as reassign a different variable
import * as testStore from '@/store/test'

describe(`@/store/test`, () => {
    let state,
        getters,
        actions,
        mutations,
        commit

    // make a detached copy of the store file to prevent side effects
    const testStore = { ...testStore }

    beforeEach(() => {
        // assign store, getters, actions, and mutations to local variables
        state = testStore.state()
        getters = testStore.getters
        actions = testStore.actions
        mutations = testStore.mutations

        commit = jest.fn()

        // Since a store test file isn't mounted, you must manually define
        // any plugins that are used. In the test file using `this` within an
        // action refers to `actions` then the plugin must be defined off actions.
        // The same would hold true if a getter used a plugin.
        actions.$apis = {
            giving: () => ({
                list: () => {
                    return new Promise(resolve => {
                        resolve(givingList)
                    })
                }
            })
        }
    })

    // Organize tests by actions, mutations, and getters
    describe(`Actions`, () => {

        // Each action can have it's own describe block (if there is more than
        // one test condition
        describe(`testAction1`, () => {

            // Each describe block needs it's own beforeEach
            // to reset values between tests
            beforeEach(() => {
                state = testStore.state()

                commit = jest.fn()
            })

            test(`testAction commits TEST_MUTATION`, () => {
                // call action
                actions.testAction({ commit }, value)

                // test to see what is called by commit. This is similar
                // to how to also test a dispatch
                expect(commit)
                    .toHaveBeenCalledWith(
                        `TEST_MUTATION`,
                        value
                    )
            })
        })
    })

    describe(`Mutations`, () => {
        beforeEach(() => {
            state = testStore.state()
        })

        test(`TEST_MUTATION sets testValue`, () => {
            // set pertinent state value to a neutral value
            state.testValue = ``

            mutations.TEST_MUTATION(state, newValue)

            expect(state.testValue)
                .toBe(newValue)
        })
    })

    describe(`Getters`, () => {
        describe(`testGetter1`, () => {
            beforeEach(() => {
                state = testStore.state()
            })

            test(`testGetter returns appropriate value`, () => {
                expect(getters.testGetter(state))
                    .toBe(testValue)
            })
        })
    })
}