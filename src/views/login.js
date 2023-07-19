import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/api.js";

let loginTemplate = (onSubmit) => html`
        <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>
`;

export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        if(email == '' || password == '') {
            return alert('Please fill in all inputs!');
        }

        await login(email,password);
        ctx.updateUserNav();
        ctx.page.redirect('/');
    }
}