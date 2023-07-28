import { render, html } from '../../node_modules/lit-html/lit-html.js';

// TO DO Replace with actual layout!

export const layoutTemplate = (userData, content) => html`

<header>
  <!-- Navigation -->
  <a id="logo" href="/">
    <img id="logo-img" src="./images/logo.png" alt=""/>
  </a>

  <nav>
    <div>
      <a href="/dashboard">Dashboard</a>
      <a href="/search">Search</a>
    </div>

    ${userData ? html`
    <!-- Logged-in users -->
    <div class="user">
      <a href="/create">Add Pair</a>
      <a href="/logout">Logout</a>
    </div>
    ` : html`
    <!-- Guest users -->
    <div class="guest">
      <a href="/login">Login</a>
      <a href="/register">Register</a>
    </div> `}
  </nav>
</header>



<!-- main page content on loading -->
    <main>
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







