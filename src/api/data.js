import * as api from "./api.js";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllEvents() {
    return api.get('/data/events?sortBy=_createdOn%20desc');
}

export async function addEvent(event) {
    return api.post('/data/events', event)
}


export async function getEventById(id) {
    return api.get('/data/events/' + id);
}

export async function editEvent(id, event) {
    return api.put('/data/events/' + id, event);
}

export async function deleteEvent(id) {
    return api.del('/data/events/' + id);
}


export async function likeEvent(eventId) {
    return api.post('/data/going', {eventId});
}


export async function getLikesByEventId(eventId) {
    return api.get(`/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`)
}


export async function getMyLikesByEventId(eventId, userId) {
    return api.get(`/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}