import { html } from "../../node_modules/lit-html/lit-html.js";
import { eventPreview } from "./common.js";
import { getAllEvents } from "../api/data.js";


let dashboardTemplate = (events) => html`
        <section id="dashboard">
            ${events.length == 0 ?
         html`<h4>No Events yet.</h4>`    :
         html`${events.map(eventPreview)}`
        }
        </section>`;


export async function dashboardPage(ctx) {
    let events = await getAllEvents();
    ctx.render(dashboardTemplate(events));
}