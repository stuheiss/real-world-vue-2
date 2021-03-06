import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  event: {},
  eventsTotal: 0,
  perPage: 3
}

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event)
  },
  SET_EVENTS(state, events) {
    state.events = events
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
  SET_EVENT(state, event) {
    state.event = event
  }
}

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return EventService.postEvent(event)
      .then(() => {
        commit('ADD_EVENT', event)
        commit('SET_EVENT', event)
        const notification = {
          type: 'success',
          message: 'Your event has been created!'
        }
        dispatch('notification/add', notification, { root: true })
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem creating your event:' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then(response => {
        commit('SET_EVENTS', response.data)
        commit('SET_EVENTS_TOTAL', response.headers['x-total-count'])
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching events:' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    // FIXME: refresh on EventCreate page will try to fetch event id of "create" and will redirect to 404 page
    // FIXME: how to prevent refreshing EventCreate page ???
    // https://medium.com/js-dojo/how-to-prevent-browser-refresh-url-changes-or-route-navigation-in-vue-132e3f9f96cc
    const event = getters.getEventById(id)
    if (event) {
      commit('SET_EVENT', event)
      return event
    }
    return EventService.getEvent(id)
      .then(response => {
        commit('SET_EVENT', response.data)
        return response.data
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching event:' + error.message
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  }
}

export const getters = {
  getEventById: state => id => state.events.find(event => event.id === id)
}
