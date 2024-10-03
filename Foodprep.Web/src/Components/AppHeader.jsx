import React from "react";

const styles = {
  header:{
    backgroundColor:"#794d79"
  },
  navItems:
  {
  marginBottom: "15px",
  border: "1px solid #794d79",
  margin: "20px",
  width: "200px",
  borderRadius: "5px",
  backgroundColor: "#d9c6d9",
  fontSize: "24px", 
  },
  navLink:
  {
    color: "#f8f4f8",
  }
  
}

function AppHeader() {
  return (
    <>
    <header>
      <nav className="navbar navbar-dark fixed-top" style={styles.header}>
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
        className="offcanvas offcanvas-start d-lg-flex flex-column flex-shrink-0 p-3 bg-light"
        tabIndex="-1"
        id="offcanvasSidebar"
        data-bs-scroll="true"
        aria-labelledby="offcanvasSidebarLabel"
        style={{ width: '300px' }}
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
          <ul className="nav flex-column" >
            <li className="nav-item" style={styles.navItems}>
              <a className="nav-link active" href="#" style={styles.navLink}>
                Foodprep
              </a>
            </li>
            <li className="nav-item" style={styles.navItems}>
              <a className="nav-link" href="#" 
              style={styles.navLink}>
                Recept
              </a>
            </li>
            <li className="nav-item" style={styles.navItems}>
              <a className="nav-link" href="#" style={styles.navLink}>
                Listor
              </a>
            </li>
            <li className="nav-item" style={styles.navItems}>
              <a className="nav-link" href="#" style={styles.navLink}>
                Veckoplanerare
              </a>
            </li>
            <li className="nav-item" style={styles.navItems}>
              <a className="nav-link" href="#" style={styles.navLink}>
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