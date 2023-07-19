import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../api/api.js";

let registerTemplate = (onSubmit) => html`
        <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="register-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();
        let rePass = formData.get('re-password').trim();
        if(email == '' || password == '' || rePass == '') {
            return alert('Please fill in all inputs!');
        }

        if(rePass !== password) {
            return alert('Passwords do not match!');
        }

        await register(email,password);
        ctx.updateUserNav();
        ctx.page.redirect('/');
    }
}