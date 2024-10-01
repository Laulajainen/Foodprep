import React from "react";

function AppHeader() {
  return (
    <>
    <header>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <button className="navbar-toggler"
          type= "button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar">
            <span className="navbar-toggler-icon">

            </span>
          </button>

          <a className="navbar-brand mx-auto" href="/">
            FoodPrep
          </a>
        </div>
      </nav>
    </header>

    <div
        className="offcanvas offcanvas-start show d-lg-flex flex-column flex-shrink-0 p-3 bg-light"
        tabIndex="-1"
        id="offcanvasSidebar"
        data-bs-scroll="true"
        aria-labelledby="offcanvasSidebarLabel"
        style={{ width: '250px' }}
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Foodprep
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Recept
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Listor
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Veckoplanerare
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dagbok
              </a>
            </li>
          </ul>
        </div>
      </div>


    </>
  );

  
}

export default AppHeader;