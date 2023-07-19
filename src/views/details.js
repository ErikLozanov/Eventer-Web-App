import {html} from "../../node_modules/lit-html/lit-html.js";
import { deleteEvent,getEventById, getLikesByEventId, getMyLikesByEventId, likeEvent } from "../api/data.js";
import { getUserData } from "../util.js";

let eventDetailTemplate = (evennt,isOwner,onDelete,likes,showLikeButton, onLike) => html`
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${evennt.imageUrl}" alt="example1" />
            <p id="details-title">${evennt.name}</p>
            <p id="details-category">
              Category: <span id="categories">${evennt.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${evennt.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${evennt.description}</span>
              </div>

            </div>

            <h3>Going: <span id="go">${likes}</span> times.</h3>
            <div id="action-buttons">
            <!--Edit and Delete are only for creator-->
                ${eventControlsTemplate(evennt,isOwner,onDelete)}
              <!--Bonus - Only for logged-in users ( not authors )-->
                ${likesControlsTemplates(showLikeButton,onLike)}
            </div>
            </div>
          </div>
        </section>
`


let eventControlsTemplate = (event,isOwner,onDelete) => {
    if(isOwner) {
        return html`            <div id="action-buttons">
        <a href="/edit/${event._id}" id="edit-btn">Edit</a>
        <a href="#" @click=${onDelete} id="delete-btn">Delete</a>
        `;
    } else {
        return null;
    }
}


let likesControlsTemplates = (showLikeButton,onLike) => {
    if(showLikeButton) {
              return html`<a @click=${onLike} href="#" id="go-btn">Going</a>`
    } else {
        return null;
    }
}


export async function detailsPage(ctx) {
    let userData = getUserData();

    let [event, likes, hasLike] =  await Promise.all([
        getEventById(ctx.params.id),
        getLikesByEventId(ctx.params.id),
        userData ? getMyLikesByEventId(ctx.params.id, userData.id) : 0
    ])

    let isOwner = userData && userData.id == event._ownerId;
    let showLikeButton = isOwner == false && hasLike == false && userData !== null;
    ctx.render(eventDetailTemplate(event,isOwner,onDelete, likes, showLikeButton, onLike));


    async function onDelete() {
        await deleteEvent(ctx.params.id);
        ctx.page.redirect('/dashboard');
    }

    async function onLike() {
        await likeEvent(ctx.params.id);
        ctx.page.redirect(`/details/${ctx.params.id}`)
    }
}
