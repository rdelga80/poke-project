/**
 * @typedef {object} State
 * @property {TestData} data
 * @property {TestLoading} loading
 * @property {TestErrors} Errors
 */

// TestData, TestLoading, and TestErrors can all be moved to a types helper file
// Because of Nuxt it may not be possible to put them in the same store file, so
// Types might require their own directory

/**
 * @typedef {object} TestData
 * Rename type as ModuleNameData.
 * Add properties here
 */

/**
 * @typedef {object} TestLoading
 * Rename type as ModuleNameData.
 * Add properties here
 */

/**
 * @typedef {object} TestErrors
 * Rename type as ModuleNameData.
 * Add properties here
 */

/** @type {State} */
const defaultState = {
  data: {},
  loading: {},
  errors: {}
}

/** @type {State} */
export const state = () => ({ ...defaultState })

export const actions = {
  /**
   * Test Action description
   * @param {import('vuex').ActionContext} actionContext - deconstruct when possible, i.e. { commit, dispatch }, these will also need to be declared
   * @param {*} payload - write a description for types if necessary
   */
  testAction(actionContext, payload) {
    // next to testAction there's an error showing. This is because eslint is
    // set that there needs to be a space between function name and the parameters parenthesis.
    // This needs to be changed. Look through the .eslintrc.js file, and see if you can change the
    // rules so it no longer shows.
  }
}

export const mutations = {
  /**
   * Test Mutation description
   * @param {State} state
   * @param {*} payload
   */
  TEST_MUTATION(state, payload) {
    // use assignments to state directly, i.e. state.data = payload
  }
}
