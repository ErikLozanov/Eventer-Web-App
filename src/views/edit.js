import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { editEvent, getEventById } from "../api/data.js";

let editEventTemplate = (evennt) => html`
        <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
                value="${evennt.name}"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image"
                value="${evennt.imageUrl}"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
                value="${evennt.category}"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              >${evennt.description}</textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
              value="${evennt.date}"
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;


let ctxClone = null;


export async function editPage(ctx) {
    let evennt = await getEventById(ctx.params.id);
    ctx.render(editEventTemplate(evennt));
    ctxClone = ctx;
}

async function onSubmit(event){ 
    event.preventDefault();

    let eventId = ctxClone.params.id;
    let formData = new FormData(event.currentTarget);


    let name = formData.get('name').trim();
    let imageUrl = formData.get('imageUrl').trim();
    let category = formData.get('category').trim();
    let description = formData.get('description').trim();
    let date = formData.get('date').trim();

    if(name == '' || imageUrl == '' || category == '' || description == '' || date == '') {
        return alert('Please fill in all inputs!');
    }


    await editEvent(eventId,{name,imageUrl,category,description,date});

    ctxClone.page.redirect(`/details/${eventId}`);
}