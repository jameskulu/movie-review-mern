  // Sidebar Toggle Codes;
  
  // var sidebarOpen = false;
  // var sidebar = document.getElementById("sidebar");
  // var sidebarCloseIcon = document.getElementById("sidebarIcon");
  
  // function toggleSidebar() {
  //   if (!sidebarOpen) {
  //     sidebar.classList.add("sidebar_responsive");
  //     sidebarOpen = true;
  //   }
  // }
  
  // function closeSidebar() {
  //   if (sidebarOpen) {
  //     sidebar.classList.remove("sidebar_responsive");
  //     sidebarOpen = false;
  //   }
  // }

// alert("hee")

const toggleButton = document.getElementById('toggle-button')
const navbar = document.getElementById('navbar')


if(toggleButton){
  toggleButton.addEventListener('click',()=>{
    navbar.classList.toggle('toggle')
})

}

