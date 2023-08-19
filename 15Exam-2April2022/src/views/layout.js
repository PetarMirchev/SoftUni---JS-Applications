import { render, html } from '../../node_modules/lit-html/lit-html.js';

// TO DO Replace with actual layout!

export const layoutTemplate = (userData, content) => html`


<!--Navigation-->
<header>
        <nav>
            <section class="logo">
                <img src="./images/logo.png" alt="logo">
            </section>
            <ul>
                <!--Users and Guest-->
                <li><a href="/">Home</a></li>
                <li><a href="/dashboard">Dashboard</a></li>
                ${!userData ? html`
                  <!--Only Guest-->
                  <li><a href="/login">Login</a></li>
                  <li><a href="/register">Register</a></li>
                ` : html`
                  <!--Only Users-->
                  <li><a href="/create">Create Postcard</a></li>
                  <li><a href="/logout">Logout</a></li>
                `}
            </ul>
        </nav>
    </header>



<!-- main page content on loading -->
    <main id="content">
        ${content}
    </main>

`;


//************************************************************************************ */

// nav class="navbar">
//     <a href="/">Home</a>
//         ${ userData ? html`<!-- Logged-in users -->
//                     <a class="button" href="/logout">Logout</a>` 
//             : html`  <!-- Guest users -->
//                 <a class="button" href="/login">Login</a>
//                 <a class="button" href="/register">Register</a>` }
// </nav> 

// <main>
//     ${content}
// </main>

//***************************************** */







