"use client"
import SideMenu from "@/app/components/SideMenu";
import "bootstrap/dist/css/bootstrap.min.css";
import AssignRole from "@/app/components/Roles";
import styles from "@/app/styles/rolesForm.module.css";


export default function AdminDashboard() {
    return  (
      <div className="container-fluid">
      <div className="row">
        <SideMenu />
        <main className={`col-md-9 ms-sm-auto col-lg-10 px-md-4 mx-auto text-center ${styles['main-content']}`}>
          <AssignRole/>
        </main>
      </div>
    </div>
    )

  }