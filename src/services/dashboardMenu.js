import dashboard_icon from "./../assets/dashboardAssets/dashboard.png";
import upload_icon from "./../assets/dashboardAssets/upload.png";
import manage_icon from "./../assets/dashboardAssets/manager.png";
import logout_icon from "./../assets/dashboardAssets/out.png";
import blog_icon from "./../assets/dashboardAssets/blog.png";
import home_icon from "./../assets/dashboardAssets/home.png";
import tag_icon from "./../assets/dashboardAssets/tag.png";
import ebook_icon from "./../assets/dashboardAssets/ebook.png";
import order_icon from "./../assets/dashboardAssets/order.png";
export const dashMenu = [
  {
    image: dashboard_icon,
    text: "Dashboard",
    path: "dashboardPage",
  },
  {
    image: order_icon,
    text: "Orders",
    path: "orders",
  },
  {
    image: upload_icon,
    text: "Upload Book",
    path: "upload",
  },
  {
    image: manage_icon,
    text: "Manage Book",
    path: "manage",
  },
  {
    image: upload_icon,
    text: "Upload eBooks",
    path: "ebook",
  },
  {
    image: ebook_icon,
    text: "Manage eBooks",
    path: "manageEbook",
  },
  {
    image: blog_icon,
    text: "Manage Blogs",
    path: "blogManage",
  },
  {
    image: tag_icon,
    text: "Best Sellings",
    path: "bestselling",
  },

  {
    image: home_icon,
    text: "Home",
    path: "/",
  },
];
