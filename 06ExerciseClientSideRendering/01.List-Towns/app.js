import { render, html } from "./node_modules/lit-html/lit-html.js"; // same as UP import



document.getElementById('btnLoadTowns').addEventListener("click", (e) => {
    e.preventDefault();

    const input = document.querySelector('#towns').value;
    const towns = input.split(', '); //[Haskovo, Varna, Shumen]

    const townTemplateRender = html`
    <ul>
        ${towns.map((town) => html`<li>${town}</li>`)}
    </ul>
    `;

    const rootGenerateContent = document.querySelector('#root');

    //put generated content in template in id='root'
    render(townTemplateRender, rootGenerateContent);

})