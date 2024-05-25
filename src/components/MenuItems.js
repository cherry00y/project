export const MenuItems = [
    {
        title : "Home",
        url : "/home",
        cName : "nav-links",
        icon : "fa-solid fa-house-user"
    },
    {
        title : "Infomation",
        url : "/infomation",
        cName : "nav-links",
        icon : "fa-solid fa-circle-info",
        subItems: [
            {
                title : "Promotion",
                url : "/infomation/promotion",
                cName : "dropdown-link"
            },
            {
                title : "Trivia",
                url : "/infomation/trivia",
                cName : "dropdown-link"
            }
        ]
    },
    {
        title : "Statistics",
        url : "/statistics",
        cName : "nav-links",
        icon : "fa-solid fa-chart-line"
    },
    {
        title : "Log Out",
        url : "/logout",
        cName : "nav-links-app",
    },
    
];