import { render, html } from '../../node_modules/lit-html/lit-html.js';

// TO DO Replace with actual layout!

export const layoutTemplate = (userData, content) => html`

    <header>
        <!-- Navigation -->
        <a id="logo" href="/">
            <img id="logo-img" src="/images/logo.png" alt=""/>
        </a>

        <nav>
          <div>
            <a href="/dashboard">Fruits</a>
            <a href="/search">Search</a>
          </div>

          ${!userData ? html`
            <!-- Guest users -->
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>   
          </div> `
            : html`
            <!-- Logged-in users -->
            <div class="user">
                <a href="/create">Add Fruit</a>
                <a href="/logout">Logout</a>
            </div>
        `}                   
       
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


 

// <header id="site-header">
// <!-- Navigation -->
// <nav class="navbar">
//     <section class="navbar-dashboard">
//         <a href="/">Dashboard</a>
//         ${!userData ? html`
//             <!-- Guest users -->
//             <div id="guest">
//                 <a class="button" href="/login">Login</a>
//                 <a class="button" href="/register">Register</a>
//             </div>`
//             : html`
//             <!-- Logged-in users -->
//             <div id="user">
//                 <span>Welcome, ${userData.email}</span>
//                 <a class="button" href="my-books">My Books</a>
//                 <a class="button" href="/create">Add Book</a>
//                 <a class="button" href="/logout">Logout</a>
//             </div>
//         `}                   
//     </section>
// </nav>
// </header>

// <!-- Main Content to render all -->
// <main id="site-content">${content}</main>

// <footer id="site-footer">
// <p>@OnlineBooksLibrary</p>
// </footer>



